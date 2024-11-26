import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

import { first } from 'rxjs/operators';

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

  hero: Hero | null = null;
  heroId = Number(this.route.snapshot.paramMap.get('id'));
  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    this.heroService
      .getHero(this.heroId)
      .pipe(first()) // Using first() to make the subscription will be destroy after fetching the data. it can avoid waste memory space.
      .subscribe((hero) => {
        this.hero = hero;
      });
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService
        .updateHero(this.hero)
        .pipe(first())
        .subscribe(() => this.goBack());
    }
  }
}
