

<template>

  <div class="bg-white h-screen">

    <div class="w-full h-[5rem] flex justify-between items-center px-2">



      <div class="relative group flex z-19 w-[5rem] md:w-[8rem] h-[2.5rem] bg-hijauv rounded-md focus:animate-jump border border-birut">
        <button @click="submitSelectedItems" class=" bg-blue-500 text-white px-4 md:py-2 rounded focus:animate-jump m-auto">Simpan</button>
      </div>


      <div class="flex w-[18rem] md:w-[25rem] h-[4rem] justify-center items-center gap-2 md:gap-2 ">
                  
        <button @click="displayAjukan" class=" flex w-[7rem] h-[2.5rem] md:w-[8rem] md:h-[2.5rem] bg-white rounded-md border-2 border-birut2 hover:bg-birut  focus:animate-jump text-birut2 hover:text-white z-21 ">
              <h1 class=" mx-auto font-semibold  m-auto"> <span class="text-ms md:text-xl">+</span> Upload CSV</h1>
        </button>

        <div class="w-[11rem] h-[2.5rem] flex ">
            
            <form class=" w-[10rem] md:w-[15rem] h-[3rem]  ">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Cari</label>
                <div class="relative z-10">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" v-model="cari" id="default-search" class="block w-full p-[10px] ps-10 text-sm text-biru border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Cari pegawai..." required />
             
                    <div :class="{ 'hidden':!cari , 'block w-[15rem] max-h-[10rem] bg-birut p-2 overflow-auto' : cari}" class="absolute ">
                      <div class="flex item fruit" v-for="fruit in filteredList" :key="fruit.id">
                        <p  @click="handleClick(fruit)" class="text-white cursor-pointer hover:bg-kuning2 hover:text-black w-full">{{ fruit.nama }}</p>
                      </div>
                      <div class="item error" v-if="cari && !filteredList.length">
                        <p class="text-white">Data tidak ditemukan!</p>
                      </div>
                    </div>

                    
                </div>
            </form>

          </div>



      </div>

    </div>

    <div class="relative overflow-x-auto px-2 pt-5 z-10 h-[40rem] md:h-[50rem]">

      <!-- DATA TABLE -->
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 " v-if="jsonData.length">
        <thead class="text-xs text-birut2 uppercase ">
          <tr class="bg-birut3">
            <th scope="col" class="px-4 py-3">ID.</th>
            <th 
            scope="col" 
            class="px-5 py-3 cursor-pointer flex justify-start gap-2 items-center"
            @click="sortData('nama')"
          >
            <h1>Nama</h1> <span v-if="sortColumn === 'nama'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span><span v-if="!sortColumn"><img src="../assets/filter.png" class="w-3 h-3 object-contain " alt=""></span>
          </th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Telepon</th>
            <th scope="col" class="px-6 py-3">Alamat</th>
            <th scope="col" class="px-6 py-3 text-center">Simpan</th>
        </tr>
        </thead>


        <tbody>

          <tr class="bg-white " v-for="(item, index) in jsonData" :key="index" >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{{ item.id}}</th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{{ item.nama }}</th>
            <th class="px-4 py-4">{{ item.email }}</th>
            <th class="px-6 py-4">{{ item.telepon }}</th>
            <th class="px-6 py-4">{{ item.alamat }}</th>
            <td class="flex py-4">
              <input type="checkbox" v-model="selectedItems" :value="item" class="m-auto">
            </td>

          </tr>
        </tbody>
      </table>

    </div>
      
      


      <!-- Tambah Data -->
      <figure  v-show="PopAjukan"  class="flex justify-center items-center  z-10 fixed top-[5rem] left-0 md:top-[1rem] md:left-[1rem] w-full  h-[40rem]  animate-ajukan" >
        <div class="flex justify-center items-center  relative w-[23rem] md:w-[44rem] h-[40rem] md:h-[35rem] bg-birut rounded-xl ">
              <button @click="closePopup" class="  w-[2.2rem] h-[2rem] font-bold text-xl absolute rounded-full bg-white right-[.4rem] md:right-3 top-[.5rem] md:top-[1rem] hover:text-red">X</button>
   
              <div>
                <article v-show="!SlideBerhasil" class="flex flex-col justify-center items-center h-full md:h-[32rem] w-full gap-2 mt-[3rem] md:mt-2 ">

                  <div class="flex flex-col md:flex-row md:justify-center items-center h-full w-full md:w-[40rem] space-y-2 px-2">
                    
                    <!-- Kiri -->
                    <div class="flex flex-col justify-around items-center  w-full md:w-1/2 gap-2 h-[16rem] md:h-[30rem]">
                      <div class="max-w-sm mx-auto h-">
                        <h1 class="md:w-[20rem] text-center text-white">Uplaod Data CSV</h1>
                      </div>

                      <div class="flex md:flex-col mx-auto p-4 max-h-ms text-white">

                        <input type="file" @change="handleFileUpload" />
                        

                      </div>

                      <!-- <div class="text-black flex  ">
                        <button type="submit" class=" px-10 text-xl rounded-md bg-black text-white border-2 border-white focus:animate-jump ">Upload</button>
                      </div> -->
                    </div>

 
                  </div>
                </article>
              </div>


        </div>
    </figure>


    
    
          <!-- Detail Produk -->
           
          <figure v-show="showDetail" class="flex justify-center items-center z-9 fixed top-[5rem] left-[0rem] md:top-[5rem] md:left-[1rem] w-full h-[20rem] md:h-[40rem] animate-status z-20">
              <div v-if="filteredPick.length" class="flex relative w-[22rem] h-[37rem] top-[5rem] md:w-[50rem] md:h-[34rem] bg-biru rounded-xl">
                <button @click="closePopup" class="w-[2.2rem] h-[2rem] font-bold text-xl absolute rounded-full bg-white right-[1rem] md:right-10 top-[2rem] md:top-[2rem] hover:text-red">X</button>
                <article v-for="item in filteredPick" :key="item.id" class="flex flex-col justify-center items-center bg- h-[32rem] w-full m-4">
                  <div class="flex justify-center items-center h-full w-full">
                    <div class="w-[20rem] h-[24rem] md:w-[40rem] md:h-[24rem]">
                      <img src="../assets/user.png" alt="foto" class="w-full h-full object-contain" />
                    </div>
                    <div class="flex justify-around items-center bottom-[11rem] w-full h-[2rem] absolute text-warna1 font-KodeMono font-extrabold md:text-[1.1rem] text-[.7rem]">
                      <span class="bg-black px-3 rounded-lg">Email {{ item.email }}</span>
                      <span class="bg-black px-3 rounded-lg">Asal {{ item.alamat }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col justify-around items-center h-1/2 w-full p-5 gap-4 text-white">
                    <div class="w-full h-[2rem] text-2xl text-center font-Calistoga"><h1>{{ item.nama }}</h1></div>
                  </div>
                </article>
              </div>
            </figure>

    </div>




</template>

<script >
import { ref } from 'vue'
import axiosClient from '../axiosClient';
import axiosClient2 from '../axiosClient2';
import Papa from 'papaparse';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {

  data() {
    return {
      pegawaiData: [],
      datas2: [], // Data dari API kedua
     
      matchedData: [], // Data yang sesuai

      PopAjukan : false,
      SlideBerhasil : false,
      isDragging: false,
      pegawai: {
        nama: '',
        nik: '',
        foto: [],
        gender:'',
        alamat:'',
        no:'',
        jabatan:'',
          
      },
      preview: [],

      cari : '',
      gen: false ,
      tim: false ,
      sortColumn: '',
      sortDirection: 'asc',
      filterTime: '',
      filterGender: '',
      picks : null,  
      picks2 : '',  
      showDetail: false,

      jsonData: [],
      selectedItems: [], // Data yang terpilih
    };
  },

  computed : {

     
    filteredList() {
      if (!this.jsonData || this.jsonData.length === 0) {
        return [];
      }

      const searchTerm = this.cari ? this.cari.toLowerCase() : '';

      return this.jsonData.filter(pegawai =>
        pegawai && pegawai.nama && pegawai.nama.toLowerCase().includes(searchTerm)
      );
    },

    filteredPick() {
        if (this.picks) {
          return this.jsonData.filter(item => item.id === this.picks);
        }
        return []; // Kembalikan array kosong jika `picks` tidak ada
      },

    filteredAndSortedPegawaiData() {
      // Filtering berdasarkan waktu
      let filteredData = this.pegawaiData;
      if (this.filterTime === 'today') {
        const today = new Date().toISOString().slice(0, 10);
        filteredData = filteredData.filter(item => item.waktu.startsWith(today));
      } else if (this.filterTime === 'thisWeek') {
        const startOfWeek = this.getStartOfWeek(new Date());
        filteredData = filteredData.filter(item => new Date(item.waktu) >= startOfWeek);
      } else if (this.filterTime === 'thisMonth') {
        const thisMonth = new Date().toISOString().slice(0, 7);
        filteredData = filteredData.filter(item => item.waktu.startsWith(thisMonth));
      }

      if (this.filterGender === 'laki-laki'){
        filteredData = filteredData.filter(item => item.gender === 'laki-laki')
      } else if (this.filterGender === 'perempuan'){
        filteredData = filteredData.filter(item => item.gender === 'perempuan')
      }
      // Sorting berdasarkan kolom yang dipilih
      return filteredData.slice().sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    },
    




  }
,
methods : {

  handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.parseCSV(file);
      }
    },
    parseCSV(file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          this.jsonData = results.data;
          console.log("JSON Output:", results.data);
          this.PopAjukan = false
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    },

    submitSelectedItems() {
      axiosClient2.post('/data', { data: this.selectedItems })
        .then(response => {
          console.log('Data berhasil disimpan:', response.data);
          toast("Menyimpan data yang dipilih", {
            autoClose: 2500, // durasi toast dalam milidetik
            position: "top-center"
          });
          
        }
      )
        .catch(error => {
          console.error('Error menyimpan data:', error);
        });
    },

  filterByTime(timeFrame) {
      this.filterTime = timeFrame;
    },

  filterByGender(gender) {
    this.filterGender = gender;
  },

  getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Menyesuaikan ke Senin (1)
    return new Date(date.setDate(diff));
  },

  sortData(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },

  closePopup() {
      this.showPopup = false;
      this.PopStatus = false ;
      this.PopAjukan = false ;
      this.SlideBerhasil = false ;
      this.showDetail = false;
          this.pesan = false
    },


    filterData() {  // Ingat kalo mau filtering Tipe datanya harus sama !
    
    this.matchedData = this.datas2.filter(item2 => 
      this.datas.some(item1 => item1.id === item2.id) 
    );
    console.log('Matched Data', this.matchedData);
  } ,
  
  
    gender(){
      this.gen = !this.gen;
    },

    time(){
      this.tim = !this.tim;
    },

    displayAjukan() {
      this.PopAjukan =  true
    
    },

    displayDetail() {
      this.showDetail = true;
      console.log('data Pick :',this.picks)
    },
    // closePopup() {
    //   this.showDetail = false;
    //   this.pesan = false
    // },

    pick(value){
      this.picks = value,
      console.log('Data Pick : ', value)
    },

    handleClick(fruit) {
      console.log(fruit.id);
      this.displayDetail();
      this.picks = fruit.id;
    },



  },


async created () {

}

}

</script>