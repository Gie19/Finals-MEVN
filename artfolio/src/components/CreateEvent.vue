<template>
    <div class="form-parent">
  
    <form class="row g-3 needs-validation" @submit.prevent="handleSubmitForm">
        <div class="col-md-12">
            <!-- <input autocomplete="off" type="text" class="update-form" id="name" placeholder="Name" required> -->
            <input type="text" class="update-form" id="name" placeholder="Event Name" v-model="event.name" autocomplete="off" required>
        </div>
        <div class="col-md-6">
            <!-- <input autocomplete="off" type="text" class="update-form" id="venue" placeholder="Venue" required> -->
            <input type="text" id="venue" class="update-form" placeholder="Event Venue" autocomplete="off" v-model="event.venue"  required>
        </div>

        <div class="col-md-6">
            <input autocomplete="off" type="text" class="update-form" id="venueAddy" placeholder="Venue's Address" v-model="event.address" required>
            <!-- <input autocomplete="off" type="text" class="update-form" id="venueAddy" placeholder="Venue's Address" required> -->
        </div>

        <div class="col-md-12">
            <input type="date" class="update-form date-picker" id="date" v-model="event.date" :min="minDate" required>
            <!-- <input type="date" class="form-control" v-model="event.date" :min="minDate" required> -->
        </div>

        <div class="col-md-12">
            <textarea autocomplete="off"  type="text" class="update-text" id="inquiries"  rows="10" cols="50" placeholder="Event Description" v-model="event.description" required></textarea>
            <!-- <input type="text" class="form-control" v-model="event.description" required> -->
        </div>

        <div class="col-md-12">
          <label for="file-upload" class="modal-form-label">Event Image/Poster</label>
            <input id="file-upload" type="file" @change="handleFileUpload" accept=".jpg,.png" required hidden>
            <span id="file-chosen">{{ fileChosenName }}</span>
            <small v-if="fileError" class="text-danger">{{ fileError }}</small>
        </div>

        <div class="col-2">
            <button type="submit" class="custom">CREATE</button>
            <!-- <button type="submit" class="btn btn-danger btn-block">Create</button> -->
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
        image: null,  // Add image data
      },
      fileError: null,  // To hold file error messages
      minDate: '',// To store today's date
      fileChosenName: ''  
      
    };
  },
  created() {
    // Set today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;
  },
  
  methods: {
    handleFileUpload(event) {
  const file = event.target.files[0];
  const validTypes = ['image/jpeg', 'image/png'];

  if (file && validTypes.includes(file.type)) {
    this.fileError = null;  // Clear any previous error messages
    this.image = file;      // Store the file
    this.fileChosenName = file.name; // Update the file name display
  } else {
    this.fileError = 'Please upload a JPG or PNG image.';
    this.image = null;      // Clear the image if it's an invalid type
    this.fileChosenName = ''; // Clear the file name display if invalid
  }
}
,
    async handleSubmitForm() {
      if (!this.image) {
        console.error('No image file selected');
        return;
      }

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `events/${this.image.name}`);
      await uploadBytes(storageRef, this.image);
      const image = await getDownloadURL(storageRef);
      console.log(`Image URL: ${image}`)
      // Prepare form data and include the image URL
      const eventData = {
        ...this.event,
        image: image,  // Store the image URL in MongoDB
      };
      console.log(JSON.stringify(eventData))

      const apiURL = 'http://localhost:4000/api/create-event';
      axios.post(apiURL, eventData)
        .then(() => {
          this.$router.push('/profile');
          this.event = {
            name: '',
            venue: '',
            address: '',
            date: '',
            description: '',
            image: ''
          };
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
  