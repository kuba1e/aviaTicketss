import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import faivorites from './store/faivorite-store' 

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    function generateId(){
      return Math.trunc(Math.random()*1000000);
    };
  
    locations.lastSearch.forEach(ticket => {
      ticket.id = generateId()
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  const btns = document.querySelectorAll('.favorite-button')

  btns.forEach(elem=>{

    elem.addEventListener('click', (event) =>{
      event.preventDefault()
      if(event.target.classList.contains('favorite-button')){
        const idElem = event.target.parentElement.querySelector('.ticket-flight-number').id
        faivorites.findTickets(idElem);
        faivorites.generateList()
      }
    })
  })

});



// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlin
