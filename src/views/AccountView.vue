<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";

export default {
  data(){
    return {
      userData: {},
      is_loadUserData: false
    }
  },
  name: 'AccountView',
  props: {
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    async getUserData() {
      const resp = await fetch(
        `${BACKEND_URL}/auth/getUserData`,
        {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`,
        },
      });
      if (resp.status === 401) {
        const response = await axios.post(
          `${BACKEND_URL}/auth/refresh`,
          {
            refreshToken: this.refreshToken
          }
        );
        this.$emit("refresh", response.data);
        return null
      }
      this.userData = await resp.json();
    }
  },
  mounted() {
    this.getUserData();
  },
  watch: {
    accessToken(){
      this.getUserData();
    }
  }
}
</script>

<template>
    <h1>Account</h1>
</template>

<style scoped>

</style>


