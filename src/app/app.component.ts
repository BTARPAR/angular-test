import {Component, OnDestroy, OnInit} from '@angular/core';
import {getListOfMoviesAction} from './actions/index.actions';
import {select, Store} from '@ngrx/store';
import {AppState} from './app.state';
import {Movies} from './app.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private getData: Subscription;
  columns: any[] = [];
  displayedColumns: any[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(getListOfMoviesAction());
    this.getData = this.store.pipe(select((state: any) => state.filter)).subscribe((observer: { movies: Array<Movies> }) => {
      this.columns = Object.keys(observer.movies[0] || []).slice(1).reduce((acc, curr) => {
        acc.push({name: curr, title: curr.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')});
        return acc;
      }, []);
      this.displayedColumns = Object.keys(observer.movies[0] || []).slice(1);
    });
  }

  ngOnDestroy(): void {
    this.getData.unsubscribe();
  }
}

// https://api.publicapis.org/entries

