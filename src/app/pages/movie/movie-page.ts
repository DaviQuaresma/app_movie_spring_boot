import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { moviesService } from '../../../services/api';

interface Movie {
  id: number;
  title: string;
  year: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  poster: string;
  runtime: string;
  imdb_rating: string;
  box_office: string;
  awards: string;
  country: string;
  language: string;
  type: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'movie-page',
  templateUrl: './movie-page.html',
  imports: [CommonModule, FormsModule],
})
export class MoviePage implements OnInit {
  movies = signal<Movie[]>([]);
  loading = signal<boolean>(false);
  newMovieTitle = signal<string>('');
  searchTitle = signal<string>('');
  showAddModal = signal<boolean>(false);
  flippedCards = signal<Set<number>>(new Set()); // Controla quais cards estão virados

  async ngOnInit() {
    await this.loadMovies();
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

  async loadMovies() {
    try {
      this.loading.set(true);
      const response = await moviesService.getMovies();
      this.movies.set(response.data || response);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      alert('Erro ao carregar filmes');
    } finally {
      this.loading.set(false);
    }
  }

  async addMovie() {
    if (!this.newMovieTitle().trim()) {
      alert('Digite o título do filme');
      return;
    }

    try {
      this.loading.set(true);
      await moviesService.getNewMovie(this.newMovieTitle());
      this.newMovieTitle.set('');
      this.showAddModal.set(false);
      await this.loadMovies(); // Recarrega a lista
      alert('Filme adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
      alert('Erro ao adicionar filme');
    } finally {
      this.loading.set(false);
    }
  }

  async deleteMovie(id: string, title: string) {
    if (!confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      return;
    }

    try {
      this.loading.set(true);
      await moviesService.deleteMovie(id);
      await this.loadMovies(); // Recarrega a lista
      alert('Filme excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
      alert('Erro ao excluir filme');
    } finally {
      this.loading.set(false);
    }
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

  get filteredMovies() {
    const search = this.searchTitle().toLowerCase();
    if (!search) return this.movies();

    return this.movies().filter((movie) => movie.title.toLowerCase().includes(search));
  }
}
