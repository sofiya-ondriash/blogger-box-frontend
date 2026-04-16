import { Component, OnInit } from '@angular/core';
import { Post } from '../../data/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  errorMessage: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    console.log('Loading posts...');
    this.postService.getAll().subscribe({
      next: (data) => {
        console.log('Posts received:', data);
        this.posts = data;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.errorMessage = 'Failed to load posts: ' + err.message;
      }
    });
  }
}
