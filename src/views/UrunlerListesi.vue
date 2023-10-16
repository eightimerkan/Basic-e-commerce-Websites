<template>
  <div class="container mt-5 urun-listesi">
    <h1 class="text-left mb-4">Ürünler</h1>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card">
          <div class="position-relative">
            <router-link :to="{ name: 'UrunDetay', params: { id: product.id } }" class="product-link">
              <img :src="product.thumbnail" :alt="product.title" class="card-img-top" />
            </router-link>
            <star-rating :rating="product.rating" :round-start-rating="false" :star-size="12" :show-rating="false" class="rating-stars" active-color="gray" />
          </div>
          <div class="card-body">
            <router-link :to="{ name: 'UrunDetay', params: { id: product.id } }" class="product-link">
              <h5 class="card-title">{{ formatTitle(product.title) }}</h5>
            </router-link>
            <p class="card-price">
              ${{ (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2) }}
              <span class="discounted-price">
                ${{ product.price }}
              </span>
            </p>
            <button class="btn btn-custom" @click="addToCart(product)">
              Sepete Ekle
            </button>
          </div>
          <div class="discount-badge">{{ product.discountPercentage }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItemCount']),
  },
  components: {
    StarRating,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getDataFromJson();
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product);
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
    formatTitle(title) {
      if (title.length > 20) {
        return title.slice(0, 17) + "...";
      } else {
        const padding = "".repeat(20 - title.length);
        return title + padding;
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
  margin: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.336);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-img-top {
  object-fit: cover;
  height: 190px;
  width: 190px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: translateX(0px) translateY(16px);
}

.rating-stars {
  transform: translateX(0px) translateY(20px);
}

.card-title {
  color: #000000;
  font-size: 15px;
  margin: 15px auto 15px auto;
  text-align: center;
}

.card-price {
  position: absolute;
  font-weight: bold;
  color: #000000;
  left: 14px;
  top: 290px;
}

.discounted-price {
  text-decoration: line-through;
  margin-left: 2px;
  font-size: 11px;
  color: #91777797;
}

.discount-badge {
  font-size: 9px;
  position: absolute;
  top: 3px;
  left: 3px;
  background-color: #bfb0af;
  color: white;
  padding: 3px 3px;
  border-radius: 5px;
}

.btn-custom {
  border-color: rgba(187, 186, 186, 0.76);
  border-width: 1px;
  border-radius: 10px;
  background-color: #ffffff00;
  color: rgba(0, 0, 0, 0.767);
  font-size: 12px;
  transform: translateX(75px) translateY(5px);
}

.product-link {
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.product-link:hover {
  opacity: 0.8;
}
</style>
