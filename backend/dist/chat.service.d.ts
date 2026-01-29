export declare class ChatService {
    private readonly client;
    constructor();
    sendMessage(message: string): Promise<string>;
}
