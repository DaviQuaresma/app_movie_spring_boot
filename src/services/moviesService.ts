import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private api = inject(ApiService);

  GetAllMovies() {
    return this.api.get('movie/allMovies');
  }

  GetMovies(totalPages: number, page: number) {
    return this.api.get('movie', {
      params: { totalPages, page },
    });
  }

  GetMoviesById(id: string) {
    return this.api.get(`movie/${id}`);
  }

  GetNewMovie(title: string) {
    return this.api.get('movie/search', {
      params: { title },
    });
  }

  DeleteMovie(id: string) {
    return this.api.delete(`movie/${id}`);
  }
}
