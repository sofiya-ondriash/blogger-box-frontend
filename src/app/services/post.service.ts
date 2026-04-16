import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../data/post';
import { Category } from '../data/category';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = `${environment.apiUrl}v1/posts`;
  private categoriesUrl = `${environment.apiUrl}v1/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  create(post: { title: string; content: string; categoryId: string }): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
