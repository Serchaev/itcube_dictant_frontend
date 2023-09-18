<script>

import axios from "axios";
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      is_error: false,
      is_load: false
    }
  },
  methods: {
    async submitLogin(){
      try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
          login: this.login,
          password: this.password
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
    goHome(){
      router.push('/')
    }
  }
}

</script>

<template>
<div class="login pt-4">
  <div class="container">
    <div class="login__logo">
      <img src="@/assets/AuthPage/logo.svg" alt="" @click="goHome">
    </div>
    <div class="login__title mt-4">
      <span>ВОЙТИ</span>
    </div>
    <form class="login__form mt-5 mt-lg-0"  @submit.prevent>
      <div class="login__input col-lg-8 offset-lg-2">
        <span>ЛОГИН</span>
        <input class="mt-1 p-2 p-lg-3" placeholder="Введите логин" type="text" v-model="login"/>
      </div>
      <div class="login__input col-lg-8 offset-lg-2 mt-5">
        <span>ПАРОЛЬ</span>
        <input class="mt-1 p-2 p-lg-3" placeholder="Введите пароль" type="password" v-model="password"/>
      </div>
      <div class="login__btn col-12 mt-5">
        <button @click="submitLogin">Войти</button>
      </div>
      <div class="login__info col-12 mt-3">
        <div><span>Нет аккаунта?</span></div>
        <div><span @click="this.$emit('isLoginFalse', false)">Зарегистрироваться</span></div>
      </div>
    </form>
  </div>
  <div class="background d-none d-lg-block">
    <img src="@/assets/AuthPage/background.svg" alt="">
  </div>

</div>
</template>

<style scoped>
.login{
  min-height: 100vh;
  position: relative;
}
.background{
  z-index: -1;
  position: absolute;
  bottom: 0;
  right: 0;
}
.login__logo{
  display: flex;
  justify-content: center;
}
.login__logo img:hover{
  cursor: pointer;
}
.login__title{
  display: flex;
  justify-content: center;
}
.login__title span{
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
.login__input{
  display: flex;
  flex-direction: column;

}
.login__input span{
  color: #8A2BE1;
  font-family: 'Exo', sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 106.667% */
  text-transform: uppercase;
}
.login__input input{

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
.login__input input:focus {
  outline: 0;
  border-bottom: 1px solid #8A2BE1;
}
.login__btn{
  display: flex;
  justify-content: center;
}
.login__btn button{
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

.login__info div{
  display: flex;
  justify-content: center;
}

.login__info div span{
  color: #350364;
  text-align: center;
  /* mob_base */
  font-family: 'Exo', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}

.login__info div:last-child span{
  text-decoration-line: underline;
}

.login__info div:last-child span:hover{
  cursor: pointer;
}

@media (max-width: 767px) {

  .login__logo img{
    width: 50px;
    height: 50px;
  }

  .login__title span{
    font-family: 'Rubik Glitch', sans-serif;
    font-size: 41px;
    line-height: 60px; /* 92.308% */
  }

  .login__input span{
    font-family: 'Exo', sans-serif;
    font-size: 25px;
    line-height: 32px; /* 106.667% */
  }
  .login__input input{


    font-family: "Exo", sans-serif;
    font-size: 20px;
  //line-height: 28px;
  }
  .background{
    //position: absolute;
    //width: 30%;
    //bottom: -50px;
  }
  .login__btn button{
    margin-top: 100px;
  }
}

@media (max-width: 576px) {
  .container{
    padding: 0 20px;
  }
}
</style>