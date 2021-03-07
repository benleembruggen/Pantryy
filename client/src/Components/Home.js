import React, { useState } from 'react';
import Pantry from './Pantry';
import Recipe from './Recipe';
import Grid from '@material-ui/core/Grid';
import AddItemModal from './AddItemModal';
import ShoppingList from './ShoppingList';
import CartService from '../Services/CartService';

function Home() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpenness] = useState(false);
  const [pantry, setPantry] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleCartOpen = () => setCartOpenness(!cartOpen);

  const refreshCart = () => {
    CartService.getCart().then(setCart);
  };

  return (
    <>
      <ShoppingList
        cart={cart}
        setCart={setCart}
        open={cartOpen}
        style={{ float: 'right' }}
      />
      <Grid container spacing={3}>
        <Grid item xs>
          <div style={{ height: `7vh` }}>
            <div style={{ fontFamily: 'Lobster', color: '#f59b90' }}>
              <h2 style={{ paddingTop: '5px' }}>Pantryy</h2>
            </div>
          </div>
          <Pantry
            pantry={pantry}
            setPantry={setPantry}
            setItemModalOpen={setOpen}
          />
        </Grid>
        <Grid item xs={10}>
          <Recipe
            cartOpen={cartOpen}
            refreshCart={refreshCart}
            onOpenShoppingList={toggleCartOpen}
          />
        </Grid>
      </Grid>
      <AddItemModal
        style={{ position: 'fixed' }}
        open={open}
        onClose={() => setOpen(false)}
        setPantry={setPantry}
      />
    </>
  );
}

export default Home;
