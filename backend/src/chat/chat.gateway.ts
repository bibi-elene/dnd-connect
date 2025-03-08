import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'https://dndconnect.xyz',
      'https://dnd-connect.vercel.app',
      'https://www.dndconnect.xyz',
    ],
    credentials: true,
  },
  transports: ['websocket'], // ✅ Force WebSocket instead of polling
  path: '/socket.io/', // ✅ Ensure correct WebSocket path
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users = new Map<string, string>();

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
    this.server.emit('userList', Array.from(this.users.values()));
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, username: string) {
    this.users.set(client.id, username);

    // Fetch and send chat history
    const chatHistory = await this.chatService.getChatHistory();
    client.emit('chatHistory', chatHistory);

    this.server.emit('userList', Array.from(this.users.values()));
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() messageData: { username: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Message received:', messageData);

    // Save message to database
    const savedMessage = await this.chatService.saveMessage(
      messageData.username,
      messageData.message,
    );

    // Broadcast message to all clients
    this.server.emit('message', savedMessage);
  }
}
