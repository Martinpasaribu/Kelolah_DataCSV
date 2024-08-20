

<template>
<div class="flex flex-col justify-center items-center md:w-[20rem] bg-white m-2  ">
  <h1 class="text-birut2 text-center text-2xl font-bold font-sans w-[20rem] md:w-full h-[4rem]">Data Pegawai</h1>
  
    <div class="flex flex-row md:flex-col justify-around items-center w-[20rem] md:w-[15rem]  h-[4rem] md:h-[8rem] text-xl font-KodeMono font- text-white">

      
      <router-link :to="{ name :'home'}">
        <h1 class="flex bg-birut  w-[6rem] h-[2rem] md:w-[9rem] md:h-[3rem] rounded-lg"> <h1 class="m-auto">Home</h1> </h1>
      </router-link>

      <button @click="buttons" class="relative">
        <h1  class="flex bg-birut  w-[6rem] h-[2rem] md:w-[9rem] md:h-[3rem] rounded-lg"> <h1 class="m-auto">Data</h1>  </h1>
        <div  :class=" but ? 'absolute  -top-[5rem] -right-[2rem] md:top-[4rem] md:-right-[1rem] bg-birut w-[7rem] p-2 rounded-md animate-ajukan' : 'hidden' ">
          <ul class=" text-white  flex flex-col justify-center items-center ">
            <router-link :to="{ name :'coba'}" class="hover:bg-white hover:text-birut w-full">Kelolah</router-link>
            <router-link :to="{ name :'upload'}" class="hover:bg-white hover:text-birut w-full">Upload</router-link>
          </ul>
        </div>
      </button>
  
    
    </div>


</div>

</template>

<script >

export default {

data() {
  return {

    but: false
  }},

methods: {
  buttons(){
      this.but = !this.but;
    },

}

}


</script>