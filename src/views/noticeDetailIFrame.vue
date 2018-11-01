<template>
  <div id="noticeDetail">
    <ywBar :title="'详情'"></ywBar>
    <div class="content">
      <iframe :src="src" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  import {
    queryAfficheDetail
  } from '../api/api'
  export default {
    data() {
      return {
        src:'',
      }
    },
    methods: {

    },
    mounted() {

    },
    activated() {
      this.src= '';
      this.src = decodeURIComponent(this.$route.query.url);
    },
  };

</script>

<style scoped>
  #noticeDetail {
    background: #fafafa;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    padding-top: 1.5rem;
    padding-bottom: .3rem;
    padding: 0.9rem 0 0 0;
  }

  .content iframe{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }

</style>
