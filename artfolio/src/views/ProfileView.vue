<template>
  <div class="profile-page">
    <div class="header-profile-parent">
      <div class="header-profile">
        <div class="profile-pic-container">
          <img :src="Profile[0].image">
        </div>
    <div class="profile-info-container">
      <div class="user-details">
        <h1>{{ Profile[0].name }}</h1>
      </div>
      <div class="user-details">
        <h1>{{ Profile[0].address }}</h1>
      </div>
      <div class="buttons-flex buttons-flex-profile">

        <button class="profile-button" data-bs-toggle="modal" data-bs-target="#manageProfileModal" @click="openProfileModal(Profile[0])">Manage Profile</button>
      
        <a href="/create"><button class="profile-button">Host Event</button></a>
        <button class="profile-button managePortfolioButton" data-bs-toggle="modal" data-bs-target="#managePortfolio">Upload Portfolio</button>
      </div>
    </div>
  </div>
</div>

  <!-- Profile Modal -->
  <div class="modal fade" id="manageProfileModal" tabindex="-1" aria-labelledby="manageProfileModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">Manage Profile</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="handleProfileUpdate">
          <div class="modal-body">
            <div class="modal-form-alignment">
             
                <div class="col-md-12">
                  <input autocomplete="off" type="text" class="modal-form" id="name" placeholder="Name" v-model="profileData.name" required>
                </div>

              <div class="col-md-12">
                <input autocomplete="off" type="text" class="modal-form" id="address" placeholder="Address"  v-model="profileData.address" required>
              </div>
              
              <div class="col-md-12">
                <div v-if="profileData.image">
                  <label class="current-img"><p>Current Image</p></label><br>
                  <img :src="profileData.image" alt="Profile Image" class="img-fluid mt-2">
                </div>
                <label for="profileImg" class="modal-form-label">Profile Image</label>
                <input type="file"  id="profileImg" name="profileImg" @change="handleProfileFileUpload" accept=".jpg,.png" hidden>
                <small v-if="fileError" class="text-danger">{{ fileError }}</small>
              </div>
            </div>
            
          </div>
       
        <div class="modal-footer">
          <!-- <button type="button" class="modal-button" data-bs-dismiss="modal">Close</button> -->
          <!-- <button type="button" class="modal-button">Save changes</button> -->
          <button class="btn btn-danger btn-block modal-button" data-bs-dismiss="modal">Save Changes</button>
          <button type="button" data-bs-dismiss="modal"  class="modal-button">Cancel</button>
        </div>
      </form>
      </div>
    </div>
</div>

      <!-- Portfolio Modal -->
      <div class="modal fade" id="managePortfolio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLabel">Upload Portfolio</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
                <div class="modal-body">
                  <div class="modal-form-alignment">
                    <div class="col-md-12">
                      <label for="portImg" class="modal-form-label">Profile Image</label>
                      <input type="file" class="modal-form" id="portImg" name="portImg" accept=".jpg,.png" @change="handlePortfolioFileUpload" required hidden>
                      <div class="file-name"><span id="file-chosen"><p>{{ fileChosenName }}</p></span></div> 
                      <small v-if="fileError" class="text-danger">{{ fileError }}</small>
                    </div>
                  </div>
                </div>
              <div class="modal-footer">
                <button type="button" class="modal-button" data-bs-dismiss="modal">Close</button>
                <button type="button" class="modal-button" @click="addPortfolioImage" data-bs-dismiss="modal">Add to Portfolio</button>
              </div>
            </div>
          </div>
        </div>
  
      <div class="profile-portfolio">
        <div class="no-portfolio" v-if="Portfolio.length === 0">
          <h1>NO PORTFOLIO ADDED</h1>
        </div>
        <div class="portfolio-card-container"v-for="portfolio in Portfolio" :key="portfolio.id" v-else>
          <div class="dots">
            <img src="../assets/closeIcon2.svg" @click="deletePortfolio(portfolio._id)">
          </div>
          <img :src="portfolio.image">
        </div>

  
      </div>

      <div class="portfolio-events">
        <div class="no-hostedEvents" v-if="Events.length === 0">
          <h1>NO EVENTS HOSTED</h1>
        </div>
        <div class="portfolio-event-card-container"v-for="event in Events" :key="event.id" v-else>
            <div class="event-portfolio-deets-photo">
              <img :src="event.image">
            </div>
            <div class="event-portfolio-deets">
              <div class="event-name-profile"><h2>{{ event.name }}</h2></div>
              <div class="event-venue-profile"><h4>{{ event.venue }}</h4></div>
              <div class="event-address-profile"><h4>{{ event.address }}</h4></div>
              <div class="event-date-profile"><h5>{{ event.date }}</h5></div>
              <div class="event-date-desc"><p>{{ event.description }}</p></div>
              <div class="buttons-flex buttons-flex-event">
                <router-link :to="{ name: 'update', params: { id: event._id }}" class="button-event-profile edit-button">EDIT</router-link>
                <button @click.prevent="deleteEvent(event._id)" class="button-event-profile delete-button">DELETE</button>
              </div>
            </div>
        </div>     
      </div>
    
    <Footer></Footer>
    </div>  
  </template>
  
