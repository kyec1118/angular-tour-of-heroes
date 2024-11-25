import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
    { id: 3, name: 'Hero 3' },
    { id: 4, name: 'Hero 4' },
    { id: 5, name: 'Hero 5' },
  ];

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // One test case should only have one expect.
  describe('fetch hero list', () => {
    beforeEach(() => {
      mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
    });

    it('should call the correct service function', () => {
      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    });

    it('should fetch the correct hero list', () => {
      expect(component.heroes).toEqual(mockHeroes.slice(1, 5));
    });
  });

  // it('#getHeroes', () => {
  //   mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
  //   // component.ngOnInit();
  //   expect(mockHeroService.getHeroes).toHaveBeenCalled();
  //   expect(component.heroes.length).toBe(4);
  //   expect(component.heroes).toEqual(mockHeroes.slice(1, 5));
  // });
});
