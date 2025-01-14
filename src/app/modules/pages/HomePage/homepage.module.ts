import { NgModule } from '@angular/core';
import { HomePageComponent } from './homepage.component';
import { HomePageRoutingModule } from './homepage-routing.module';
import { CommonModule } from '@angular/common';
import { MatMenuModule} from '@angular/material/menu';
import { StylesModule } from '../../../shared/styles.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TripsComponent } from './trips/trips.component';
import { TripItemComponent, DialogDeleteDialog } from './trip-item/trip-item.component';

@NgModule({
  declarations: [HomePageComponent, TripsComponent, TripItemComponent, DialogDeleteDialog],
  imports: [HomePageRoutingModule, StylesModule, CommonModule, ReactiveFormsModule, MatMenuModule],
  providers: [],
  entryComponents: [DialogDeleteDialog],
})

export class HomePageModule {}
