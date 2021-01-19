import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<any> {
    return this.http.get('https://desolate-earth-48710.herokuapp.com/data');
  }
}
