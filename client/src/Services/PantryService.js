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
  getPantry: async () => {
    const response = await fetch('/pantry');
    if (response.status !== 401) {
      return response.json().then((data) => sortListAlpha(data.pantry));
    } else {
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    }
  },
  postItem: async (item) => {
    const response = await fetch('/pantry/item', {
      method: 'post',
      body: JSON.stringify({ name: item, quantity: 1, unit: 'Gram' }),
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
  // editTask: async (task) => {
  //   const response = await fetch('user/task/edit', {
  //     method: 'post',
  //     body: JSON.stringify(task),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (response.status !== 401) {
  //     return response.json().then((data) => data);
  //   } else {
  //     return { message: { msgBody: 'UnAuthorized' }, msgError: true };
  //   }
  // },
};
