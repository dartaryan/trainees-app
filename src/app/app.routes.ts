import { Routes } from '@angular/router';
import { DataComponent } from '../assets/components/data/data.component';
import { AnalysisComponent } from '../assets/components/analysis/analysis.component';
import { MonitorComponent } from '../assets/components/monitor/monitor.component';

export const routes: Routes = [
    { path: 'data', component: DataComponent },
    { path: 'analysis', component: AnalysisComponent },
    { path: 'monitor', component: MonitorComponent },
    { path: '', redirectTo: '/data', pathMatch: 'full' },
];
