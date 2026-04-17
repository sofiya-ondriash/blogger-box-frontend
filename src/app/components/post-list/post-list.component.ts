import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../data/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts.sort(
          (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load posts. Please try again later.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
