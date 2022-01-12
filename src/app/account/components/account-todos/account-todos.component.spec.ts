import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTodosComponent } from './account-todos.component';

describe('AccountTodosComponent', () => {
  let component: AccountTodosComponent;
  let fixture: ComponentFixture<AccountTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
