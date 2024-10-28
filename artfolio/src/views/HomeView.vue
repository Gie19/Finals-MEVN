<template>
  <div class="home-page">
    <div class="header-home">
      <h1>ARTFOLIO</h1>
    </div>

    <div class="home-overview">
      <div class="home-title">
        <h1>Empowering Artists to Share Their Stories</h1>
      </div>

      <div class="home-desc">
        <p>Artfolio provides a dynamic platform for artists to host their own events, transforming their creative visions into engaging experiences. By connecting artists with audiences, we celebrate the unique narratives behind each work, fostering a vibrant community where art comes to life.</p>
      </div>
    </div>

    <div class="carousel-parent-div">
    <div class="carousel-container">
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="@/assets/carousel1.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="@/assets/carousel2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            
            <img src="@/assets/carousel3.jpg" class="d-block w-100" alt="...">
            <div class="feature-info">
           </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </div>
    
    <Footer></Footer>

  </div>  
</template>

<script>
import Footer from '../components/Footer.vue' ;
export default {
  name: 'HomeView',
  components: {
    Footer
  }
}
</script>
