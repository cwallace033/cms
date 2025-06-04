import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Output() selectedDocumentEvent = new EventEmitter<Document>();


  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentsList: Document[]) => {
        this.documents = documentsList;
      });

      this.documents = this.documentService.getDocuments()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  documents: Document[] = []
  
}
