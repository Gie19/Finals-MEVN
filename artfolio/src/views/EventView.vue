<template>
    <div class="events-page">
      <Header :HeadingTitle="'UPCOMING EVENTS'"></Header>
      <div class="eventspage-flex2">
        <div class="no-event" v-if="Events.length === 0">
          <h1>NO UPCOMING EVENTS</h1>
        </div>
        <div class="event-card-container" v-for="event in Events" :key="event.id" v-else>
            <div class="event-deets-photo">
              <img :src="event.image">
            </div>
            <div class="event-deets">
              <div class="event-name"><h2>{{  event.name  }}</h2></div>
              <div class="event-venue"><h4>{{ event.venue }}</h4></div>
              <div class="event-address"><h4>{{ event.address }}</h4></div>
              <div class="event-date"><h4>{{ event.date }}</h4></div>
              <div class="event-desc"><p>{{ event.description }}</p></div>
            </div>
        </div>
        
        
        <!-- <div class="event-card-container">
          <div class="event-deets-photo">
            <img src="../assets/edited bg.png" alt="">
          </div>
          <div class="event-deets">
              <div class="event-name"><h2>STICKER RIOT!</h2></div>
              <div class="event-venue"><h4>Hometown</h4></div>
              <div class="event-address"><h4>the hood, angeles</h4></div>
              <div class="event-date"><h5>Event Date</h5></div>
              <div class="event-desc">
                <p> Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEvent description Event description Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEventEvent description Event descriptionEventEvent </p>
              </div>
          </div>
        </div> -->
      </div>
  
      <Footer></Footer>
    </div>  
  </template>
  
  <script>
  import Footer from '../components/Footer.vue' ;
  import Header from '../components/Header.vue';
  import axios from "axios"
  export default {
  name: 'HomeView',
    components: {
      Header,
      Footer
    },
    name: 'HomeView',
    components: {
      Header,
      Footer
    },

    data() {
      return {
        Events: []
      };
    },

    created() {
      let apiURL = 'http://localhost:4000/api/all-events';
        axios.get(apiURL).then(res => {
          this.Events = res.data;
        }).catch(error => {
          console.log(error);
        });
    }
  }
  </script>
