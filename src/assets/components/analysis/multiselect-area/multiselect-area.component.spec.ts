import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectAreaComponent } from './multiselect-area.component';

describe('MultiselectAreaComponent', () => {
  let component: MultiselectAreaComponent;
  let fixture: ComponentFixture<MultiselectAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiselectAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
