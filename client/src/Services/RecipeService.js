// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRecipes: async (item) => {
        const response = await fetch(`/recipe/search?name=${item}`);
        if(response.staus !== 401){
            return response.json().then((data => data));
        } else {
            return { message: {msgBody: 'UnAuthorized' }, msgError: true };
        }
    },
  };
  