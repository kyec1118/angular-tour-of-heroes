import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockLocation: jasmine.SpyObj<Location>;

  const mockHero: Hero = { id: 1, name: 'Superman' };

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'getHero',
      'updateHero',
    ]);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent, FormsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should fetch the hero based on the route parameter', () => {
      mockHeroService.getHero.and.returnValue(of(mockHero));

      // component.ngOnInit();

      expect(mockHeroService.getHero).toHaveBeenCalledWith(1);
      expect(component.hero).toEqual(mockHero);
    });
  });

  describe('#save', () => {
    it('should call updateHero and navigate back on success', () => {
      mockHeroService.updateHero.and.returnValue(of(mockHero));

      component.hero = { ...mockHero, name: 'Updated Name' };
      component.save();

      expect(mockHeroService.updateHero).toHaveBeenCalledWith(component.hero);
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('#goBack', () => {
    it('should navigate back', () => {
      component.goBack();
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });
});
