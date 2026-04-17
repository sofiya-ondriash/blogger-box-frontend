import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostService } from '../../services/post.service';
import { Category } from '../../data/category';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;
  categories: Category[] = [];

  // SweetAlert2 toast mixin — top-right, auto-closes after 3 s
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150)
        ]
      ],
      categoryId: ['', Validators.required],
      content: [
        '',
        [
          Validators.required,
          Validators.maxLength(2500)
        ]
      ]
    });

    this.postService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: () =>
        this.Toast.fire({ icon: 'error', title: 'Failed to load categories' })
    });
  }

  // ── Getters for easy template access ──────────────────────────────────────
  get title() { return this.postForm.controls['title']; }
  get categoryId() { return this.postForm.controls['categoryId']; }
  get content() { return this.postForm.controls['content']; }


  onSubmit(): void {
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) {
      this.Toast.fire({ icon: 'error', title: 'Please review your post' });
      return;
    }

    this.postService.create(this.postForm.value).subscribe({
      next: () => {
        this.Toast.fire({ icon: 'success', title: 'Post Submitted Successfully' });
        this.router.navigate(['/home']);
      },
      error: () =>
        this.Toast.fire({ icon: 'error', title: 'Failed to submit post. Please try again.' })
    });
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }
}
