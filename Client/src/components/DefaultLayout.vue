<template>
  <div class="flex flex-col md:flex-row  bg-gray-200 overflow-hidden ">

    <SideBar class=" overflow-hidden"/>
    <main class=" flex-1 w-full h-screen overflow-hidden m-2">
      <router-view />
    </main>
   
  </div>  
</template>

<script setup>
import SideBar from '../components/SideBar.vue'
</script>

<style scoped>
.bg-coba2 {
  background-image: url('/src/assets/bg5.jpg');
  background-size: cover; /* Membuat gambar mencakup seluruh elemen tanpa merusak proporsi */
  background-position: center; /* Memastikan gambar terpusat di elemen */
  background-repeat: no-repeat; /* Mencegah pengulangan gambar */
}
</style>