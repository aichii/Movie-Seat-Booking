const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie'); //gives the actual element

populateUI();

let ticketPrice = +movieSelect.value; //gives the value of selected movie 

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

//copy selected seats into array
//map through that array
//return new array of indexes

 const seatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)); 

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount; //innerText is adjusted by the number of seats selected
  total.innerText = selectedSeatsCount * ticketPrice; //innerText is adjusted by the number calculated
}

//get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
  );

  if (selectedSeats !==null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !==null) {
    movieSelect.selectedIndex = selectedMovieIndex 
  }
};

//Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat select event
container.addEventListener('click', (e) => {
 if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
 { 
   e.target.classList.toggle('selected');

   updateSelectedCount();
 } 
});

//initial count and total set
updateSelectedCount();