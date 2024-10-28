<template>
     <div class="headers">
        <h1>{{ HeadingTitle }}</h1>
      </div>

</template>

<script>
export default {
  props: {
    HeadingTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.headers{
  background-color: #100e0e;
  height: 30vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.headers h1 {
  font-family: var(--font1);
  color:  #11ffff;
  font-size: clamp(2.5rem, 5vw, 6rem);
}

</style>
