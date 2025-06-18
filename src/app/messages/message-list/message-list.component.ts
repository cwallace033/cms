import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(
    private messageService: MessagesService,
     private contactService: ContactService
  ) {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnInit(): void {
    this.contactService.getContacts();
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.messageService.getMessages();
    });
    
    this.messageService.messageListChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}
