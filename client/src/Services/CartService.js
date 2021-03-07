const sortListAlpha = (list) => {
  list.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return list;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCart: async () => {
    const response = await fetch('/cart');
    if (response.status !== 401) {
      // response.json().then(console.log);
      return response.json().then((data) => sortListAlpha(data.cart || []));
    } else {
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    }
  },
  postItem: async () => {
    const response = await fetch('/cart/item', {
      method: 'post',
      // body: JSON.stringify({ name: item.food.label, quantity, measure }),
      body: JSON.stringify({ name: 'Apple', quantity: 1500, measure: 'Gram' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 401) {
      return response.json().then((data) => data);
    } else {
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    }
  },
};
