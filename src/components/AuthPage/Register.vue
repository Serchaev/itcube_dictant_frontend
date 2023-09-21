<script>

import axios from "axios";
import router from "@/router";

export default {
  name: "Register",
  props: {
    usernames: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      login: "",
      password: "",
      confirm_password: "",
      age: 0,
      first_name: "",
      last_name: "",
      email: "",
      number_phone: "89",
      school: "",
      is_error: false,
      is_confirm_password_correct: false,
      is_load: false,
      step: false,
      is_first_name_correct: true,
      is_last_name_correct: true,
      is_login_correct: true,
      is_password_correct: true,
      is_age_correct: true,
      is_phone_number_correct: true,
      is_email_correct: true
    }
  },
  methods: {
    async submitRegister(){
      this.emailCorrect(this.email);
      this.phoneNumberCorrect(this.number_phone);
      this.ageCorrect(this.age);
      this.firstNameCorrect(this.first_name);
      this.lastNameCorrect(this.last_name);
      if (!this.is_login_correct || !this.is_password_correct || !this.is_email_correct || !this.is_age_correct || !this.is_phone_number_correct || !this.is_last_name_correct || !this.is_first_name_correct) {
        return null
      }
      alert("sent register")
      try {
        const response = await axios.post(`${BACKEND_URL}/auth/registration`, {
          first_name: this.first_name,
          last_name: this.last_name,
          age: this.age,
          school: this.school,
          email: this.email,
          phone_number: this.number_phone.toString(),
          login: this.login,
          password: this.password,
        });
        this.$emit('submitLogin', response.data)
        console.log(response.data);
      } catch (err) {
        console.log(err)
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    },
    stepNext(){
      this.loginCorrect(this.login);
      this.passwordCorrect(this.password);
      if (!this.is_login_correct || !this.is_password_correct){
        return null
      }
      this.is_confirm_password_correct = false;
      if (this.password === this.confirm_password) {
        this.step = true;
        this.is_confirm_password_correct = true;
        return null;
      }

    },
    loginCorrect(login){
      this.is_login_correct = true;
      let tmp = true
      this.usernames.forEach(e=>{
        if (e.login === login) {
          tmp = false
        }
      })
      this.is_login_correct = tmp;

    },
    emailCorrect(email){
      this.is_email_correct=email.includes("@");

    },
    ageCorrect(age){
      this.is_age_correct = true;
      if (age < 6 || age > 18){
        this.is_age_correct = false;
      }
    },
    phoneNumberCorrect(number_phone){
      this.is_phone_number_correct = number_phone.toString().length === 11;

    },
    passwordCorrect(password){
      this.is_password_correct = password.length > 7;
    },
    firstNameCorrect(first_name){
      this.is_first_name_correct = first_name.length > 0;
    },
    lastNameCorrect(last_name){
      this.is_last_name_correct = last_name.length > 0;
    },
    goHome(){
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="register pt-4 pb-5">
    <div class="container">
      <div class="register__logo">
        <img src="@/assets/AuthPage/logo.svg" alt="" @click="goHome">
      </div>
      <div class="register__title mt-4">
        <span>РЕГИСТРАЦИЯ</span>
      </div>
      <form class="register__form mt-4 mt-lg-0 pb-5"  @submit.prevent>
        <div v-if="!step">
          <div class="register__input col-lg-8 offset-lg-2">
            <span>ЛОГИН</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите логин" type="text" v-model="login"/>
            <p v-if="!is_login_correct" style="color: red;">* Пользователь с таким логином уже существует</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>ПАРОЛЬ</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите пароль" type="password" v-model="password"/>
            <p v-if="!is_password_correct" style="color: red;">* Длина пароля должна быть минимум 8 символов</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>ПОДТВЕРДИТЕ ПАРОЛЬ</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите пароль" type="password" v-model="confirm_password"/>
            <p v-if="is_confirm_password_correct" style="color: red;">* Пароли не совпадают</p>
          </div>
          <div class="register__btn col-12 mt-5">
            <button @click="stepNext">Далее</button>
          </div>
        </div>
        <div v-else-if="step">
          <div class="register__input col-lg-8 offset-lg-2">
            <span>ФАМИЛИЯ</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите фамилию" type="text" v-model="last_name"/>
            <p v-if="!is_first_name_correct" style="color: red;">* Поле должно быть заполненно</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>ИМЯ</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите имя" type="text" v-model="first_name"/>
            <p v-if="!is_last_name_correct" style="color: red;">* Поле должно быть заполненно</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>ВОЗРАСТ</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите возраст" type="number" v-model.number="age"/>
            <p v-if="!is_age_correct" style="color: red;">* Возраст участника от 7 лет до 18 лет</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>ЭЛ. ПОЧТА</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите свою почту" type="text" v-model="email"/>
            <p v-if="!is_email_correct" style="color: red;">* Некоректная почта</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>НОМЕР ТЕЛЕФОНА</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="89" type="number" v-model="number_phone"/>
            <p v-if="!is_phone_number_correct" style="color: red;">* Номер телефона должен состоять из 11 цифр</p>
          </div>
          <div class="register__input col-lg-8 offset-lg-2 mt-4">
            <span>ШКОЛА</span>
            <input class="mt-1 p-2 p-lg-2" placeholder="Введите пароль" type="password" v-model="school"/>
          </div>
          <div class="register__btn col-12 mt-5">
            <button @click="submitRegister">Зарегистрироваться</button>
          </div>
          <div class="col-12 mt-0 mt-lg-5">

          </div>
        </div>
      </form>
    </div>
    <div class="background d-none d-lg-block">
      <img src="@/assets/AuthPage/background.svg" alt="">
    </div>

  </div>
</template>

<style scoped>
.register{
  min-height: 100vh;
  position: relative;
}
.background{
  z-index: -1;
  position: absolute;
  bottom: 0;
  right: 0;
}
.register__logo{
  display: flex;
  justify-content: center;
}
.register__logo img:hover{
  cursor: pointer;
}
.register__title{
  display: flex;
  justify-content: center;
}
.register__title span{
  text-align: center;
  font-family: 'Rubik Glitch', sans-serif;
  font-size: 130px;
  font-style: normal;
  font-weight: 400;
  line-height: 180px; /* 92.308% */
  text-transform: uppercase;
  background: var(--Linear, linear-gradient(250deg, #3CB9FC 1.46%, #8A2BE1 106.98%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.register__input{
  display: flex;
  flex-direction: column;

}
.register__input span{
  color: #8A2BE1;
  font-family: 'Exo', sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 106.667% */
  text-transform: uppercase;
}
.register__input input{

  background: none;
  border: none;
  border-bottom: 1px solid #8A2BE1;

  line-height: 1.5;
  color: #8A2BE1;
  font-family: "Exo", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
//line-height: 28px;
}
.register__input input:focus {
  outline: 0;
  border-bottom: 1px solid #8A2BE1;
}
.register__btn{
  display: flex;
  justify-content: center;
}
.register__btn button{
  border: none;
  width: 357px;
  padding: 24px 48px;
  border-radius: 10px;
  background: var(--Linear, linear-gradient(250deg, #3CB9FC 1.46%, #8A2BE1 106.98%));

  /* Drop Shadow */
  box-shadow: 0px 4px 42px 0px rgba(18, 0, 82, 0.50), 5px -5px 11px 0px #B537F2 inset, -8px 4px 19px 0px #3CB9FC inset;
  color: #FFF;
  text-align: center;
  font-family: 'Exo', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
}

.register__info div{
  display: flex;
  justify-content: center;
}

.register__info div span{
  color: #350364;
  text-align: center;
  /* mob_base */
  font-family: 'Exo', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}

.register__info div:last-child span{
  text-decoration-line: underline;
}

.register__info div:last-child span:hover{
  cursor: pointer;
}

@media (max-width: 767px) {

  .register__logo img{
    width: 50px;
    height: 50px;
  }

  .register__title span{
    font-family: 'Rubik Glitch', sans-serif;
    font-size: 41px;
    line-height: 60px; /* 92.308% */
  }

  .register__input span{
    font-family: 'Exo', sans-serif;
    font-size: 25px;
    line-height: 32px; /* 106.667% */
  }
  .register__input input{


    font-family: "Exo", sans-serif;
    font-size: 20px;
  //line-height: 28px;
  }
  .background{
  //position: absolute;
  //width: 30%;
  //bottom: -50px;
  }
  .register__btn button{
    //margin-top: 100px;
  }
}

@media (max-width: 576px) {
  .container{
    padding: 0 20px;
  }
}
</style>