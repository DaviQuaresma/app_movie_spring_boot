import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MoviesService } from '../../../services/moviesService';
import { Title } from '@angular/platform-browser';
import { PaginationComponent } from '../../components/pagination/pagination';

interface Movie {
  id: number;
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  BoxOffice: string;
  Awards: string;
  Country: string;
  Language: string;
  Type: string;
}

@Component({
  selector: 'movie-page',
  standalone: true,
  templateUrl: './movie-page.html',
  imports: [CommonModule, FormsModule, MatIconModule, PaginationComponent],
})
export class MoviePage implements OnInit {
  private movieService = inject(MoviesService);
  
  movies = signal<Movie[]>([]);
  loading = signal<boolean>(false);
  newMovieTitle = signal<string>('');
  searchTitle = signal<string>('');
  showAddModal = signal<boolean>(false);
  flippedCards = signal<Set<number>>(new Set());
  
  // Pagination
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalItems = signal<number>(0);
  itemsPerPage = 10;
  

  ngOnInit() {
    this.loadMovies();
  }

  isFlipped(index: number): boolean {
    return this.flippedCards().has(index);
  }

  toggleFlip(index: number): void {
    const flipped = new Set(this.flippedCards());
    if (flipped.has(index)) {
      flipped.delete(index);
    } else {
      flipped.add(index);
    }
    this.flippedCards.set(flipped);
  }

  loadMovies(page: number = 1) {
    this.loading.set(true);
    
    this.movieService.GetMovies(this.itemsPerPage, page).subscribe({
      next: (response: any) => {
        this.movies.set(response.data || response.content);
        
        this.currentPage.set(page);
        this.totalPages.set(response.totalPages || 1);
        this.totalItems.set(response.totalElements || response.totalItems || 0);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar filmes:', error);
        alert('Erro ao carregar filmes');
        this.loading.set(false);
      }
    });
  }

  addMovie() {
    if (!this.newMovieTitle().trim()) {
      alert('Digite o título do filme');
      return;
    }

    this.loading.set(true);
    
    this.movieService.GetNewMovie(this.newMovieTitle()).subscribe({
      next: () => {
        this.newMovieTitle.set('');
        this.showAddModal.set(false);
        alert('Filme adicionado com sucesso!');
        this.loadMovies(); // Recarrega a lista
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao adicionar filme:', error);
        alert('Erro ao adicionar filme');
        this.loading.set(false);
      }
    });
  }

  deleteMovie(id: string, title: string, event: Event) {
    event.stopPropagation(); // Previne que o clique propague para o card
    
    if (!confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      return;
    }

    this.loading.set(true);
    
    this.movieService.DeleteMovie(id).subscribe({
      next: () => {
        alert('Filme excluído com sucesso!');
        this.loadMovies(); // Recarrega a lista
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao excluir filme:', error);
        alert('Erro ao excluir filme');
        this.loading.set(false);
      }
    });
  }

  openAddModal() {
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
    this.newMovieTitle.set('');
  }

  setNewMovieTitle(title: string) {
    this.newMovieTitle.set(title);
  }

  setSearchTitle(title: string) {
    this.searchTitle.set(title);
  }

  onPageChange(page: number) {
    this.loadMovies(page);
  }

  get filteredMovies() {
    const search = this.searchTitle().toLowerCase();
    if (!search) return this.movies();

    return this.movies().filter((movie) => movie.Title.toLowerCase().includes(search));
  }
}
