import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorComponent } from './monitor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MonitorComponent', () => {
  let component: MonitorComponent;
  let fixture: ComponentFixture<MonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorComponent,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
