import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit{
  constructor(private documentService: DocumentService) {}

  selectedDocument: Document;

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
