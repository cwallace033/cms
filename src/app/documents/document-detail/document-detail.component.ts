import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  document: Document;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }
}
