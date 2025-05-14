import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }
  ngOnInit(): void {}
  documents: Document[] = [
    new Document(1, 'Document 1', ' A description 1 of document 1 that details what exactly document 1 has to offer for the client.', ' https://example.com/doc1', []),
    new Document(2, 'Document 2', ' A description 2 of document 2 that details what exactly document 2 has to offer for the client.', ' https://example.com/doc2', []),
    new Document(3, 'Document 3', ' A description 3 of document 3 that details what exactly document 3 has to offer for the client.', ' https://example.com/doc3', []),
    new Document(4, 'Document 4', ' A description 4 of document 4 that details what exactly document 4 has to offer for the client.', ' https://example.com/doc4', []),
  ]
  
}
