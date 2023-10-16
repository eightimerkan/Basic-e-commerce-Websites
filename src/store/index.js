import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    setProducts(state, products) {
      state.products = products;
    },
    incrementQuantity(state, index) {
      state.cart[index].quantity++;
    },
    decrementQuantity(state, index) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      }
    },
  },
  actions: {
  },
  getters: {
    cartItemCount: (state) => state.cart.length,
  },
});
