//API calls to .NET backend

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, State } from '../models/student.interface';

@Injectable({
  providedIn: 'root'  // Auto-registers everywhere
})
export class StudentService {
  private apiUrl = '/api/students';  // PROXY URL (not direct localhost:7001)

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(student: Student): Observable<Student> {
    console.log('Service: Adding student', student);
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.apiUrl}/${Number(id)}`);
  }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>('/api/students/states');
  }

}
