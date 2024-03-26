export class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

export const url =
  'https://react-project-udemy-92ee9-default-rtdb.firebaseio.com/ticketOrders.json';
export const postRequest = async (url, order) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
  // console.log(response);
  if (!response.ok) {
    throw new HttpError(response);
  }
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getRequest = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new HttpError(response);
  }
  const data = await response.json();
  // console.log(data);
  return data;
};

export const deleteRequest = async url => {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  // console.log(response);
  if (!response.ok) {
    throw new HttpError(response);
  }
  const data = await response.json();
  // console.log(data);
  return data;
};

export const patchRequest = async (url, result) => {
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(result),
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
  // console.log(response);
  if (!response.ok) {
    throw new HttpError(response);
  }
  const data = await response.json();
  // console.log(data);
  return data;
};
