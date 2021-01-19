import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {filterReducer} from './reducers/filter.reducer';

import {AppComponent} from './app.component';
import {TableComponent} from './components/table/table.component';
import {FormsModule} from '@angular/forms';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './effects/app.effects';
import {MoviesService} from './service/movies.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ConditionalTitleCase} from './pipe/conditionalTitleCase.pipe';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ConditionalTitleCase
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    DragDropModule,
    StoreModule.forRoot({
      filter: filterReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
