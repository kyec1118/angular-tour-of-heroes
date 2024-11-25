import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let messageService: jasmine.SpyObj<MessageService>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
  ];

  beforeEach(() => {
    const mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch heroes', () => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should fetch a hero by ID', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };

    service.getHero(1).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should add a new hero', () => {
    const newHero: Hero = { id: 3, name: 'Hero 3' };

    service.addHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

  it('should update a hero', () => {
    const updatedHero: Hero = { id: 1, name: 'Updated Hero' };

    service.updateHero(updatedHero).subscribe();

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('should delete a hero', () => {
    service.deleteHero(1).subscribe();

    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should search heroes by term', () => {
    service.searchHeroes('Hero').subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('api/heroes/?name=Hero');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should return empty array if search term is empty', () => {
    service.searchHeroes('').subscribe((heroes) => {
      expect(heroes.length).toBe(0);
    });
  });
});
