import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormsModule, NgForm } from '@angular/forms';

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

}
}
