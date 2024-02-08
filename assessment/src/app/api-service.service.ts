import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  // Method to fetch GitHub user
  getUsers(pageSize: number): Observable<any[]> {
    // Include authentication token in the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer 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');

    // Make the GET request to /users with pagination parameters
    return this.http.get<any[]>(`${this.baseUrl}/users?per_page=${pageSize}`, { headers });
  }
  //  "https://api.github.com/search/users?q=Q"

  searchUsers(name : any, pageSize : any): Observable<any[]> {
    // Include authentication token in the request headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer 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');
//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
//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
    // Make the GET request to /users with pagination parameters
    return this.http.get<any[]>(`${this.baseUrl}/search/users?q=${name}&per_page=${pageSize}`, { headers });
  }
}
