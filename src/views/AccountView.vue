<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import router from "@/router";
import Loader from "@/components/Loader.vue";

export default {
  data(){
    return {
      userData: {},
      is_loadUserData: false,
      ball: '',
      is_load: false,
      loginTmp: ''
    }
  },
  name: 'AccountView',
  props: {
    is_auth: {
      type: Boolean,
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
    // userAll: {
    //   type: Array,
    //   require: true
    // }
  },
  components: {
    Loader,
    HelloWorld
  },
  methods: {
    async getUserData() {
      this.is_load = true;
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
        try {
          const response = await axios.post(
              `${BACKEND_URL}/auth/refresh`,
              {
                refreshToken: this.refreshToken
              }
          );
          this.$emit("refresh", response.data);
          return null
        } catch (e) {
          this.$emit("logout", true);
          await router.push('/');
        } finally {

        }

      }
      this.userData = await resp.json();
      this.$emit('setUserData', this.userData)
      this.lastDigit();
      this.is_load = false;
    },
    async exitAccount(){
      // console.log("logout")
      try {
        this.is_load = true;
        const response = await axios.post(
            `${BACKEND_URL}/auth/logout`,
            {
              refreshToken: this.refreshToken
            }
        );
        this.$emit("logout", true);
        await router.push('/');
      } catch (err) {
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    },
    test(){
      if (this.is_auth) {
        router.push('/test');
      }
    },
    goHome(){
      router.push('/')
    },
    goSettings(){
      router.push('/settings')
    },
    lastDigit(){
      if (this.userData['scores']%10===0) {
        this.ball = 'БАЛЛОВ'
      }
      else if (this.userData['scores']%10===1) {
        this.ball = 'БАЛЛ'
      }
      else if (this.userData['scores']%10>1 && this.userData['scores']%10<5) {
        this.ball = 'БАЛЛА'
      }
      else if (this.userData['scores']%10>=5 && this.userData['scores']%10<=9) {
        this.ball = 'БАЛЛОВ'
      }
    },
    async downloadCertificate() {
      // this.is_load = true
      try {
        const response = await axios.get(
            `${BACKEND_URL}/api/v1/downloadCertificate`,
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`
              }
            }
        );
      } catch (err) {
        if (err.response.status === 401) {
          try {
            const response = await axios.post(
                `${BACKEND_URL}/auth/refresh`,
                {
                  refreshToken: this.refreshToken
                }
            );
            this.$emit("refresh", response.data);
            await this.sendFinish();
          }catch (e) {
            this.$emit("logout", true);
            await router.push('/');
          }
        }
        this.is_error = true;
      } finally {
        this.is_load = false;
      }
    }
  },
  created() {
    if (!this.is_auth) {
      router.push('/auth');
    }
  },
  mounted() {

    if (this.is_auth) {
      this.getUserData();
      let tmp = '';
      tmp = this.userData['login'];
      tmp = tmp.replaceAll(' ', '');
      tmp = tmp.replaceAll(':', '');
      tmp = tmp.replaceAll('/', '');
      tmp = tmp.replaceAll('\\', '');
      this.loginTmp = tmp;
      console.log(this.loginTmp);
    }
  },
  watch: {
    accessToken(){
      this.getUserData();
    },
    // is_auth(){
    //   if (!this.is_auth) {
    //     router.push('/auth');
    //   }
    // }
  }
}
</script>

<template>
  <div class="account">
    <div class="account__header">
      <div class="container">
        <div class="row">
          <div class="account__logo offset-5 offset-lg-0 col-2" @click="goHome">
            <img src="@/assets/HomePage/it_dozor.svg" alt="">
          </div>
          <div class="account__exit offset-3 offset-lg-8 col-1 col-lg-2">
            <button class="account__exit_item d-none d-lg-block" @click="exitAccount">Выйти</button>
            <img class="account__exit_item d-block d-lg-none" src="@/assets/AccountPage/Exit.svg" alt="Выйти" @click="exitAccount"/>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="account__title d-none d-lg-block mt-4">
        <h2>Аккаунт участника тестирования IT-ДОЗОР</h2>
      </div>
      <div class="account__line mt-4"></div>
      <div class="row account__info mt-5">
        <div class="account__avatar col-4 col-lg-2">
          <img src="@/assets/AccountPage/avatar.svg" alt="">
        </div>
        <div class="account__data col-8 col-lg-10">
          <div class="account__fullName">{{userData.first_name}} {{userData.last_name}}</div>
          <div class="account__login mt-1">{{ userData.login }}</div>
          <div class="account__settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M8.85645 12.5001C10.2372 12.5001 11.3564 11.3808 11.3564 10.0001C11.3564 8.61941 10.2372 7.50012 8.85645 7.50012C7.47573 7.50012 6.35645 8.61941 6.35645 10.0001C6.35645 11.3808 7.47573 12.5001 8.85645 12.5001Z" stroke="#350364" stroke-width="1.5"/>
              <path d="M10.3277 1.79341C10.0218 1.66675 9.63349 1.66675 8.85682 1.66675C8.08015 1.66675 7.69182 1.66675 7.38599 1.79341C7.18364 1.87718 6.99978 1.99999 6.84492 2.15485C6.69007 2.30971 6.56725 2.49357 6.48349 2.69591C6.40682 2.88175 6.37599 3.09925 6.36432 3.41508C6.35913 3.64341 6.29599 3.86666 6.18083 4.06389C6.06567 4.26112 5.90228 4.42584 5.70599 4.54258C5.50673 4.65428 5.28236 4.7135 5.05393 4.71467C4.82551 4.71583 4.60054 4.65891 4.40015 4.54925C4.12015 4.40091 3.91765 4.31925 3.71682 4.29258C3.27875 4.23497 2.83574 4.35367 2.48515 4.62258C2.22349 4.82508 2.02849 5.16091 1.64015 5.83341C1.25182 6.50591 1.05682 6.84175 1.01432 7.17091C0.985683 7.38796 1.00009 7.60852 1.05671 7.81999C1.11333 8.03147 1.21106 8.22972 1.34432 8.40341C1.46765 8.56341 1.64015 8.69758 1.90765 8.86591C2.30182 9.11341 2.55515 9.53508 2.55515 10.0001C2.55515 10.4651 2.30182 10.8867 1.90765 11.1334C1.64015 11.3026 1.46682 11.4367 1.34432 11.5967C1.21106 11.7704 1.11333 11.9687 1.05671 12.1802C1.00009 12.3916 0.985683 12.6122 1.01432 12.8292C1.05765 13.1576 1.25182 13.4942 1.63932 14.1667C2.02849 14.8392 2.22265 15.1751 2.48515 15.3776C2.65885 15.5108 2.8571 15.6086 3.06858 15.6652C3.28005 15.7218 3.50061 15.7362 3.71765 15.7076C3.91765 15.6809 4.12015 15.5992 4.40015 15.4509C4.60054 15.3413 4.82551 15.2843 5.05393 15.2855C5.28236 15.2867 5.50673 15.3459 5.70599 15.4576C6.10849 15.6909 6.34765 16.1201 6.36432 16.5851C6.37599 16.9017 6.40599 17.1184 6.48349 17.3042C6.56725 17.5066 6.69007 17.6905 6.84492 17.8453C6.99978 18.0002 7.18364 18.123 7.38599 18.2067C7.69182 18.3334 8.08015 18.3334 8.85682 18.3334C9.63349 18.3334 10.0218 18.3334 10.3277 18.2067C10.53 18.123 10.7139 18.0002 10.8687 17.8453C11.0236 17.6905 11.1464 17.5066 11.2302 17.3042C11.3068 17.1184 11.3377 16.9017 11.3493 16.5851C11.366 16.1201 11.6052 15.6901 12.0077 15.4576C12.2069 15.3459 12.4313 15.2867 12.6597 15.2855C12.8881 15.2843 13.1131 15.3413 13.3135 15.4509C13.5935 15.5992 13.796 15.6809 13.996 15.7076C14.213 15.7362 14.4336 15.7218 14.6451 15.6652C14.8565 15.6086 15.0548 15.5108 15.2285 15.3776C15.491 15.1759 15.6852 14.8392 16.0735 14.1667C16.4618 13.4942 16.6568 13.1584 16.6993 12.8292C16.728 12.6122 16.7136 12.3916 16.6569 12.1802C16.6003 11.9687 16.5026 11.7704 16.3693 11.5967C16.246 11.4367 16.0735 11.3026 15.806 11.1342C15.6108 11.0156 15.4489 10.8492 15.3357 10.6508C15.2224 10.4525 15.1614 10.2285 15.1585 10.0001C15.1585 9.53508 15.4118 9.11341 15.806 8.86675C16.0735 8.69758 16.2468 8.56341 16.3693 8.40341C16.5026 8.22972 16.6003 8.03147 16.6569 7.81999C16.7136 7.60852 16.728 7.38796 16.6993 7.17091C16.656 6.84258 16.4618 6.50591 16.0743 5.83341C15.6852 5.16091 15.491 4.82508 15.2285 4.62258C15.0548 4.48932 14.8565 4.39159 14.6451 4.33497C14.4336 4.27835 14.213 4.26394 13.996 4.29258C13.796 4.31925 13.5935 4.40091 13.3127 4.54925C13.1124 4.65876 12.8876 4.7156 12.6593 4.71443C12.431 4.71327 12.2068 4.65413 12.0077 4.54258C11.8114 4.42584 11.648 4.26112 11.5328 4.06389C11.4177 3.86666 11.3545 3.64341 11.3493 3.41508C11.3377 3.09841 11.3077 2.88175 11.2302 2.69591C11.1464 2.49357 11.0236 2.30971 10.8687 2.15485C10.7139 1.99999 10.53 1.87718 10.3277 1.79341Z" stroke="#350364" stroke-width="1.5"/>
            </svg>
            <span class="account__settingsLink ms-2" @click="goSettings">Настройки аккаунта</span>
          </div>
        </div>
      </div>
      <div class="account__events mt-5 p-2 pt-3 pt-lg-4 row">
        <div class="account__eventsTitle col-12">Доступные мероприятия</div>
        <div class="account__eventItem col-12 col-lg-6 mt-4 mt-lg-5">
          <span>Тестирование IT-ДОЗОР</span>
          <div class="account__eventImg">
            <img src="@/assets/AccountPage/event.svg" alt=""/>
          </div>
          <div class="account__eventGo" v-if="!is_complited_test">
            <span>ТЕСТ ЗАВЕРШЕН</span>
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="29" viewBox="0 0 17 29" fill="none" class="ms-3">-->
<!--              <path d="M2 27L15 14.5L2 2" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--            </svg>-->
          </div>
          <div class="account__eventGo" v-else>
            <span>НАБРАНО {{this.userData['scores']}} {{this.ball}}</span>
          </div>
        </div>
        <div class="col-12 mt-4 mt-lg-5">Скачать <a :href="'http://151.0.50.17:25565' + '/Certificates/' + `${this.loginTmp}` " download>СЕРТИФИКАТ</a></div>
        <div class="col-12 mt-4 mt-lg-5" v-if="this.userData['scores'] >= 90">Уважаемые участники Олимпиады! Обращаем Ваше внимание, что дипломы будут прикреплены в личный кабинет после издания приказа Управлением Образования Ростовской области.</div>
      </div>
    </div>
    <Loader v-if="is_load" />
  </div>
</template>

<style scoped>
.account__header{
  //height: 80px;
  background: var(--Linear, linear-gradient(95deg, #5A2BE1 24.85%, #B537F2 118%));
}
.account__logo{
  cursor: pointer;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.account__exit{
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.account__exit button{
  padding: 8px 36px;
  color: white;
  background: none;
  border-radius: 10px;
  border: 1px solid #FFF;
  //color: #FFF;
  text-align: center;
  font-family: 'Exo', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 116.667% */
}
.account__exit_item{
  cursor: pointer;
}
.account__title{
  color: #350364;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}
.account__line{
  border-bottom: 1px solid #d7cde0;
}
.account__fullName{
  color: #000;

  /* desk_base */
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 100% */
}

.account__login{
  color: rgba(0, 0, 0, 0.50);
  font-family: 'Exo', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
}

.account__data{
  position: relative;
}

.account__settings{
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 12px;
  bottom: 0;
}

.account__settingsLink{
  color: #350364;
  font-family: 'Exo', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
}

.account__events{
  color: #350364;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 100% */
}

.account__eventItem{
  position: relative;
  padding: 32px 48px;
  height: 250px;
  border-radius: 20px;
  background: #8A2BE1;
}

.account__eventItem span{
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 100% */
}

.account__eventImg{
  position: absolute;
  bottom: 5px;
  left: 5px;
}

.account__eventGo{
  position: absolute;
  font-family: 'Exo', sans-serif;
  right: 38px;
  bottom: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 767px) {

  .account__avatar{
    display: flex;
    justify-content: center;
  }

  .account__avatar img{
    width: 100px;
  }
  .account__fullName{
    color: #000;
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */
  }
  .account__login{
    color: rgba(0, 0, 0, 0.50);
    font-family: 'Exo', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
  }
  .account__settingsLink{
    color: #350364;
    font-family: 'Exo', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
  }

  .account__events{
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px; /* 160% */
    text-transform: uppercase;
  }



  .account__eventItem{
    position: relative;
    padding: 20px 24px;
    height: 150px;
    border-radius: 20px;
    background: #8A2BE1;
  }



  .account__eventItem span{
    color: #FFF;
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 100% */
  }

  .account__eventImg img{
    width: 95px;
  }

  .account__eventGo{
    color: #FFF;
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 100% */
    right: 24px;
    bottom: 16px;
  }

}

@media (max-width: 576px) {

  .container{
    padding: 0 20px;
  }
}
</style>


