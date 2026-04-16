import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Category } from '../../data/category';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  categories: Category[] = [];
  errorMessage: string = '';

  constructor(
      private fb: FormBuilder,
      private postService: PostService,
      public router: Router
    ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: (err) => this.errorMessage = 'Failed to load categories'
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.create(this.postForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.errorMessage = 'Failed to create post: ' + err.message
      });
    }
  }
}
