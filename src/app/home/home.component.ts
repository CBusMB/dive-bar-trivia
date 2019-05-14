import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { TriviaCategory } from '../trivia-category';
import { TriviaCategoryCollection } from '../trivia-category-collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private fetchService: FetchService) { }
  categories: TriviaCategory[] = [];
  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    const categoryKey = 'trivia_categories';
    this.fetchService.getCategoryList().subscribe((data: TriviaCategoryCollection) => {
      const collection: TriviaCategory[] = data[categoryKey];
      collection.forEach(d => {
        this.categories.push(d);
      });
    });
  }

  onCategoryClick(category: TriviaCategory) {
    console.log(category);
  }
}
