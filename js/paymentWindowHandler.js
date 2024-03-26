import {closePopupWindow, openPopupWindow} from './popUpHandler.js';
import {getRequest, deleteRequest, patchRequest, url} from './request.js';
import {openMessageWindow, closeMessageWindow} from './messageWindowHandler.js';

const paymentWindow = document.querySelector('.payment');
const successWindow = document.querySelector('.success');
const htmlContainer = document.querySelector('.payment__html-container');

const buyTicketWindow = document.querySelector('.buy-tickets');
const btnReturn = paymentWindow.querySelector('.payment__btn-return');

let orderNumber;

const openPaymentWindow = (order, cost, date, amount, serverHtml) => {
  htmlContainer.innerHTML = serverHtml;
  orderNumber = order;
  const btnBuy = paymentWindow.querySelector('[type=submit]');

  //in a real project this data will be sent inside the payment form
  const orderId = paymentWindow.querySelector('.server-html__order-input');
  const orderCost = paymentWindow.querySelector('.server-html__cost-input');
  const orderDescription = paymentWindow.querySelector(
    '.server-html__description'
  );
  orderDescription.innerHTML = `Ви замовили квитки на ${date} у кількості ${amount} шт.`;
  orderId.value = order;
  orderCost.value = cost.toFixed(2);
  orderId.style.width = orderId.value.length + 4 + 'ch';
  orderCost.style.width = orderCost.value.length + 'ch';

  openPopupWindow(paymentWindow);
  btnBuy.addEventListener('click', receivePaymentResult);
};

const wait = interval => new Promise(resolve => setTimeout(resolve, interval));

const sendPaymentResult = async delay => {
  await wait(delay);
  try {
    await patchRequest(`${url.replace('.json', '/')}${orderNumber}.json`, {
      paymentStatus: 'success',
      // paymentStatus: 'error',
    });
  } catch (err) {
    console.log(err.message);
    //throw err;
  }
};

const receivePaymentResult = async () => {
  sendPaymentResult(5000);

  const timer = Date.now();
  openMessageWindow(`Обробка платежу ...<br><br>
  A client will be redirected to the new browser's tab where the payment page will be opened. 
  After the transaction the client will be returned to this page and receive the inform message.`);
  while (true) {
    await wait(3000);
    try {
      const {paymentStatus} = await getRequest(
        `${url.replace('.json', '/')}${orderNumber}.json`
      );
      // console.log(paymentStatus);
      if (!paymentStatus)
        throw new Error('no response from the payment system');
      if (paymentStatus === 'success') {
        openPopupWindow(successWindow);
        closeMessageWindow();
        closePopupWindow(paymentWindow);
      } else {
        openMessageWindow(
          'Неуспішний платіж <br> відмовлено платіжною системою <br> спробуйте ще'
        );
      }
      break;
    } catch (err) {
      console.log(err);
      if (Date.now() - timer > 15000) {
        openMessageWindow('Помилка отримання результату обробки платежу');
        break;
      }
    }
  }
};

const returnToBuyTicketWindow = async () => {
  openPopupWindow(buyTicketWindow);
  closePopupWindow(paymentWindow);
  try {
    await deleteRequest(`${url.replace('.json', '/')}${orderNumber}.json`);
  } catch (err) {
    console.log(err.message);
    //throw err;
  }
};

btnReturn.addEventListener('click', returnToBuyTicketWindow);

export default openPaymentWindow;
