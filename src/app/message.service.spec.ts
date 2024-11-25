import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a message', () => {
    service.add('Test message');
    expect(service.messages.length).toBe(1);
    expect(service.messages[0]).toBe('Test message');
  });

  it('should clear messages', () => {
    service.add('Test message');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
