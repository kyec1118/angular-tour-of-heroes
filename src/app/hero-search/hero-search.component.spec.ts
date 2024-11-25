import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
  ];

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    await TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search heroes based on search term', (done: DoneFn) => {
    mockHeroService.searchHeroes.and.returnValue(of(mockHeroes));
    component.ngOnInit();
    component.search('Hero');
    component.heroes$.subscribe((heroes) => {
      expect(mockHeroService.searchHeroes).toHaveBeenCalledWith('Hero');
      expect(heroes).toEqual(mockHeroes);
      done();
    });
  });

  it('should return an empty array if search term is empty', (done: DoneFn) => {
    mockHeroService.searchHeroes.and.returnValue(of([]));
    component.ngOnInit();
    component.search('');
    component.heroes$.subscribe((heroes) => {
      expect(mockHeroService.searchHeroes).not.toHaveBeenCalled();
      expect(heroes).toEqual([]);
      done();
    });
  });
});
