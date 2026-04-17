import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostCreateInput } from '../data/post';
import { Category } from '../data/category';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}v1/posts`);
  }

  create(post: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}v1/posts`, post);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}v1/posts/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}v1/categories`);
  }
}
