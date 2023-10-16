<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Sepet Detayları</h1>

    <div v-if="cart.length > 0">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <div v-for="(product, index) in cart" :key="index" class="cart-item">
                <div class="product-info">
                  <div class="cart-item-details">
                    <img :src="product.thumbnail" :alt="product.title" class="cart-item-image" />
                    <div class="cart-item-info">
                      <h5>{{ product.title }}</h5>
                      <p>Fiyat: ${{ product.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
                <div class="quantity-controls">
                  <button @click="decrementQuantity(index)" class="decrement-button">-</button>
                  <span class="quantity">{{ product.quantity }}</span>
                  <button @click="incrementQuantity(index)" class="increment-button">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h3 class="text-center">Toplam Tutar</h3>
              <div class="total-info">
                <p>İndirimsiz Tutar: ${{ totalBeforeDiscount.toFixed(2) }}</p>
                <p>Toplam İndirim: ${{ totalDiscount.toFixed(2) }}</p>
                <p>Toplam: ${{ total.toFixed(2) }}</p>
              </div>
              <button class="buy-button">Satın Al</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-center">Sepetiniz boş.</p>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalBeforeDiscount() {
      return this.cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
    totalDiscount() {
      return this.cart.reduce((total, product) => {
        const discount = (product.price * product.discountPercentage) / 100;
        return total + discount * product.quantity;
      }, 0);
    },
    total() {
      return this.totalBeforeDiscount - this.totalDiscount;
    },
  },
  methods: {
    incrementQuantity(index) {
      this.$store.commit('incrementQuantity', index);
    },
    decrementQuantity(index) {
      this.$store.commit('decrementQuantity', index);
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.product-info {
  flex-grow: 1;
}
.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
}

.cart-item-quantity button {
  background-color: #f26a5b;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.decrement-button,
.increment-button {
  background-color: #ccc;
  color: #fff;
  border: none;
  width: 24px;
  height: 24px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
}

.increment-button {
  margin-left: 5px;
}

.quantity {
  font-size: 16px;
}

.total-info {
  margin-top: 20px;
  text-align: center;
}

.buy-button {
  background-color: #000;
  color: #fff; 
  border: none;
  border-radius: 5px;
  width: 100%; 
  padding: 10px 0; 
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buy-button:hover {
  background-color: #222;
}
</style>