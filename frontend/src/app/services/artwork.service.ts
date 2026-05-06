import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artwork } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private apiUrl = 'http://localhost:8080/api/artworks';

  constructor(private http: HttpClient) { }

  getArtworks(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.apiUrl);
  }

  createArtwork(artwork: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>(this.apiUrl, artwork);
  }

  updateArtwork(id: number, artwork: Artwork): Observable<Artwork> {
    return this.http.put<Artwork>(`${this.apiUrl}/${id}`, artwork);
  }

  deleteArtwork(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{url: string}>('http://localhost:8080/api/upload', formData);
  }
}
