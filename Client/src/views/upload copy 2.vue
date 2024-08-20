<template>
  <div>
    <h1>CSV to JSON Converter</h1>
    <input type="file" @change="handleFileUpload" />
    <div v-if="jsonData">
      <h2>JSON Output:</h2>
      <pre>{{ jsonData }}</pre>
    </div>
  </div>
</template>

<script>
import Papa from 'papaparse';

export default {
  data() {
    return {
      jsonData: null,
    };
  },
  methods: {
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
          this.jsonData = JSON.stringify(results.data, null, 2);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    },
  },
};
</script>

<style>
/* Optional styling */
h1 {
  font-family: Arial, sans-serif;
}

input[type="file"] {
  margin: 20px 0;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
}
</style>
