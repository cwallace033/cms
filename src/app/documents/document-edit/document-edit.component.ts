import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { FormsModule, NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(id);
        if (!this.originalDocument) {
          return;
      }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
    
  }
  onCancel() {
    this.router.navigate(['/documents']);

  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document('', value.name, value.description, value.url, []);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);

  }

}
