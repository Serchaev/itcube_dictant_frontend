<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import BACK_URL from "@/services/index";
import router from "@/router";

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
      usernames: []
    }
  },
  name: 'AuthView',
  components: {
    HelloWorld
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
  <h1>auth</h1>
  <button @click="authorization">press</button>
</template>

<style scoped>

</style>


