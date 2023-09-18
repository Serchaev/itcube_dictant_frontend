<script>
// @ is an alias to /src
import axios from "axios";
import index from "@/services/index.js";
import router from "@/router";
import Login from '@/components/AuthPage/Login.vue'
import Register from '@/components/AuthPage/Register.vue'

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      age: null,
      school: "",
      phone_number: "",
      login: "",
      password: "",
      is_load: false,
      is_error: false,
      usernames: [],
      is_login: true
    }
  },
  name: 'AuthView',
  components: {
    Login,
    Register
  },
  props: {
    is_auth: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async authorization() {
      this.is_load = true;
      try {
        const response = await axios.post(
            `${BACKEND_URL}/auth/registration`,
            {
              first_name: this.first_name,
              last_name: this.last_name,
              age: this.age,
              school: this.school,
              phone_number: this.phone_number,
              login: this.login,
              password: this.password,
            }
        );
        this.$emit("register_user", response.data);
      } catch (err) {
        console.log(err)
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    },
    async getUsernames() {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/getUsers`);
        this.usernames = response.data;
      } catch (err) {
        console.log(err)
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    },
    submitLogin(data){
      this.$emit("submitLogin", data)
    },
    isLoginFalse(data){
      this.is_login = data
    }
  },
  created() {
    if (this.is_auth) {
      console.log(123);
      router.push('/account');
    }
  },
  mounted() {
    this.getUsernames();
  }
}
</script>

<template>
  <div class="auth">
    <Login v-if="is_login" @submitLogin="submitLogin" @isLoginFalse="isLoginFalse"/>
    <Register v-else-if="!is_login"/>
  </div>
</template>

<style scoped>

</style>


