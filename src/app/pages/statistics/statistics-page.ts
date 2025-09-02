import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
  imdbRating: string;
  boxOffice: string;
  awards: string;
  country: string;
  language: string;
  type: string;
}

interface GenreStats {
  genre: string;
  count: number;
  percentage: number;
  color: string;
}

interface DecadeStats {
  decade: string;
  count: number;
  percentage: number;
}

interface DirectorStats {
  director: string;
  count: number;
  movies: string[];
}

@Component({
  selector: 'statistics-page',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './statistics-page.html'
})
export class StatisticsPage implements OnInit {
  movies = signal<Movie[]>([]);
  loading = signal<boolean>(false);

  async ngOnInit() {
    await this.loadAllMovies();
  }

  async loadAllMovies() {
    try {
      this.loading.set(true);
      const response = await moviesService.getAllMovies();
      this.movies.set(response.data || response.content || response);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      this.loading.set(false);
    }
  }

  // Estatísticas computadas
  totalMovies = computed(() => this.movies().length);

  // Estatísticas por gênero
  genreStats = computed(() => {
    const movies = this.movies();
    const genreMap = new Map<string, number>();
    
    movies.forEach(movie => {
      if (movie.genre && movie.genre !== 'N/A') {
        const genres = movie.genre.split(',').map(g => g.trim());
        genres.forEach(genre => {
          genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
        });
      }
    });

    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
      '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'
    ];

    return Array.from(genreMap.entries())
      .map(([genre, count], index) => ({
        genre,
        count,
        percentage: Math.round((count / movies.length) * 100),
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  });

  // Estatísticas por década
  decadeStats = computed(() => {
    const movies = this.movies();
    const decadeMap = new Map<string, number>();
    
    movies.forEach(movie => {
      if (movie.year && movie.year !== 'N/A') {
        const year = parseInt(movie.year);
        if (!isNaN(year)) {
          const decade = `${Math.floor(year / 10) * 10}s`;
          decadeMap.set(decade, (decadeMap.get(decade) || 0) + 1);
        }
      }
    });

    return Array.from(decadeMap.entries())
      .map(([decade, count]) => ({
        decade,
        count,
        percentage: Math.round((count / movies.length) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  });

  // Top diretores
  directorStats = computed(() => {
    const movies = this.movies();
    const directorMap = new Map<string, string[]>();
    
    movies.forEach(movie => {
      if (movie.director && movie.director !== 'N/A') {
        const directors = movie.director.split(',').map(d => d.trim());
        directors.forEach(director => {
          if (!directorMap.has(director)) {
            directorMap.set(director, []);
          }
          directorMap.get(director)!.push(movie.title);
        });
      }
    });

    return Array.from(directorMap.entries())
      .map(([director, movieTitles]) => ({
        director,
        count: movieTitles.length,
        movies: movieTitles
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  // Estatísticas de avaliação IMDB
  ratingStats = computed(() => {
    const movies = this.movies();
    const validRatings = movies
      .filter(movie => movie.imdbRating && movie.imdbRating !== 'N/A')
      .map(movie => parseFloat(movie.imdbRating))
      .filter(rating => !isNaN(rating));

    if (validRatings.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        total: 0,
        distribution: []
      };
    }

    const average = validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length;
    const highest = Math.max(...validRatings);
    const lowest = Math.min(...validRatings);

    // Distribuição por faixa de rating
    const ranges = [
      { label: '9.0-10.0', min: 9.0, max: 10.0, count: 0, color: '#10B981' },
      { label: '8.0-8.9', min: 8.0, max: 8.9, count: 0, color: '#3B82F6' },
      { label: '7.0-7.9', min: 7.0, max: 7.9, count: 0, color: '#F59E0B' },
      { label: '6.0-6.9', min: 6.0, max: 6.9, count: 0, color: '#EF4444' },
      { label: '<6.0', min: 0, max: 5.9, count: 0, color: '#6B7280' }
    ];

    validRatings.forEach(rating => {
      const range = ranges.find(r => rating >= r.min && rating <= r.max);
      if (range) range.count++;
    });

    return {
      average: parseFloat(average.toFixed(1)),
      highest,
      lowest,
      total: validRatings.length,
      distribution: ranges.filter(r => r.count > 0)
    };
  });

  // Estatísticas de duração
  runtimeStats = computed(() => {
    const movies = this.movies();
    const validRuntimes = movies
      .filter(movie => movie.runtime && movie.runtime !== 'N/A')
      .map(movie => {
        const match = movie.runtime.match(/(\d+)/);
        return match ? parseInt(match[1]) : null;
      })
      .filter(runtime => runtime !== null) as number[];

    if (validRuntimes.length === 0) {
      return {
        average: 0,
        longest: 0,
        shortest: 0,
        total: 0
      };
    }

    const average = validRuntimes.reduce((sum, runtime) => sum + runtime, 0) / validRuntimes.length;
    const longest = Math.max(...validRuntimes);
    const shortest = Math.min(...validRuntimes);

    return {
      average: Math.round(average),
      longest,
      shortest,
      total: validRuntimes.length
    };
  });

  // Top países
  countryStats = computed(() => {
    const movies = this.movies();
    const countryMap = new Map<string, number>();
    
    movies.forEach(movie => {
      if (movie.country && movie.country !== 'N/A') {
        const countries = movie.country.split(',').map(c => c.trim());
        countries.forEach(country => {
          countryMap.set(country, (countryMap.get(country) || 0) + 1);
        });
      }
    });

    return Array.from(countryMap.entries())
      .map(([country, count]) => ({
        country,
        count,
        percentage: Math.round((count / movies.length) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  });

  // Filmes com prêmios
  awardsStats = computed(() => {
    const movies = this.movies();
    const moviesWithAwards = movies.filter(movie => 
      movie.awards && 
      movie.awards !== 'N/A' && 
      !movie.awards.toLowerCase().includes('nominations')
    );

    return {
      total: moviesWithAwards.length,
      percentage: Math.round((moviesWithAwards.length / movies.length) * 100),
      topAwardedMovies: moviesWithAwards
        .slice(0, 3)
        .map(movie => ({
          title: movie.title,
          awards: movie.awards,
          year: movie.year
        }))
    };
  });
}
