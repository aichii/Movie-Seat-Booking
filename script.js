const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie'); //gives the actual element

let ticketPrice = +movieSelect.value; //gives the value of selected movie 

//update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount; //innerText is adjusted by the number of seats selected
  total.innerText = selectedSeatsCount * ticketPrice; //innerText is adjusted by the number calculated
}

//Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value
  updateSelectedCount();
})

//Seat select event
container.addEventListener('click', (e) => {
 if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
 { 
   e.target.classList.toggle('selected');

   updateSelectedCount();
 } 
})