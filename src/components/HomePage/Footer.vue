<script>
export default {
  name: "Footer"
}
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="footer__content row">
        <div class="footer__about col-lg-5 col-12">
          <div class="row">
            <div class="footer__logo col-lg-4 col-2">
              <img src="@/assets/footer_logo.svg" alt="">
            </div>
            <div class="footer__desc col-lg-8 offset-1 offset-lg-0 col-9">
              Центр цифрового образования «IT-куб» – новый формат технической подготовки школьников от 8 до 18 лет в направлении информационных технологий.
            </div>
          </div>
        </div>
        <div class="footer__contacts offset-lg-3 col-lg-4 col-12 mt-5 mt-lg-0">
          <div>
            <span>КОНТАКТНАЯ ИНФОРМАЦИЯ</span>
          </div>
          <div class="mt-3">
            <img src="@/assets/target.svg" alt="" class="me-2">
            <span>г. Ростов-на-Дону, Большая Садовая 53</span>
          </div>
          <div class="mt-3">
            <img src="@/assets/mail.svg" alt="" class="me-2">
            <span>itcube@dpbulanov.ru</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer{
  padding: 35px 0;
  background: #350364;
}
.footer__desc{
  display: flex;
  align-items: center;
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}
.footer__contacts{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer__contacts span{
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}
.footer__contacts span:first-child{
  font-family: 'Exo', sans-serif;
  font-weight: 700;
}

@media (max-width: 767px) {
  .footer__logo img{
    width: 64px;
    height: 67px;
  }

  .footer__desc{
    font-family: 'Exo', sans-serif;
    font-size: 12px;
    line-height: 12px;
  }

  .footer__contacts span{
    font-family: 'Exo', sans-serif;
    font-size: 12px;
    line-height: 12px;
  }
}

@media (max-width: 576px) {

  .container{
    padding: 0 20px;
  }
}
</style>