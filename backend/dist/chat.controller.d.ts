import { ChatService, ChatMessage } from './chat.service';
interface ChatRequestBody {
    message: string;
    history?: ChatMessage[];
}
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(body: ChatRequestBody): Promise<{
        reply: string;
        lastMessage: string;
        history: ChatMessage[];
    }>;
}
export {};
