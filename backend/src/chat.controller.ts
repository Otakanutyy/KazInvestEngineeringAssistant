import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body('message') message: string) {
    if (!message || typeof message !== 'string') {
      throw new HttpException('Field "message" is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const reply = await this.chatService.sendMessage(message);
      return { reply };
    } catch (error) {
      throw new HttpException('Failed to get response from AI service', HttpStatus.BAD_GATEWAY);
    }
  }
}
