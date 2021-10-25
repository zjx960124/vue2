<template>
  <div>
    <form-build :options="formOptions" @on-submit="submit"></form-build>
    <div style="height: 200px; background: red">
      <div style="height: 10vh; background: #04F9FA"></div>
    </div>
    <!--<svg width="325px" height="325px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 80
           A 45 45, 0, 0, 0, 125 125
           L 125 80 Z" fill="green"/>
      <path d="M230 80
           A 45 45, 0, 1, 0, 275 125
           L 275 80 Z" fill="red"/>
      <path d="M80 230
           A 45 45, 0, 0, 1, 125 275
           L 125 230 Z" fill="purple"/>
      <path d="M230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 Z" fill="blue"/>
    </svg>-->
  </div>
</template>

<script>
  import formOption from './demoData';
  import { Base64 } from 'js-base64';
  export default {
    name: 'index',
    data() {
      return {
        formOptions: formOption
      }
    },
    mounted() {
      let data = 'YWRzYWRzYWRhc2QxNTE1NDk4MzIxMzIx';
      console.log(Base64.decode(data))
    },
    methods: {
      submit() {}
    }
  }
</script>

<style scoped>

</style>
