<template>
  <div class="form-parent">

      <form class="row g-3 needs-validation" @submit.prevent="handleUpdateForm">
        <div class="col-md-12">
          <input autocomplete="off" type="text" class="update-form" id="name" placeholder="Name" v-model="event.name" required>
        </div>
        <div class="col-md-12">
          <input autocomplete="off" type="text" class="update-form" id="venue" placeholder="Venue"  v-model="event.venue" required>
        </div>
        <div class="col-md-12">
          <input  autocomplete="off" type="text" class="update-form" id="venueAddy" placeholder="Venue's Address" v-model="event.address" required>
        </div>
        <div class="col-md-12">
          <input type="date" class="update-form date-picker" id="date" v-model="event.date" :min="minDate" required>
        </div>
        <div class="col-md-12">
          <textarea autocomplete="off"  type="text" class="update-text" id="inquiries"  rows="10" cols="50" placeholder="Event Description" v-model="event.description" required></textarea>
        </div>

        <div class="col-md-12">
          <div v-if="event.image">
            <label>Current Image:</label><br>
            <img :src="event.image" alt="Event Image" class="img-fluid mt-2">
          </div>
            <label for="file-upload" class="custom-file-upload">
              <p>Upload Files </p>
            </label>
            <input id="file-upload" type="file" @change="handleFileUpload" accept=".jpg,.png" hidden><br>
            <span id="file-chosen">{{ fileChosenName }}</span>
            <small v-if="fileError" class="text-danger">{{ fileError }}</small>
       
        </div>
        
        <div class="col-2">
          <button class="btn btn-danger btn-block custom">UPDATE</button>
        </div> 
        
      </form>
</div>
</template>

<script>
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';  // Import Firebase storage instance

export default {
  data() {
    return {
      event: {
        name: '',
        venue: '',
        address: '',
        date: '',
        description: '',
        image: null,  // Existing image URL
      },
      image: null,  // New image file
      fileError: null,  // To hold file error messages
      minDate: '',     // To store today's date
      fileChosenName: ''  
    };
  },
  
  created() {
    // Set today's date in the format YYYY-MM-DD for the date input field
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;

    // Fetch event data by ID
    let apiURL = `http://localhost:4000/api/select-event/${this.$route.params.id}`;
    axios.get(apiURL).then((res) => {
      this.event = res.data;
    }).catch(error => {
      console.error(error);
    });
  },
  
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const validTypes = ['image/jpeg', 'image/png'];

      if (file && validTypes.includes(file.type)) {
        this.fileError = null;  // Clear any previous error messages
        this.image = file;
        this.fileChosenName = file.name;
      } else {
        this.fileError = 'Please upload a JPG or PNG image.';
        this.image = null;  // Clear the image if it's an invalid type
        this.fileChosenName = '';
      }
    },

    async handleUpdateForm() {
      let updatedEventData = { ...this.event };

      if (this.image) {
        // Upload new image to Firebase Storage if a new image is selected
        const storageRef = ref(storage, `events/${this.image.name}`);
        await uploadBytes(storageRef, this.image);
        const newImageUrl = await getDownloadURL(storageRef);
        updatedEventData.image = newImageUrl;  // Update the event's image URL
      }

      let apiURL = `http://localhost:4000/api/update-event/${this.$route.params.id}`;
      axios.put(apiURL, updatedEventData)
        .then(() => {
          this.$router.push('/profile');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
@import url('../styles/crudStyle.css');
</style>