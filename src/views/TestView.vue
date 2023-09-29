<script>
// @ is an alias to /src
import axios from "axios";
import Loader from "@/components/Loader.vue";
import router from "@/router";

export default {
  data(){
    return{
      test: {},
      answers: [],
      query_again: false,
      send_again: false,
      timer: 60,
      timerEnd: false,
      time: "00",
      numberQuestion: 1,
      question: {},
      humanAnswer: "",
      is_load: false,
      is_load_nextQuestion: false,
      reload: true,
      test_selected: false
    }
  },
  name: 'TestView',
  components: {
    Loader
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
    },
    is_complited_test: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    async getQuestions() {
      this.is_load = true
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
        // console.log(err.response.status)
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
    async timerTest(){
      if (this.timer > 0) {
        this.timer -= 1
        if (this.timer > 9){
          this.time = `${this.timer}`
        } else {
          this.time = `0${this.timer}`
        }
        setTimeout(
            this.timerTest,
            1000
        );
      } else {
        await this.sendHumanAnswer();
        if (this.numberQuestion < this.test['questions'].length) {

          this.timer = 60;
          this.numberQuestion += 1;
          localStorage.numberQuestion = this.numberQuestion
          this.setQuestion();
          await this.timerTest();
          this.is_load_nextQuestion = false
        }else{
          await this.sendFinish();
        }
      }
    },
    setQuestion(){
      // console.log(this.test['questions']);
      // console.log(this.test['questions'][this.numberQuestion - 1]);
      // console.log(this.test['questions'][this.numberQuestion - 1]['text']);
      // console.log(this.test['questions'][this.numberQuestion - 1]['answers']);
      this.humanAnswer = '';
      this.question = {
        text: this.test['questions'][this.numberQuestion - 1]['text'],
        answers: this.test['questions'][this.numberQuestion - 1]['answers']
      }
    },
    async sendHumanAnswer(){
      try {
        this.is_load = true;
        const response = await axios.post(
            `${BACKEND_URL}/api/v1/submitAnswers`,
            {
              answers: [{
                questionId: this.test['questions'][this.numberQuestion - 1]['_id'],
                selectedAnswer: this.humanAnswer
              }]
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`,
              }
            }
        );

      } catch (err) {
        // console.log(err.response.status)
        if (err.response.status === 401) {
          try {
            const response = await axios.post(
                `${BACKEND_URL}/auth/refresh`,
                {
                  refreshToken: this.refreshToken
                }
            );
            this.$emit("refresh", response.data);
            if (this.reload) {
              this.reload = false
              await this.sendHumanAnswer();
              return null
            }
          } catch (e) {
            alert("Произошла ошибка, попробуйте позже, перезайдите в аккаунт или напишите в тех. поддержку")
          }
        }
        this.is_error = true;
        alert("Произошла ошибка, попробуйте позже, перезайдите в аккаунт или напишите в тех. поддержку")
      } finally {
        this.is_load = false;
      }
    },
    async nextQuestion(){
      this.is_load = true
      this.timer = 0
    },
    async sendFinish(){
      this.is_load = true
      try {
        const response = await axios.get(
            `${BACKEND_URL}/api/v1/finishTest`,
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`
              }
            }
        );
        this.$emit("finishTest", response.data.is_complited_test);
        localStorage.numberQuestion = 1;
        await router.push('/account');
      } catch (err) {
        // console.log(err.response.status)
        if (err.response.status === 401) {
          const response = await axios.post(
              `${BACKEND_URL}/auth/refresh`,
              {
                refreshToken: this.refreshToken
              }
          );
          this.$emit("refresh", response.data);
          await this.sendFinish();
        }
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    }
  },
  created() {
    if (this.is_complited_test) {
      router.push('/account')
    }
  },
  mounted() {
    if (localStorage.numberQuestion) {
      // console.log('localStorage.numberQuestion', localStorage.numberQuestion)

      this.numberQuestion = +localStorage.numberQuestion

    }
    this.getQuestions();
  },
  watch: {
    query_again(){
      this.getQuestions();
    },
    test: {
      handler(){
        // console.log('this.numberQuestion', this.numberQuestion)
        // console.log('this.test[questions].length', this.test['questions'].length)
        // console.log('this.numberQuestion < this.test[questions].length', this.numberQuestion < this.test['questions'].length)
        if (this.numberQuestion < this.test['questions'].length) {
          this.setQuestion();
          this.timerTest();
        }else {
          this.sendFinish();
          alert("Тест пройден")
        }

      },
      deep: true
    },
  }
}
</script>

<template>
  <div class="test">
    <div class="test__header">
      <div class="container">
        <div class="row">
          <div class="test__logo offset-5 offset-lg-0 col-2">
            <img src="@/assets/HomePage/it_dozor.svg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="test__banner mt-5">
        <div class="row">
          <div class="test__questionText offset-lg-1 col-lg-2 offset-1 col-2">
            Вопрос
          </div>
          <div class="test__timer offset-lg-6 col-lg-1 offset-5 col-2">
            00:{{this.time}}
          </div>
        </div>
        <div class="test__questionNumber offset-1 col-11">
          <span>{{numberQuestion}}</span> из 30
        </div>

        <div class="account__eventImg">
          <img src="@/assets/AccountPage/event.svg" alt=""/>
        </div>
      </div>

      <div class="test__question">
        <div class="test__question__text offset-lg-1 col-11 mt-5 mb-5">
          {{this.question.text}}
        </div>
        <div class="test__question__answers offset-lg-1 col-11 mt-3" v-for="(item, index) in this.question.answers">
          <input type="radio" :id="`${index}`" :name="`answer-${this.numberQuestion}`" :value="`${item}`" v-model="this.humanAnswer" />
          <label class="test__answer ms-2" :for="`${index}`">{{item}}</label>
<!--          <input style="display: none" type="radio" :name="`answer-${this.numberQuestion}`" value="" v-model="this.humanAnswer" checked />-->
        </div>
      </div>
      <div class="test__btnNext">
        <button class="offset-lg-10 col-lg-2 col-12 mt-4" @click="nextQuestion">Далее</button>
      </div>
    </div>
    <Loader v-if="is_load_nextQuestion" />
    <Loader v-if="is_load" />
  </div>
</template>

<style scoped>

.test__header{
//height: 80px;
  background: var(--Linear, linear-gradient(95deg, #5A2BE1 24.85%, #B537F2 118%));
}
.test__logo{
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.test__banner{
  padding-top: 46px;
  position: relative;
  height: 200px;
  border-radius: 20px;
  background: var(--Linear, linear-gradient(95deg, #5A2BE1 24.85%, #B537F2 118%));
}

.test__questionText, .test__timer{
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 145.833% */
  text-transform: uppercase;
}

.account__eventImg{
  position: absolute;
  bottom: 0;
  right: 0;
}
.test__questionNumber{
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 218.75% */
  text-transform: uppercase;
}
.test__questionNumber span{
  font-family: 'Exo', sans-serif;
  font-size: 88px;
  line-height: 88px;
}
.test__question__answers{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.test__question__text{
  color: #350364;

  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 100% */
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.test__answer{
  color: #350364;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 100% */
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.test__btnNext button{
  padding: 11px 44px;
  border: none;
  border-radius: 10px;
  background: #67DA46;
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 100% */
}

@media (max-width: 767px) {

  .account__eventImg img{
    width: 100px;
  }

  .test__question__text{
    color: #350364;
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */
  }

  .test__answer{
    color: #350364;
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 100% */
  }

}

@media (max-width: 576px) {

  .container{
    padding: 0 20px;
  }
}
</style>


