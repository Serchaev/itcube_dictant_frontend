<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";

export default {
  data(){
    return{
      test: {},
      answers: [],
      query_again: false,
      send_again: false
    }
  },
  name: 'TestView',
  components: {
    HelloWorld
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    }
  },
  methods: {
    async getQuestions() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/getQuestions`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        );
        this.test = response.data;
      } catch (err) {
        console.log(err.response.status)
        if (err.response.status === 401) {
          const response = await axios.post(
              `${BACKEND_URL}/auth/refresh`,
              {
                refreshToken: this.refreshToken
              }
          );
          this.$emit("refresh", response.data);
          this.query_again = true;
          return null
        }
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    },
    async submitAnswers() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/submitAnswers`,
          {
            refreshToken: this.refreshToken
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            }
          }
        );

        this.$emit("submitAnswers", response.data);

      } catch (err) {
        console.log(err.response.status)
        if (err.response.status === 401) {
          const response = await axios.post(
              `${BACKEND_URL}/auth/refresh`,
              {
                refreshToken: this.refreshToken
              }
          );
          this.$emit("refresh", response.data);
          this.send_again = true;
          return null
        }
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    }
  },
  mounted() {
    this.getQuestions();
  },
  watch: {
    query_again(){
      this.getQuestions();
    },
    send_again(){
      this.submitAnswers();
    }
  }
}
</script>

<template>
    <h1>Test</h1>
</template>

<style scoped>

</style>


