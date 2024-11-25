import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['clear'], {
      messages: ['Message 1', 'Message 2'],
    });

    await TestBed.configureTestingModule({
      imports: [MessagesComponent],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display messages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('div.msgcontent').length).toBe(2);
    expect(compiled.textContent).toContain('Message 1');
    expect(compiled.textContent).toContain('Message 2');
  });

  it('should call clear on the MessageService when Clear messages is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(mockMessageService.clear).toHaveBeenCalled();
  });
});
