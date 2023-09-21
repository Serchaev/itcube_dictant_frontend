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
      is_load: false,
      step: false,
      is_confirm_password_correct: true,
      is_first_name_correct: true,
      is_last_name_correct: true,
      is_login_correct: true,
      is_password_correct: true,
      is_age_correct: true,
      is_phone_number_correct: true,
      is_school_correct: true,
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
      this.SchoolCorrect(this.school);
      if (!this.is_login_correct || !this.is_password_correct || !this.is_email_correct || !this.is_age_correct || !this.is_phone_number_correct || !this.is_last_name_correct || !this.is_first_name_correct || !this.is_school_correct) {
        return null
      }
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
        this.$emit('submitRegister', response.data)
        console.log(response.data);
        await router.push('/account');
      } catch (err) {
        console.log(err)
        this.is_error = true;
        alert("Ошибка, попробуйте позже");
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
    SchoolCorrect(school){
      this.is_school_correct = school.length > 0;
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
            <p v-if="!is_confirm_password_correct" style="color: red;">* Пароли не совпадают</p>
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
            <select class="mt-1 p-2 p-lg-2" v-model="school">
              <option value=""><label>- Выберите -</label></option><option value='МАОУ "Классич. лицей № 1"'>МАОУ "Классич. лицей № 1"</option>
              <option value='МБОУ "Школа № 1"'>МБОУ "Школа № 1"</option>
              <option value='МБОУ " Школа № 3"'>МБОУ " Школа № 3"</option>
              <option value='МБОУ "Школа № 4"'>МБОУ "Школа № 4"</option>
              <option value='МАОУ "Школа № 5"'>МАОУ "Школа № 5"</option>
              <option value='МБОУ "Школа № 6"'>МБОУ "Школа № 6"</option>
              <option value='МБОУ "Школа № 7"'>МБОУ "Школа № 7"</option>
              <option value='МБОУ "Школа № 8"'>МБОУ "Школа № 8"</option>
              <option value='МАОУ "Юр. гимназия № 9"'>МАОУ "Юр. гимназия № 9"</option>
              <option value='МАОУ "Школа № 10"'>МАОУ "Школа № 10"</option>
              <option value='МАОУ "Лицей № 11"'>МАОУ "Лицей № 11"</option>
              <option value='МБОУ "Гимназия № 12"'>МБОУ "Гимназия № 12"</option>
              <option value='МБОУ "Лицей № 13"'>МБОУ "Лицей № 13"</option>
              <option value='МАОУ "Лицей эк. № 14"'>МАОУ "Лицей эк. № 14"</option>
              <option value='МБОУ "Гимназия № 14"'>МБОУ "Гимназия № 14"</option>
              <option value='МБОУ "Школа № 15"'>МБОУ "Школа № 15"</option>
              <option value='МБОУ "Школа № 16"'>МБОУ "Школа № 16"</option>
              <option value='МБОУ "Школа № 17"'>МБОУ "Школа № 17"</option>
              <option value='МБОУ "Школа № 18"'>МБОУ "Школа № 18"</option>
              <option value='МБОУ "Гимназия № 19"'>МБОУ "Гимназия № 19"</option>
              <option value='МБОУ "Лицей № 20"'>МБОУ "Лицей № 20"</option>
              <option value='МБОУ "Школа № 21"'>МБОУ "Школа № 21"</option>
              <option value='МАОУ "Школа № 22"'>МАОУ "Школа № 22"</option>
              <option value='МБОУ "Школа № 23"'>МБОУ "Школа № 23"</option>
              <option value='МБОУ "Школа № 24"'>МБОУ "Школа № 24"</option>
              <option value='МБОУ "Гимназия № 25"'>МБОУ "Гимназия № 25"</option>
              <option value='МБОУ "Школа № 26"'>МБОУ "Школа № 26"</option>
              <option value='МАОУ "Лицей № 27"'>МАОУ "Лицей № 27"</option>
              <option value='МАОУ "Школа № 30"'>МАОУ "Школа № 30"</option>
              <option value='МБОУ "Школа № 31"'>МБОУ "Школа № 31"</option>
              <option value='МБОУ "Школа № 32"'>МБОУ "Школа № 32"</option>
              <option value='МАОУ "Лицей № 33"'>МАОУ "Лицей № 33"</option>
              <option value='МБОУ "Гимназия № 34"'>МБОУ "Гимназия № 34"</option>
              <option value='МБОУ "Гимназия № 35"'>МБОУ "Гимназия № 35"</option>
              <option value='МБОУ "Гимназия № 36"'>МБОУ "Гимназия № 36"</option>
              <option value='МБОУ "Школа № 37"'>МБОУ "Школа № 37"</option>
              <option value='МАОУ "Школа № 39"'>МАОУ "Школа № 39"</option>
              <option value='МБОУ "Школа № 40"'>МБОУ "Школа № 40"</option>
              <option value='МБОУ "Школа № 43"'>МБОУ "Школа № 43"</option>
              <option value='МБОУ "Школа № 44"'>МБОУ "Школа № 44"</option>
              <option value='МБОУ "Гимназия № 45"'>МБОУ "Гимназия № 45"</option>
              <option value='МБОУ "Гимназия № 46"'>МБОУ "Гимназия № 46"</option>
              <option value='МБОУ "Школа № 47"'>МБОУ "Школа № 47"</option>
              <option value='МБОУ "Школа № 49"'>МБОУ "Школа № 49"</option>
              <option value='МБОУ "Лицей № 50 при ДГТУ"'>МБОУ "Лицей № 50 при ДГТУ"</option>
              <option value='МБОУ "Лицей № 51"'>МБОУ "Лицей № 51"</option>
              <option value='МАОУ "Гимназия № 52"'>МАОУ "Гимназия № 52"</option>
              <option value='МАОУ "Школа № 53"'>МАОУ "Школа № 53"</option>
              <option value='МБОУ "Школа № 54"'>МБОУ "Школа № 54"</option>
              <option value='МАОУ "Школа № 55"'>МАОУ "Школа № 55"</option>
              <option value='МБОУ "Лицей № 56"'>МБОУ "Лицей № 56"</option>
              <option value='МБОУ "Лицей № 57"'>МБОУ "Лицей № 57"</option>
              <option value='МБОУ "Лицей № 58"'>МБОУ "Лицей № 58"</option>
              <option value='МАОУ "Школа № 60"'>МАОУ "Школа № 60"</option>
              <option value='МБОУ "Школа № 61"'>МБОУ "Школа № 61"</option>
              <option value='МАОУ "ДРГ № 62"'>МАОУ "ДРГ № 62"</option>
              <option value='МБОУ "Школа № 64"'>МБОУ "Школа № 64"</option>
              <option value='МБОУ "Школа № 65"'>МБОУ "Школа № 65"</option>
              <option value='МБОУ "Школа № 67"'>МБОУ "Школа № 67"</option>
              <option value='МБОУ "Школа № 68"'>МБОУ "Школа № 68"</option>
              <option value='МБОУ "Лицей № 69"'>МБОУ "Лицей № 69"</option>
              <option value='МАОУ "Школа № 70"'>МАОУ "Школа № 70"</option>
              <option value='МБОУ "Лицей эк. № 71"'>МБОУ "Лицей эк. № 71"</option>
              <option value='МБОУ "Школа № 75"'>МБОУ "Школа № 75"</option>
              <option value='МАОУ "Гимназия № 76"'>МАОУ "Гимназия № 76"</option>
              <option value='МАОУ "Школа № 77"'>МАОУ "Школа № 77"</option>
              <option value='МБОУ "Школа № 78"'>МБОУ "Школа № 78"</option>
              <option value='МБОУ "Школа № 79"'>МБОУ "Школа № 79"</option>
              <option value='МБОУ "Школа № 80"'>МБОУ "Школа № 80"</option>
              <option value='МБОУ "Школа № 81"'>МБОУ "Школа № 81"</option>
              <option value='МБОУ "Школа № 82"'>МБОУ "Школа № 82"</option>
              <option value='МБОУ "Школа № 83"'>МБОУ "Школа № 83"</option>
              <option value='МБОУ "Школа № 84"'>МБОУ "Школа № 84"</option>
              <option value='МБОУ "Школа № 86"'>МБОУ "Школа № 86"</option>
              <option value='МБОУ "Школа № 87"'>МБОУ "Школа № 87"</option>
              <option value='МБОУ "Школа № 88"'>МБОУ "Школа № 88"</option>
              <option value='МБОУ "Школа № 90"'>МБОУ "Школа № 90"</option>
              <option value='МБОУ "Школа № 91"'>МБОУ "Школа № 91"</option>
              <option value='МБОУ "Школа № 92"'>МБОУ "Школа № 92"</option>
              <option value='МБОУ "Школа № 93"'>МБОУ "Школа № 93"</option>
              <option value='МАОУ "Школа № 94"'>МАОУ "Школа № 94"</option>
              <option value='МБОУ "Гимназия № 95"'>МБОУ "Гимназия № 95"</option>
              <option value='МАОУ "Школа № 96"'>МАОУ "Школа № 96"</option>
              <option value='МБОУ "Школа № 97"'>МБОУ "Школа № 97"</option>
              <option value='МБОУ "Школа № 99"'>МБОУ "Школа № 99"</option>
              <option value='МБОУ "Школа № 100"'>МБОУ "Школа № 100"</option>
              <option value='МБОУ "Школа № 101"'>МБОУ "Школа № 101"</option>
              <option value='МБОУ "Лицей № 102"'>МБОУ "Лицей № 102"</option>
              <option value='МБОУ "Лицей № 103"'>МБОУ "Лицей № 103"</option>
              <option value='МАОУ "Школа № 104"'>МАОУ "Школа № 104"</option>
              <option value='МБОУ "Школа № 105"'>МБОУ "Школа № 105"</option>
              <option value='МБОУ "Школа № 106"'>МБОУ "Школа № 106"</option>
              <option value='МБОУ "Школа № 107"'>МБОУ "Школа № 107"</option>
              <option value='МБОУ "Школа № 109"'>МБОУ "Школа № 109"</option>
              <option value='МБОУ "Школа № 110"'>МБОУ "Школа № 110"</option>
              <option value='МБОУ "Школа № 111"'>МБОУ "Школа № 111"</option>
              <option value='МБОУ "Школа № 112"'>МБОУ "Школа № 112"</option>
              <option value='МБОУ "Школа № 113"'>МБОУ "Школа № 113"</option>
              <option value='МАОУ "Школа № 115"'>МАОУ "Школа № 115"</option>
              <option value='МБОУ "Гимназия № 117"'>МБОУ "Гимназия № 117"</option>
              <option value='МБОУ "Гимназия № 118"'>МБОУ "Гимназия № 118"</option>
            </select>
            <p v-if="!is_school_correct" style="color: red;">* Выберите учебное учреждение</p>
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
.register__input select:active{
  color: #8A2BE1;
  border: none;
  border-bottom: 1px solid #8A2BE1;
}
.register__input select:hover{
  color: #8A2BE1;
  border: none;
  border-bottom: 1px solid #8A2BE1;
}
.register__input select{
  color: #8A2BE1;
  border: none;
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

@media (max-width: 1140px) {

  .register__title span{
    font-family: 'Rubik Glitch', sans-serif;
    font-size: 92px;
    line-height: 135px; /* 92.308% */
  }
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

  .register__title span{
    font-family: 'Rubik Glitch', sans-serif;
    font-size: 36px;
    line-height: 52px; /* 92.308% */
  }
  .register__btn button{
    font-size: 20px;
    line-height: 24px;
  }
  .container{
    padding: 0 20px;
  }
}
</style>