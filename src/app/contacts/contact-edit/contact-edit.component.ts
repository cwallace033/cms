import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
originalContact: Contact;
contact: Contact;
groupContacts: Contact[] = [];
editMode: boolean = false;
id: string;
groupContactError: string
constructor(
  private contactService: ContactService,
  private router: Router,
  private route: ActivatedRoute
) {}

ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return;
      }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    )
    
  }

onCancel() {
  this.router.navigate(['/contacts']);
}
onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact('', value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);

  }
isInvalidContact(newContact: Contact): boolean {
  if (!newContact) {
    return true;
  }
  if (this.contact && newContact.id === this.contact.id) {
    return true;
  }
  for (let i = 0; i < this.groupContacts.length; i++) {
    if (newContact.id === this.groupContacts[i].id) {
      return true;
    }
  }
  return false;
}
onDrop(event: CdkDragDrop<Contact[]>): void {
  const selectedContact = event.item.data;
  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact) {
    this.groupContactError = 'Contact can not be added to the group. it is already in the group or is the current contact.'
    return;
  }
  this.groupContacts.push(selectedContact);
  this.groupContactError = '';
}

onRemoveItem(index: number): void {
  if (index < 0 || index >= this.groupContacts.length) {
    return;
  }
  this.groupContacts.splice(index, 1);
}
}