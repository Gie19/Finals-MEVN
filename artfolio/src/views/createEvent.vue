<template>
    <div class="updateForm">
   <Header :HeadingTitle="'HOST AN EVENT'"></Header>

   <CrudForms></CrudForms>
   
   
<Footer></Footer>
    </div>
  </template>

<script>
import Footer from '../components/Footer.vue' ;
import Header from '../components/Header.vue';
import CrudForms from '../components/CreateEvent.vue';
  export default {
  name: 'HomeView',
  components: {
    Header,
    CrudForms,
    Footer
  }
}

</script>
