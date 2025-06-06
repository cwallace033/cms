import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;

  constructor(
    private windowRefService: WindRefService,
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
