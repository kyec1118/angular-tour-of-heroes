import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

import {first} from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class HeroDetailComponent {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  // Since you have already used route parameter to get hero ID and
  // use it to fetch the detail data from the service, I think you
  // don't need to use Input() to pass hero info.
  // @Input() hero?: Hero;

  hero: Hero | null = null;
  heroId = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    this.heroService.getHero(this.heroId)
      .pipe(first()) // Using first() to make the subscription will be destroy after fetching the data. it can avoid waste memory space.
      .subscribe((hero) => {
      this.hero = hero;
    });
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .pipe(first()) // the same as above.
        .subscribe(() => this.goBack());
    }
  }

  
}
