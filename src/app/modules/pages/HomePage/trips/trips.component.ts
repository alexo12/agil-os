import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PostService } from '../../../../services/posts.service';
import { GetService } from '../../../../services/get.service';
import { DateService } from '../../../../services/date.service';
import { DBTrip } from '../../../../models/DBTrips';
import * as _ from 'lodash';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  @Input() notifications;
  @Input() counter;
  @Output() notify = new EventEmitter<number>();
  @Output() count = new EventEmitter<number>();
  trips;
  prices;
  screenWidth: number;

  // hardcoded user until we have the ability to save users with code
  email: string = 'lisaberteausmith@gmail.com';

  constructor(
    private post: PostService,
    private get: GetService,
    private date: DateService,
  ) {

  }
  ngOnInit() {
    this.prices = [];
    this.get.getTripsByUser(this.email)
    .subscribe((trips) => {
      this.trips = trips;
      this.trips.sort((a, b) => b.id - a.id);
      this.trips.filter((trip) => {
        if (trip.status === 'pending') {
          this.notifications += 1;
          this.outputNotify(this.notifications);
          console.log(this.notifications);
        } else {
          this.counter += 1;
          this.countEm(this.counter);
        }
      });
      console.log(trips);
      this.trips.forEach((trip) => {
        this.get.getTripPrices(trip)
        .subscribe((prices) => {
          this.prices.push(prices);
        });
      });
      console.log(this.prices);
    });

  }

  countEm(num) {
    this.count.emit(num);
  }

  outputNotify(num) {
    this.notify.emit(num);
  }

  approveTrip(trip) {
    trip['status'] = 'confirmed';
    this.post.updateTrip(trip)
    .subscribe();
    this.notifications -= 1;
    this.counter += 1;
    this.countEm(this.counter);
    this.outputNotify(this.notifications);
    console.log('was approved');
  }

  denyTrip(trip) {
    this.trips = this.trips.filter(t => t.id !== trip.id);
    this.get.deleteTrips(trip)
    .subscribe();
    this.notifications -= 1;
    this.outputNotify(this.notifications);
    console.log('was denied');
  }

  deleteTrip(trip) {
    // deletes from UI
    this.trips = this.trips.filter(t => t.id !== trip.id);
    // deletes from database
    this.counter -= 1;
    this.countEm(this.counter);
    this.get.deleteTrips(trip)
    .subscribe();
    console.log('delete me');
  }

}