<script>
  import Footer from '../components/Footer.vue';
  import axios from "axios";
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { storage } from '../firebase'; 

  export default {
      name: 'HomeView',
      components: {
        Footer
      },
      data() {
        return {
          Events: [],
          Portfolio: [],
          Profile: [],
          profileData: {
            name: '',
            address: '',
            image: null,
          },
          newPortfolioImage: null,
          fileError: null,
          fileChosenName: ''
          }
      },
      created() {
        this.fetchEvents();
        this.fetchPortfolio();
        this.fetchProfile();
      },

  
    methods: {
      fetchEvents() {
        let eventApiUrl = 'http://localhost:4000/api/all-events';
        axios.get(eventApiUrl).then(res => {
          this.Events = res.data;
        }).catch(error => {
          console.log(error);
        });
      },

      fetchPortfolio() {
        let portfolioApiUrl = 'http://localhost:4000/api/all-portfolios';
        axios.get(portfolioApiUrl).then(res => {
          this.Portfolio = res.data;
        }).catch(error => {
          console.log(error);
        });
      },

      fetchProfile() {
        let profileApiUrl = 'http://localhost:4000/api/all-profile';
        axios.get(profileApiUrl)
        .then(async (res) => {
        if (res.data.length > 0) {
          this.Profile = res.data; // Set to fetched profile(s)
        } else {
        // If no profile exists, create a new one with default values
        const newProfile = {
          name: 'Default Name',
          address: 'Default Address',
          image: 'https://firebasestorage.googleapis.com/v0/b/artfolio-a29ae.appspot.com/o/profiles%2Fuser.png?alt=media&token=60887dc5-a10c-449a-b04f-b3fc95e99cfb' // Replace with your default image URL
        };
        
        // POST request to create the default profile
        const createdProfile = await axios.post('http://localhost:4000/api/create-profile', newProfile);
        this.Profile = [createdProfile.data]; // Store the newly created profile
      }
    })
    .catch(error => {
      console.log(error);
    });
},



      openProfileModal(profile) {
        this.profileData = { ...profile }; // Populate the modal with the profile data
      
      },

      closeProfileModal() {
        this.profileData = { name: '', address: '', image: null }; // Reset form data
        this.fileError = null; // Reset file error
      },

      // Function for uploading a portfolio image
      handlePortfolioFileUpload(event) {
    const file = event.target.files[0];
    const validTypes = ['image/jpeg', 'image/png'];

    if (file && validTypes.includes(file.type)) {
      this.fileError = null; // Clear previous error
      this.newPortfolioImage = file; // Store the valid file
      this.fileChosenName = file.name; // Update the fileChosenName with the selected file name
    } else {
      this.fileError = 'Please upload a JPG or PNG image.';
      this.newPortfolioImage = null; // Clear file if invalid
      this.fileChosenName = ''; // Clear the displayed file name if invalid
    }
  },

      // Function for uploading a profile image
      handleProfileFileUpload(event) {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];

        if (file && validTypes.includes(file.type)) {
          this.fileError = null; // Clear previous error
          // Upload the file to Firebase Storage
          const storageRef = ref(storage, `profiles/${file.name}`);
          uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              this.profileData.image = url; // Store the image URL, not the file itself
            });
          });
        } else {
          this.fileError = 'Please upload a JPG or PNG image.';
          this.profileData.image = null; // Clear file if invalid
        }
      },


        async handleProfileUpdate() {
          let updatedProfileData = { ...this.profileData };
            // Check if the image is a file (indicating a new image has been selected)
            if (this.profileData.image instanceof File) {
              // Upload new image to Firebase Storage if a new image is selected
              const storageRef = ref(storage, `profiles/${this.profileData.image.name}`);
              await uploadBytes(storageRef, this.profileData.image);
              const newImageUrl = await getDownloadURL(storageRef);
              updatedProfileData.image = newImageUrl; // Update the profile's image URL
            } else {
              // Retain the existing image URL if no new image is selected
              updatedProfileData.image = this.profileData.image;
            }

            let apiURL = `http://localhost:4000/api/update-profile/${this.profileData._id}`;
            axios.put(apiURL, updatedProfileData)
              .then(() => {
             
                alert('Profile successfully updated!');
                this.closeProfileModal();
                this.fetchProfile(); // Refresh profile data after update
                
              })
              .catch(error => {
                console.error(error);
              });
          },

       // Function to add the new portfolio image
    async addPortfolioImage() {
      if (!this.newPortfolioImage) {
        alert("Please select an image file to upload.");
        return;
      }

      try {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `portfolio/${this.newPortfolioImage.name}`);
        await uploadBytes(storageRef, this.newPortfolioImage);
        const downloadURL = await getDownloadURL(storageRef);

        // Prepare the data with the image URL
        const portfolioData = {
          image: downloadURL, // Use the Firebase Storage URL
        };

        // Send the data to your backend (MongoDB)
        const apiURL = 'http://localhost:4000/api/add-portfolio';
        await axios.post(apiURL, portfolioData);
        
        alert('Image successfully added to portfolio.');
        
        this.fetchPortfolio(); // Refresh portfolio after addition
        this.closePortfolioModal();
       
      } catch (error) {
        console.error('Error uploading image:', error);
      } 
    },     

    // Function to close the modal
    closePortfolioModal() {
      this.newPortfolioImage = null;
      this.fileError = null;
      location.reload();
    },

    // Function to delete a portfolio image
    deletePortfolio(id) {
      let apiURL = `http://localhost:4000/api/delete-portfolio/${id}`;
      console.log(`apiURL: ${apiURL}`)

      let indexOfArrayItem = this.Portfolio.findIndex(i => i._id === id);
      console.log(`index of Array Item: ${indexOfArrayItem}`)

      if (window.confirm("Do you really want to delete?")) {
        axios.delete(apiURL).then(() => {
          this.Portfolio.splice(indexOfArrayItem, 1);
        }).catch(error => {
          console.log(error);
        });
      }
    },

    deleteEvent(id) {
      let apiURL = `http://localhost:4000/api/delete-event/${id}`;
      let indexOfArrayItem = this.Events.findIndex(i => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios.delete(apiURL).then(() => {
          this.Events.splice(indexOfArrayItem, 1);
        }).catch(error => {
          console.log(error);
        });
      }
      }

    }

    
  };
</script>
