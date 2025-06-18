import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  maxMessageId: number = 0;
  private messagesURL = "https://cmsapp-f432d-default-rtdb.firebaseio.com/messages.json";

  messageListChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages(): void {
        this.http.get<Message[]>(this.messagesURL)
        .subscribe(
          (messages: Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.getMaxId();
  
            this.messages.sort((a, b) => {
              if (a.sender < b.sender) return -1;
              if (a.sender > b.sender) return 1;
              return 0;
            });
            this.messageListChangedEvent.next(this.messages.slice());
          },
          (error: any) => {
            console.error('Error fetching messages:', error)
          }
        )
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
      this.maxMessageId++;
      message.id = this.maxMessageId.toString();
      this.messages.push(message);
      this.storeMessages();

    }

    getMaxId(): number {
      let maxId = 0;
      for (const message of this.messages) {
        const currentId = +message.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      } 
      return maxId
    }

    storeMessages() {
      const messageString = JSON.stringify(this.messages)
      const headers = new HttpHeaders({'Content-Type': 'application/json'})
      this.http
        .put(this.messagesURL, messageString, { headers })
        .subscribe(() => {
          this.messageListChangedEvent.next(this.messages.slice());
        });
    }
}
