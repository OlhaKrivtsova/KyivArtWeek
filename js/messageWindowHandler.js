import {openPopupWindow, closePopupWindow} from './popUpHandler.js';

const messageWindow = document.querySelector('.message');
const messageInform = messageWindow.querySelector('.message__inform');

export const openMessageWindow = message => {
  messageInform.innerHTML = message;
  openPopupWindow(messageWindow);
};

export const closeMessageWindow = () => {
  closePopupWindow(messageWindow);
};
