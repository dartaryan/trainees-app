import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolbarComponent } from './table-toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableToolbarComponent', () => {
  let component: TableToolbarComponent;
  let fixture: ComponentFixture<TableToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableToolbarComponent,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
