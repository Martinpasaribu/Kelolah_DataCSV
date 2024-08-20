<template>
  <div>
    <h1>Upload CSV File</h1>
    <form @submit.prevent="uploadCsv">
      <input type="file" @change="handleFileChange" accept=".csv" />
      <button type="submit" :disabled="!selectedFile">Upload</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      message: '',
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]; // Menyimpan file yang dipilih oleh pengguna
    },
    async uploadCsv() {
      if (!this.selectedFile) {
        this.message = 'Please select a file first!';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile); // Menambahkan file ke FormData

      try {
        const response = await axios.post('/upload-csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.message = response.data.msg; // Menampilkan pesan dari server
      } catch (error) {
        this.message = 'Failed to upload the file.';
      }
    },
  },
};
</script>

<style scoped>
/* Gaya CSS opsional */
h1 {
  color: #333;
}
button {
  margin-top: 10px;
}
p {
  color: green;
  margin-top: 10px;
}
</style>
