import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  standalone: true,
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  heroForm = new FormGroup({
    term: new FormControl<string>(''),
  });
  // updated to use formGroup to implement search function

  // private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  ngOnInit(): void {
    this.heroes$ = this.heroForm.controls.term.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string | null) =>
        this.heroService.searchHeroes(term || '')
      )
    );
  }

  // ngOnInit(): void {
  //   this.heroes$ = this.searchTerms.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((term: string) => this.heroService.searchHeroes(term))
  //   );
  // }
}
