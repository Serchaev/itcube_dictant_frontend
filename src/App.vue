<script>
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  data() {
    return {
      user: {},
      is_complited_test: false,
      accessToken: "",
      refreshToken: "",
      is_auth: false,
    }
  },
  methods: {
    saveData(data){
      if (data.refreshToken.length > 0){
        this.is_auth = true
      }
      console.log("app data", data)
      this.user = data.user;
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      localStorage.userId = this.user.id;
      localStorage.userLogin = this.user.login;
      localStorage.userAge = this.user.age;
      localStorage.accessToken = this.accessToken;
      localStorage.refreshToken = this.refreshToken;
      localStorage.is_complited_test = this.is_complited_test;
    }
  },
  async mounted() {
    if (localStorage.userId && localStorage.userLogin && localStorage.userAge) {
      this.user.id = localStorage.userId;
      this.user.login = localStorage.userLogin;
      this.user.age = localStorage.userAge;
      this.user.is_complited_test = localStorage.is_complited_test;
    }
    if (localStorage.accessToken) {
      if (localStorage.accessToken.length > 0) {
        this.accessToken = localStorage.accessToken;
      }
    }
    if (localStorage.refreshToken) {
      if (localStorage.refreshToken.length > 0) {
        this.refreshToken = localStorage.refreshToken;
      }
    }



    if (this.accessToken.length > 0 && this.refreshToken.length > 0) {
      this.is_auth = true;
      try{
        const response = await axios.post(
            `${BACKEND_URL}/auth/refresh`,
            {
              refreshToken: this.refreshToken
            }
        );
        this.saveData(response.data);
      }catch (e) {
        this.saveData({
          user: {},
          accessToken: "",
          refreshToken: "",
        });
      }
    }


  },
}
</script>

<template>
  <div class="app">
    <router-view
        @register_user="saveData"
        @refresh="saveData"
        @submitAnswers="saveData"
        @submitLogin="saveData"
        :accessToken="this.accessToken"
        :refreshToken="this.refreshToken"
        :user="this.user"
        :is_auth="this.is_auth"
        :is_complited_test="this.is_complited_test"
    />
  </div>
</template>

<style>
body {
  //font-family: 'Exo Variable', sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input[type="text"] {
  font-family: inherit; /* 1 */
  font-size: inherit; /* 1 */
  line-height: inherit; /* 1 */
  margin: 0; /* 2 */
}
</style>
<script setup>
</script>