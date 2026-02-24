import { Component, Inject } from '@angular/core';
import { BasicBlogList } from '../../components/basic-blog-list/basic-blog-list';

@Component({
  selector: 'app-example',
  imports: [BasicBlogList],
  standalone: true,
  templateUrl: './example.html',
  styleUrl: './example.sass',
})
export class Example {

}
