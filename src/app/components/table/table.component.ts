import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Movies} from '../../app.interface';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() displayedColumns: string[];
  @Input() columns: any[];
  data: MatTableDataSource<Movies>;
  private filtered = 'asc';
  private filteredBy = '';
  private getData: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getData = this.store.pipe(select((state: any) => state.filter)).subscribe((observer: { movies: Array<Movies> }) => {
      this.data = new MatTableDataSource(observer.movies);
    });
  }

  ngOnDestroy(): void {
    this.getData.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>): any {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.currentTarget as HTMLElement).innerText.toLowerCase().replace(' ', '');

    if (this.filteredBy !== filterValue) {
      this.filteredBy = filterValue;
      this.filtered = 'asc';
    } else if (this.filteredBy === filterValue) {
      if (this.filtered === 'asc') {
        this.filtered = 'dec';
      } else {
        this.filtered = 'asc';
      }
    }

    const temp = JSON.parse(JSON.stringify(this.data.filteredData));
    this.data = new MatTableDataSource(temp.sort((a, b) => {
        let itemA;
        let itemB;

        switch (filterValue) {
          case 'runtime':
          case 'season':
          case 'number':
          case 'id' :
            itemA = a[this.filteredBy];
            itemB = b[this.filteredBy];
            break;
          case 'type':
          case 'name' :
            itemA = a[this.filteredBy].toString().toLowerCase();
            itemB = b[this.filteredBy].toString().toLowerCase();
            break;
          case 'airtime':
            const dateA = new Date();
            const dateB = new Date();
            const splitA = a[this.filteredBy].split(':');
            const splitB = b[this.filteredBy].split(':');
            dateA.setHours(splitA[0]);
            dateA.setMinutes(splitA[1]);
            dateB.setHours(splitB[0]);
            dateB.setMinutes(splitB[1]);
            dateB.setSeconds(0);
            itemA = dateA;
            itemB = dateB;
            break;
          case 'airstamp':
          case 'airdate' :
            itemA = new Date(a[this.filteredBy]);
            itemB = new Date(b[this.filteredBy]);
            break;
          default:
            break;
        }

        if (itemA < itemB) {
          if (this.filtered === 'dec') {
            return -1;
          }
          return 1;
        }
        if (itemA > itemB) {
          if (this.filtered === 'dec') {
            return 1;
          }
          return -1;
        }
        return 0;
      })
    );
  }

  inputFilter(event: Event): void {
    this.filtered = 'asc';
    this.filteredBy = '';
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    let temp: Movies[] = [];
    const subscription = this.store.pipe(select((state: any) => state.filter)).subscribe((observer: { movies: Array<Movies> }) => {
      temp = observer.movies;
    });
    this.data = new MatTableDataSource(temp.filter((item) =>
      item.name.toLowerCase().search(value) !== -1
    ));
    subscription.unsubscribe();
  }
}
