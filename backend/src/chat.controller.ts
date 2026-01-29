import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ChatService, ChatMessage } from './chat.service';

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() body: ChatRequestBody) {
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      throw new HttpException('Field "message" is required', HttpStatus.BAD_REQUEST);
    }

    // Ограничиваем историю до 5 последних пар сообщений
    const limitedHistory = history.slice(-10);

    try {
      const reply = await this.chatService.sendMessage(message, limitedHistory);
      
      // Обновлённая история с новым сообщением и ответом
      const updatedHistory = [
        ...limitedHistory,
        { role: 'user' as const, content: message },
        { role: 'assistant' as const, content: reply },
      ].slice(-10);

      return {
        reply,
        lastMessage: message,
        history: updatedHistory,
      };
    } catch (error) {
      throw new HttpException('Failed to get response from AI service', HttpStatus.BAD_GATEWAY);
    }
  }
}
