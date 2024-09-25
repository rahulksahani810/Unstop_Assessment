import { Component } from '@angular/core';

@Component({
  selector: 'seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  // Seat layout: 11 rows of 7 seats + 1 row of 3 seats
  seats: boolean[][] = Array.from({ length: 12 }, (_, i) => Array(i === 11 ? 3 : 7).fill(false));
  seatNumbers: string[] = [];
  bookedSeats: string[] = [];
  totalSeats: number = 80;

  reserveSeats(requestedSeats: number) {
    this.bookedSeats = [];
    let seatsToBook = requestedSeats;

    // Loop through rows to find available seats
    for (let i = 0; i < this.seats.length; i++) {
      let row = this.seats[i];
      let availableCount = 0;

      // Check for consecutive available seats
      for (let j = 0; j < row.length; j++) {
        if (!row[j]) {
          availableCount++;
        } else {
          availableCount = 0;
        }

        // If we found enough available seats, book them
        if (availableCount === seatsToBook) {
          for (let k = j; k > j - seatsToBook; k--) {
            row[k] = true; // Mark seat as booked
            this.bookedSeats.push(`Row ${i + 1}, Seat ${k + 1}`);
          }
          return;
        }
      }
    }

    // If not enough seats in a row, find nearby seats
    this.findNearbySeats(requestedSeats);
  }

  findNearbySeats(seatsToBook: number) {
    let booked = 0;

    for (let i = 0; i < this.seats.length; i++) {
      let row = this.seats[i];
      for (let j = 0; j < row.length; j++) {
        if (!row[j]) {
          booked++;
          row[j] = true; // Mark seat as booked
          this.bookedSeats.push(`Row ${i + 1}, Seat ${j + 1}`);

          // Stop if we have booked enough seats
          if (booked === seatsToBook) {
            return;
          }
        }
      }
    }
  }
}
