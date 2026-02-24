import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogHttpService {
  private readonly API_URL = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.API_URL);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.API_URL}/${id}`);
  }
}
