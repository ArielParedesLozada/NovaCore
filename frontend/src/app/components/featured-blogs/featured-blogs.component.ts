import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { BlogHttpService } from '../../services/blog-http-service';

@Component({
  selector: 'app-featured-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-blogs.component.html',
  styleUrl: './featured-blogs.component.scss'
})
export class FeaturedBlogsComponent implements OnInit {
  featuredBlogs = signal<Blog[]>([]);
  private blogService = inject(BlogHttpService);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        // Ordenar por fecha más reciente y tomar los 3 primeros
        const sorted = [...data].sort((a, b) => {
          const da = new Date(a.createdAt).getTime();
          const db = new Date(b.createdAt).getTime();
          return db - da;
        });
        this.featuredBlogs.set(sorted.slice(0, 3));
      },
      error: () => {
        this.featuredBlogs.set([]);
      },
    });
  }

  /** Quita etiquetas HTML y entidades para mostrar solo texto en la vista previa. */
  stripHtml(html: string): string {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent ?? div.innerText ?? '';
    return text.replace(/\s+/g, ' ').trim();
  }

  truncateDescription(text: string, maxLen: number): string {
    if (!text) return '';
    const plain = this.stripHtml(text);
    return plain.length <= maxLen ? plain : plain.slice(0, maxLen).trim() + '…';
  }

  formatDate(value: Date | string): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

