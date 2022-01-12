import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAlbumsComponent } from './account-albums.component';

describe('AccountAlbumsComponent', () => {
  let component: AccountAlbumsComponent;
  let fixture: ComponentFixture<AccountAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAlbumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
