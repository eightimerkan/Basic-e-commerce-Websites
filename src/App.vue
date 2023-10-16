<template>
  <div class="app-container">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">DveB Mağaza</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Ürünler</router-link>
              </li>
              <li class="nav-item sepetim-link">
                <router-link to="/sepet" class="nav-link">
                  <span class="sepetim-text">Sepetim</span>
                  <span class="sepetim-count">({{ cartItemCount }})</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItemCount']),
  },
};
</script>

<style scoped>
.app-container {
  background-color: #dbe4e573;
  min-height: 100vh;
}

header {
  background-color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.467);
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
}

.navbar-nav .nav-link {
  font-size: 18px;
  margin: 0 10px;
}

main {
  padding: 20px 0;
}

.sepetim-link {
  position: relative;
  margin-left: auto;
  transform: translateX(800px) translateY(0px);
}

.sepetim-text {
  margin-right: 5px;
}

.sepetim-count {
  background-color: #f26a5b;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
  position: absolute;
  top: -5px;
  right: -5px;
}
</style>
