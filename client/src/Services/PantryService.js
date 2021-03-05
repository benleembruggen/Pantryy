// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPantry: async () => {
    const response = await fetch('/user/pantry');
    if (response.status !== 401) {
      return response.json().then((data) => data);
    } else {
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    }
  },
  postItem: async (task) => {
    const response = await fetch('/user/item', {
      method: 'post',
      body: JSON.stringify(task),
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
