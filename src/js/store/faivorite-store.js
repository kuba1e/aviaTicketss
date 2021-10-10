import ticketsUI from "../views/tickets";
import locations from "./locations";
import currencyUI from '../views/currency';

  class Faivorite {
  constructor(){
    this.tickets = [];
    this.faivorites = document.querySelector('.dropdown-content')
  }

  findTickets(id){
    locations.lastSearch.map(elem =>{
      if(elem.id == id){
        this.addTicket(elem)
      } else {
        return
      }
    })

    console.log(this.tickets)
  }

  clearFaivorite(){
    this.tickets.length = 0;
  }

  addTicket(ticket){
    this.tickets.unshift(ticket);
  }

  generateList(){
    this.faivorites.innerHTML='';
    let fragment = '';
    this.tickets.forEach(ticket => {
      const template = this.favoriteTemplate(ticket, ticketsUI.currencySymbol);
      fragment += template;
    });
    this.faivorites.innerHTML= `${fragment}`
    console.log(fragment)

  }    

  favoriteTemplate(ticket, currency){
    return `
    <div class="favorite-item  d-flex align-items-start">
    <img src="${ticket.airline_logo}" class="favorite-item-airline-img"/>
    <div class="favorite-item-info d-flex flex-column">
      <div class="favorite-item-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${ticket.origin_name} </span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number" id='${ticket.id}>Номер рейса:${ticket.flight_number}</span>
      </div>
      <a class="delete-btn waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
    </div>
  </div>
    `
  }

}


const faivorites = new Faivorite()

export default faivorites