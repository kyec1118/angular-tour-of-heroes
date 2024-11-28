import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: spy }],
    }).compileComponents();

    heroServiceSpy = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should fetch heroes on initialization', () => {
      heroServiceSpy.getHeroes.and.returnValue(of(mockHeroes));
      component.ngOnInit();
      expect(heroServiceSpy.getHeroes).toHaveBeenCalled();
      expect(component.heroes).toEqual(mockHeroes);
    });
  });

  describe('#getHeroes', () => {
    it('should fetch and set the heroes', () => {
      heroServiceSpy.getHeroes.and.returnValue(of(mockHeroes));
      component.getHeroes();
      expect(heroServiceSpy.getHeroes).toHaveBeenCalled();
      expect(component.heroes).toEqual(mockHeroes);
    });
  });

  describe('#add', () => {
    it('should not add a hero if the name is empty', () => {
      component.newHeroForm.controls.name.setValue('');
      component.add();
      expect(heroServiceSpy.addHero).not.toHaveBeenCalled();
    });

    it('should add a hero and push it to the heroes list', () => {
      const newHero: Hero = { id: 3, name: 'Hero 3' };
      heroServiceSpy.addHero.and.returnValue(of(newHero));

      component.newHeroForm.controls.name.setValue('Hero 3');

      expect(heroServiceSpy.addHero).toHaveBeenCalledWith({
        name: 'Hero 3',
      } as Hero);
      expect(component.heroes).toContain(newHero);
    });
  });

  describe('#delete', () => {
    it('should remove the hero from the heroes list', () => {
      component.heroes = [...mockHeroes];
      heroServiceSpy.deleteHero.and.returnValue(of({}));

      const heroToDelete = mockHeroes[0];
      component.delete(heroToDelete);

      expect(heroServiceSpy.deleteHero).toHaveBeenCalledWith(heroToDelete.id);
      expect(component.heroes).not.toContain(heroToDelete);
    });
  });
});
