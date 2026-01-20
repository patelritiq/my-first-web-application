import { Routes } from '@angular/router';
import { StudentComponent } from './components/student/student';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },  
  { path: 'students', component: StudentComponent },                      
  { path: '**', redirectTo: '/students' }                    
];
