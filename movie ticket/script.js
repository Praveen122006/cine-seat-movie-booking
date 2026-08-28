// basic details of the movie
const ticketPrice = 250;

// arrays and variables to keep track of booking state
let selectedSeats = [];
let selectedShowTime = "";

// getting elements we need to update
const selectedCountEl = document.getElementById("selected-count");
const totalPriceEl = document.getElementById("total-price");
const confirmationEl = document.getElementById("confirmation-message");

// ---------- SHOW TIME SELECTION ----------
const showtimeButtons = document.querySelectorAll(".showtime-btn");

showtimeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // remove active class from all buttons first
    showtimeButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // highlight the clicked button
    button.classList.add("active");

    // store the selected show time
    selectedShowTime = button.getAttribute("data-time");
  });
});

// ---------- SEAT SELECTION ----------
const seatButtons = document.querySelectorAll(".seat");

seatButtons.forEach(function (seat) {
  seat.addEventListener("click", function () {
    // booked seats cannot be selected
    if (seat.classList.contains("booked")) {
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      // seat already selected, so deselect it
      selectedSeats = selectedSeats.filter(function (s) {
        return s !== seat.id;
      });
      seat.classList.remove("selected");
    } else {
      // seat not selected yet, so select it
      selectedSeats.push(seat.id);
      seat.classList.add("selected");
    }

    updateSummary();
  });
});

// updates seat count and total price on the page
function updateSummary() {
  const total = selectedSeats.length * ticketPrice;
  selectedCountEl.textContent = selectedSeats.length;
  totalPriceEl.textContent = total;
}

// ---------- BOOK TICKET BUTTON ----------
const bookBtn = document.getElementById("book-btn");

bookBtn.addEventListener("click", function () {
  if (selectedSeats.length === 0) {
    confirmationEl.textContent = "Please select at least one seat.";
    return;
  }

  const total = selectedSeats.length * ticketPrice;
  const showTimeText = selectedShowTime === "" ? "Not selected" : selectedShowTime;

  confirmationEl.textContent =
    "Booking Confirmed!\n" +
    "Seats: " + selectedSeats.join(", ") + "\n" +
    "Show Time: " + showTimeText + "\n" +
    "Total: ₹" + total;
});
