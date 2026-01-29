import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable()
export class ChatService {
  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException('OPENAI_API_KEY is not set');
    }

    this.client = new OpenAI({ apiKey });
  }

  async sendMessage(message: string, history: ChatMessage[] = []): Promise<string> {
    try {
      // Формируем сообщения: system + история + текущее
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...history.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ];

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      return content;
    } catch (error) {
      console.error('OpenAI error:', error);
      throw new InternalServerErrorException('Failed to get response from OpenAI');
    }
  }
}
