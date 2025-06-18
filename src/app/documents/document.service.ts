import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentsURL = "https://cmsapp-f432d-default-rtdb.firebaseio.com/documents.json"
  documents: Document[] = [];
  maxDocumentId: number = 0;

  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();

  constructor(private http: HttpClient) {}

  getDocuments(): void {
      this.http.get<Document[]>(this.documentsURL)
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents:', error)
        }
      )
    }
  
    getDocument(id: string): Document {
      for (const document of this.documents) {
        if (document.id === id) {
          return document;
        }
      }
      return null;
    } 

    getMaxId(): number {
      let maxId = 0;
      for (const document of this.documents) {
        const currentId = +document.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      } 
      return maxId
    }

    addDocument(newDocument: Document) {
      if (!newDocument) {
        return;
      }
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.storeDocuments();
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
      if (!originalDocument || !newDocument) {
        return;
      }
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
        return;
      }

      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      this.storeDocuments();
    }

    deleteDocument(document: Document) {
      if (!document) {
        return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
        return;
      }
      this.documents.splice(pos, 1);
      this.storeDocuments();
    }

    storeDocuments() {
      const documentString = JSON.stringify(this.documents)
      const headers = new HttpHeaders({'Content-Type': 'application/json'})
      this.http
        .put(this.documentsURL, documentString, { headers })
        .subscribe(() => {
          this.documentListChangedEvent.next(this.documents.slice());
        });
    }


    documentChangedEvent = new EventEmitter<Document[]>();

    documentSelectedEvent = new EventEmitter<Document>();
}