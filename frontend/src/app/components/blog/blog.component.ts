import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { BlogHttpService } from '../../services/blog-http-service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogs = signal<Blog[]>([]);
  private blogService = inject(BlogHttpService);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => this.blogs.set(data),
      error: () => this.blogs.set([]),
    });
  }

  truncateDescription(text: string, maxLen: number): string {
    if (!text) return '';
    return text.length <= maxLen ? text : text.slice(0, maxLen).trim() + '…';
  }
}
