<script>

import router from "@/router";

export default {
  name: 'Header',
  methods: {
    router() {
      if (this.is_auth) {
        router.push('/account')
      } else if (!this.is_auth){
        router.push('/auth')
      }
    }
  },
  props: {
    is_auth: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<template>
  <section class="header">
    <div class="container">
      <div class="row head d-none d-lg-flex">
        <div class="col-lg-2">
          <img src="@/assets/HomePage/it_dozor.svg" alt="">
        </div>
        <div class="head__links offset-lg-3 col-lg-7 offset-xl-4 col-xl-6 offset-xxl-5 col-xxl-5">
          <div><a href="#part1">О мероприятии</a></div>
          <div><a href="#part2">Партнеры и организаторы</a></div>
          <div><a href="https://it-cube61.ru/" target="_blank">Сайт организации</a></div>
        </div>
      </div>
      <div class="title offset-lg-1 col-lg-8 col-12">
        <h1>IT-ДОЗОР</h1>
      </div>
      <div class="subtitle offset-lg-1 col-lg-5 mt-5 col-12">
        <h2>Веселое путешествие сквозь призму цифровых технологий!</h2>
      </div>
      <div class="auth_btn offset-lg-1 col-lg-5 mt-5 col-12">
        <button @click="router">{{ is_auth ? "В личный кабинет" : "Участвовать" }}</button>
      </div>
    </div>
    <div class="background vector1"><img src="../../assets/HomePage/vector1.png" alt=""></div>
    <div class="background circle"><img src="../../assets/HomePage/circle3.png" alt=""></div>
  </section>
</template>

<style scoped>
.head{
  display: flex;
  align-items: center;
  min-height: 84px;
  max-height: 84px;
  margin-top: -200px;
  margin-bottom: 160px;
}
.head__links{
  display: flex;
  justify-content: space-between;
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.head__links a{
  text-decoration: none;
  color: white;
}
.title h1{
color: #FFF;
  font-family: 'Rubik Glitch', sans-serif;
  font-size: 130px;
  font-style: normal;
  font-weight: 400;
  line-height: 120px; /* 92.308% */
  text-transform: uppercase;
}
.subtitle h2{
color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
}
.auth_btn button{
  border: none;
  color: #FFF;
  text-align: center;
  font-family: 'Exo', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;

  display: inline-flex;
  padding: 20px 40px 24px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--Linear, linear-gradient(250deg, #3CB9FC 1.46%, #8A2BE1 106.98%));
  /* Drop Shadow */
  box-shadow: 0px 4px 42px 0px rgba(18, 0, 82, 0.50), 5px -5px 11px 0px #B537F2 inset, -8px 4px 19px 0px #3CB9FC inset;
}

.header{
  position: relative;
  background: #350364;
  min-height: 700px;
  padding: 200px 0 80px 0;
  z-index: 1;
}

.background{
  position: absolute;
}

.circle{
  bottom: 0;
  right: 0;
  z-index: -1;
}

.vector1{
  top: 0;
  left: 0;
  z-index: -1;
}

@media (max-width: 1400px) {


  .circle img{
    max-width: 510px;
  }

  .vector1 img{
    max-width: 500px;
  }
  .title h1{
    font-size: 110px;
  }
}

@media (max-width: 1000px) {


  .circle img{
    max-width: 410px;
  }

  .vector1 img{
    max-width: 350px;
  }
}

@media (max-width: 800px) {


  .circle img{
    max-width: 310px;
  }

  .vector1 img{
    max-width: 300px;
  }

  .vector1{
    top: 50px;
  }
  .title h1{
    font-size: 90px;
  }
}

@media (max-width: 576px) {
  .container{
    padding: 0 20px;
  }


  .circle img{
    max-width: 210px;
  }

  .vector1 img{
    max-width: 200px;
  }

  .vector1{
    top: 50px;
  }
  .title h1{
    color: #FFF;
    //text-align: center;
    /* mob_h1 */
    font-family: 'Rubik Glitch', sans-serif;
    font-size: 53px;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 96.774% */
    text-transform: uppercase;
  }

  .subtitle h2{
    color: #FFF;
    /* mob_h2 */
    font-family: 'Exo', sans-serif;
    font-size: 18px;
    text-align: center;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
  .auth_btn{
    display: flex;
    justify-content: center;
  }
  .auth_btn button{
    font-size: 21px;
  }
  .header{
    min-height: 575px;
    padding-top: 150px;
  }
}
</style>