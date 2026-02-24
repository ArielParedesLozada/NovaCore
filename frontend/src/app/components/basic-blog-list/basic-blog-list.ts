import { Component, inject, Inject, OnInit } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { BlogHttpService } from '../../services/blog-http-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-blog-list.html',
  styleUrl: './basic-blog-list.sass',
})
export class BasicBlogList implements OnInit {
  blogs: Blog[] = [];
  private blogService = inject(BlogHttpService)

  constructor() { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error cargando blogs', err);
      }
    });
  }
}
