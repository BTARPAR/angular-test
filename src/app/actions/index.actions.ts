import {createAction, props} from '@ngrx/store';
import {Movies} from '../app.interface';

export const filterAction = createAction('[Filter Data] User is searching', props<{ input: string }>());
export const getListOfMoviesAction = createAction('[Get List Of Movies] Requesting Movies');
export const movieListFetched = createAction('[Movie List Of Fetched] List Fetched', props<{ payload: Array<Movies> }>());
