import { Component, OnInit } from '@angular/core';
import { ApiService } from './api-service.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, debounceTime } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  searchQuery: string = '';
  private unsubscribe$: Subject<void> = new Subject<void>();
  private searchInput$: Subject<string> = new Subject<string>();
  private previousQuery: string = ''; // Variable to store the previous search query
  private debounceTimer: any; // Variable to store the debounce timer

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getGitHubUsers();
  
    // Subscribe to the search input observable with debounce time and switchMap
    this.searchInput$
      .pipe(
        debounceTime(500),
        switchMap((query: string) => {
          if (query.trim() === '' || query === this.previousQuery) {
            return this.apiService.getUsers(50); // Return getUsers observable if query is empty or same as previous
          } else {
            return this.apiService.searchUsers(query, 50).pipe(
              catchError(error => {
                console.error('Error fetching GitHub users:', error);
                return [];
              })
            );
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((users: any) => {
        this.users = users.items || users;
        this.previousQuery = this.searchQuery; // Update previous query after successful API call
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getGitHubUsers(): void {
    this.apiService.getUsers(50).subscribe(
      (users: any[]) => {
        this.users = users;
        this.previousQuery = ''; // Clear previous query when getUsers is called
      },
      (error) => {
        console.error('Error fetching GitHub users:', error);
      }
    );
  }

  onSearch(): void {
    // Trim white spaces from the search query
    const trimmedQuery = this.searchQuery.trim();
  
    // Check if the trimmed query is non-empty
    if (trimmedQuery.length > 0) {
      // Call searchInput$ only if the query is non-empty
      this.searchInput$.next(trimmedQuery);
    } else {
      // Call getGitHubUsers() if the query is empty
      this.getGitHubUsers();
    }
  }

  updateSearchQuery(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim(); // Get the current search query
    
    // Clear the previous debounce timer
    clearTimeout(this.debounceTimer);

    // Check if the current query is different from the previous one
    if (query !== this.previousQuery) {
      this.searchQuery = query; // Update the searchQuery property

      // Set a new debounce timer to handle the API call
      this.debounceTimer = setTimeout(() => {
        this.onSearch(); // Call onSearch() to handle the search query
      }, 500);
    }
  }
}
