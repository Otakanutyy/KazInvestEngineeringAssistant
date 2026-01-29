import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(message: string): Promise<{
        reply: string;
    }>;
}
