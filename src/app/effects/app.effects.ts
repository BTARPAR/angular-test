import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {getListOfMoviesAction, movieListFetched} from '../actions/index.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {MoviesService} from '../service/movies.service';
import {EMPTY} from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private movieService: MoviesService) {
  }

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(getListOfMoviesAction),
    mergeMap(() => {
      return this.movieService.getAllMovies()
        .pipe(
          map((movies) => movieListFetched({payload: movies})),
          catchError(() => EMPTY)
        );
    })
    )
  );
}
