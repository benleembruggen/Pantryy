// eslint-disable-next-line import/no-anonymous-default-export
export default {
  suggestItems: async (item) => {
    const response = await fetch(`/item/suggest?name=${item}`);
    if (response.status !== 401) {
      return response.json().then((data) => data);
    } else {
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    }
  },
};
