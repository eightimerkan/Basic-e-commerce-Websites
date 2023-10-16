<template>
  <div class="container mt-5">
    <div v-if="product" class="row">
      <div class="col-md-6">
        <div class="product-images">
          <button @click="prevImage" class="btn btn-dark image-control">
            <i class="fas fa-chevron-left"></i>
          </button>
          <img :src="currentImage" :alt="product.title" class="img-fluid product-image" />
          <button @click="nextImage" class="btn btn-dark image-control">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <h1 class="product-title">{{ product.title }}</h1>
        <star-rating :rating="product.rating" :round-start-rating="false" :star-size="25" :show-rating="false" class="rating-stars" active-color="gray" />
        <p class="product-price">Fiyat: ${{ product.price.toFixed(2) }}</p>
        <p class="product-stock" :class="{ 'text-danger': product.stock === 0 }">{{ product.stock > 0 ? 'Stokta var' : 'Tükenmiş' }}</p>
        <p class="product-brand">Marka: {{ product.brand }}</p>
        <p class="product-category">Kategori: {{ product.category }}</p>
        <p class="product-description">{{ product.description }}</p>
        <div class="d-flex align-items-center mb-3">
          <button @click="decrementQuantity" class="btn btn-dark quantity-control">-</button>
          <span class="quantity">{{ quantity }}</span>
          <button @click="incrementQuantity" class="btn btn-dark quantity-control">+</button>
        </div>
        <button class="btn btn-primary btn-lg btn-block" @click="addToCart(product)">Sepete Ekle</button>
        <div class="alert alert-success mt-3" v-if="showSuccessMessage">Ürün sepete eklendi.</div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Ürün bulunamadı.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StarRating from "vue-star-rating";

export default {
  computed: {
    ...mapGetters(['cartItemCount']),
    product() {
      return this.products.find(product => product.id === Number(this.$route.params.id));
    },
    currentImage() {
      return this.product.images[this.currentImageIndex];
    }
  },
  components: {
    StarRating,
  },
  data() {
    return {
      products: [],
      currentImageIndex: 0,
      quantity: 1,
      showSuccessMessage: false,
    };
  },
  mounted() {
    this.getDataFromJson();
  },
  methods: {
    addToCart(product) {
      this.showSuccessMessage = true;
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', { ...product, quantity: 1 });
      }
      this.quantity = 1;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      },
    async getDataFromJson() {
      try {
        const response = await fetch("data.json");
        if (!response.ok) {
          throw new Error("Failed to retrieve data");
        }
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error("An error occurred: " + error.message);
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.product.images.length - 1) {
        this.currentImageIndex++;
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  }
};
</script>


<style scoped>

.product-images {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image {
  border: 2px solid #333;
  max-height: 400px;
  max-width: 100%;
}

.image-control {
  background-color: #333;
  color: #fff;
  font-size: 24px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 10px;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.rating-stars {
  margin-bottom: 20px;
}

.product-price {
  font-size: 18px;
  margin-bottom: 15px;
}

.product-stock {
  font-size: 18px;
  margin-bottom: 15px;
}

.product-brand {
  font-size: 18px;
  margin-bottom: 15px;
}

.product-category {
  font-size: 18px;
  margin-bottom: 15px;
}

.product-description {
  font-size: 18px;
  margin-bottom: 20px;
}

.quantity-control {
  font-size: 24px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
}

.quantity {
  font-size: 24px;
  margin: 0 10px;
}

.btn-primary {
  display: block;
  font-size: 18px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #333;
}
</style>
