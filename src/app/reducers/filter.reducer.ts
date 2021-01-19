import {createReducer, on} from '@ngrx/store';
import {filterAction, movieListFetched} from '../actions/index.actions';
import {Movies} from '../app.interface';

const initialState: { movies: Array<Movies>, search: string } = {
  movies: [],
  search: ''
};

export const filterReducer = createReducer(initialState,
  on(filterAction, (state, action) => {
    const copyState = JSON.parse(JSON.stringify(state));
    copyState.movies = state.movies.filter((item: { name }) => item.name.search(action.input) !== -1);
    return copyState;
  }),
  on(movieListFetched, (state, action) => {
    return {...state, movies: [...action.payload]};
  })
);
