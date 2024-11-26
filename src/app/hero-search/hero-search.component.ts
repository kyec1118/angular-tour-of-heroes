import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  private destroyRef = inject(DestroyRef);
  heroes$!: Observable<Hero[]>;
  heroForm = new FormGroup({
    term: new FormControl<string>('', Validators.required),
  });

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.heroForm.controls.term.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string | null) =>
        this.heroService.searchHeroes(term || '')
      ),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  get termControl() {
    return this.heroForm.get('term');
  }
}
