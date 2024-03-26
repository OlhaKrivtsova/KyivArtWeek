import {postRequest, getRequest, HttpError, url} from './request.js';
import {openPopupWindow, closePopupWindow} from './popUpHandler.js';
import openPaymentWindow from './paymentWindowHandler.js';
import {openMessageWindow} from './messageWindowHandler.js';
import htmlForm from './paymentFormFromServer.js';

const order = {
  name: '',
  email: '',
  ticketDate: '',
  ticketPrice: 0,
  ticketQuantity: 0,
  ticketCost: 0,
};

const ticketSection = document.querySelector('.ticket-section');
const btnBuyTickets = ticketSection.querySelectorAll('.btn-buy-ticket');
const buyTicketWindow = document.querySelector('.buy-tickets');

const ticketDate = buyTicketWindow.querySelector('.buy-tickets__ticket-date');
const ticketPrice = buyTicketWindow.querySelector('.buy-tickets__ticket-price');
const ticketQuantity = buyTicketWindow.querySelector(
  '.buy-tickets__ticket-quantity'
);
const ticketCost = buyTicketWindow.querySelector('.buy-tickets__ticket-cost');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');

const btnChangeQuantity = buyTicketWindow.querySelectorAll('.buy-tickets__btn');
const btnDecrease = buyTicketWindow.querySelector(
  '.buy-tickets__btn--decrease'
);

const form = buyTicketWindow.querySelector('.buy-tickets__form');

const openWindowHandler = event => {
  ticketDate.value = event.target.dataset.date;
  ticketPrice.value = event.target.dataset.price;
  ticketCost.value = event.target.dataset.price;
  ticketQuantity.value = '1';
  btnDecrease.disabled = true;
  openPopupWindow(buyTicketWindow);
};

const changeQuantityHandler = event => {
  event.target.classList.contains('buy-tickets__btn--increase') &&
    ticketQuantity.value++;

  event.target.classList.contains('buy-tickets__btn--decrease') &&
    ticketQuantity.value--;

  ticketCost.value = (ticketPrice.value * ticketQuantity.value).toFixed(2);

  ticketQuantity.style.width = ticketQuantity.value.length + 'ch';
  ticketCost.style.width = ticketCost.value.length + 'ch';

  if (ticketQuantity.value === '1' && !btnDecrease.disabled)
    btnDecrease.disabled = true;
  if (ticketQuantity.value !== '1' && btnDecrease.disabled)
    btnDecrease.disabled = false;
};

const orderHandler = async event => {
  event.preventDefault();
  order.name = userName.value;
  order.email = userEmail.value;
  order.ticketDate = ticketDate.value;
  order.ticketPrice = +ticketPrice.value;
  order.ticketQuantity = +ticketQuantity.value;
  order.ticketCost = +ticketCost.value;

  try {
    ///send the order data to the server
    ////in our case send the data to the Firebase
    const {name: orderId} = await postRequest(url, order);

    ////receive payment button as HTML FORM from server
    ///// const serverHtml = await getRequest('server');
    const serverHtml = htmlForm;
    ////in our case receive the order data from the Firebase
    const {ticketCost, ticketDate, ticketQuantity} = await getRequest(
      `${url.replace('.json', '/')}${orderId}.json`
    );
    closePopupWindow(buyTicketWindow);
    openPaymentWindow(
      orderId,
      ticketCost,
      ticketDate,
      ticketQuantity,
      serverHtml
    );
  } catch (err) {
    console.log(err.message);
    if (err instanceof HttpError) {
      openMessageWindow('Упс! Щось трапилося... <br>Спробуйте знов.');
    }
    //else throw err;
  }
};

btnBuyTickets.forEach(item =>
  item.addEventListener('click', openWindowHandler)
);

btnChangeQuantity.forEach(item => {
  item.addEventListener('click', changeQuantityHandler);
});

form.addEventListener('submit', orderHandler);
