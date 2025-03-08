import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepository: Repository<ChatMessage>,
  ) {}

  // Save message to database
  async saveMessage(username: string, message: string): Promise<ChatMessage> {
    const chatMessage = this.chatRepository.create({ username, message });
    return this.chatRepository.save(chatMessage);
  }

  // Get last 50 messages for chat history
  async getChatHistory(): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      order: { createdAt: 'ASC' },
      take: 50, // Fetch latest 50 messages
    });
  }
}
