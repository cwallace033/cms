import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(
      1,
      'School',
      'How is school going?',
      'Jim'
    ),
    new Message(
      2,
      'Class',
      'How is class going?',
      'Jane'
    ),
    new Message(
      3,
      'Fun',
      'Are you learning fun stuff?',
      'Jack'
    )
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
