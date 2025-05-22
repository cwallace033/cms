import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];

  constructor() { 
    this.messages = MOCKMESSAGES
  }

  getMessages(): Message[] {
      return this.messages.slice();
    }
  
    getMessage(id: string): Message {
      for (const message of this.messages) {
        if (message.id === id) {
          return message;
        }
      }
      return null;
    } 

    messageChangedEvent = new EventEmitter<Message[]>();

    addMessage(message: Message): void {
      if (!message) {
        return;
      }
      this.messages.push(message);
      this.messageChangedEvent.emit(this.messages.slice());
    }
}
