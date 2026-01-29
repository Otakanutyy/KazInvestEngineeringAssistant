export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
export declare class ChatService {
    private readonly client;
    constructor();
    sendMessage(message: string, history?: ChatMessage[]): Promise<string>;
}
