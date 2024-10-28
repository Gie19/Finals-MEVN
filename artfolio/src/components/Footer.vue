<template>
        <div class="footer-basic">
        <footer>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="/">Home</a></li>
                <li class="list-inline-item"><a href="/events">Events</a></li>
                <li class="list-inline-item"><a href="/profile">Profile</a></li>
                <li class="list-inline-item"><a href="/contact">Contact</a></li>
            </ul>
            <p class="copyright">Artfolio © 2024</p>
        </footer>
    </div>
</template>

<script>

</script>

<style scoped>
.footer-basic {
  padding:40px 0;
  background-color: var(--dark-gray);
  color: #11ffff;
}

.footer-basic ul {
  padding:0;
  list-style:none;
  text-align:center;
  font-size:18px;
  line-height:1.6;
  margin-bottom:0;
}

.footer-basic li {
  padding:0 10px;
}

.footer-basic ul a {
  color:inherit;
  text-decoration:none;
  opacity:0.8;
}

.footer-basic ul a:hover {
  opacity:1;
}


.footer-basic .social > a:hover {
  opacity:0.9;
}

.footer-basic .copyright {
  margin-top:15px;
  text-align:center;
  font-size:13px;
  color:#aaa;
  margin-bottom:0;
}

</style>
