<template>
  <div id="app">

  <nav class="navbar navbar-expand-lg bg-color">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">ARTFOLIO</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/events" class="nav-link" exact-active-class="actives">EVENTS</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link" exact-active-class="actives">PROFILE</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" exact-active-class="actives">CONTACT</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

    <router-view/>
  </div>
</template>


