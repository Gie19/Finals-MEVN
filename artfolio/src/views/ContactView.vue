<template>
  <div class="Contact Us-page">
    <Header :HeadingTitle="'CONTACT US'"></Header>

    <div class="form-section">
      <div class="form-parent">
              <form class="row g-3 needs-validation">
                  <div class="col-md-6">
                      <input autocomplete="off" type="text" class="contact-form" id="firstName" placeholder="First Name" required>
                    </div>

                    <div class="col-md-6">
                      <input autocomplete="off" type="text" class="contact-form" id="lastName" placeholder="Last Name" required>
                    </div>

                    <div class="col-md-6">
                      <input autocomplete="off" type="email" class="contact-form" id="inputEmail4" placeholder="Email" required>
                    </div>

                    <div class="col-md-6">
                      <input  autocomplete="off" type="text" class="contact-form" id="contactNum" placeholder="Contact Number(Optional)">
                    </div>

                    <div class="col-md-12">
                      <textarea autocomplete="off"  type="text" class="contact-form" id="inquiries"  rows="10" cols="50" placeholder="Message or Inquiries" required></textarea>
                    </div>

                    <div class="col-12">
                      <button type="submit">SUBMIT</button>
                  </div>  
              </form>
          </div>
      </div>

      <Footer></Footer>
  </div>


   
</template>

<script>
 import Footer from '../components/Footer.vue' ;
  import Header from '../components/Header.vue';
  export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>
