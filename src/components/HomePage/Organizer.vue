<script>
export default {
  name: "Organizer"
}
</script>

<template>
  <div class="organizer" id="part2">
    <div class="container">
      <div class="organizer__title mt-0 mt-md-5">ОРГАНИЗАТОР</div>
      <div class="row organizer__item mt-5">
        <div class="organizer__logo offset-lg-1 col-lg-3 col-12">
          <img src="@/assets/it_cube_logo_2.svg" alt="">
        </div>
        <div class="organizer__desc offset-lg-1 col-lg-7 col-12 mt-4 mt-lg-0">
          В центрах цифрового развития <span>«IT-куб»</span> ребята 7–18 лет знакомятся с программированием, разработкой приложений для мобильных устройств, виртуальной и дополненной реальности, учатся программировать роботов.
          <br><br>
          Все центры цифрового образования оснащены современным оборудованием, а каждый наставник владеет актуальными и нешаблонными методиками обучения.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.organizer{
  padding: 40px 0;
}
.organizer__title{
  color: #350364;
  text-align: center;
  font-family: 'Exo', sans-serif;
  font-size: 56px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 85.714% */
  text-transform: uppercase;
}
.organizer__desc{
  color: #350364;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}
.organizer__desc span{
  font-family: 'Exo', sans-serif;
  font-weight: 700;
}
.organizer__logo{
  display: flex;
  justify-content: center;
}

@media (max-width: 767px) {

  .organizer__title{
    font-family: 'Exo', sans-serif;
    font-size: 30px;
    line-height: 32px;
  }
  .organizer__desc{
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    line-height: 20px;
  }
  .organizer__logo img{
    width: 160px;
    height: 148px;
  }
}

@media (max-width: 576px) {

  .container{
    padding: 0 20px;
  }
}
</style>