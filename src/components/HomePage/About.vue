<script>
export default {
  name: "About"
}

</script>

<template>
  <div class="about" id="part1">
    <div class="container">
      <div class="about__title mt-md-5 mt-3">
        <h2>О МЕРОПРИЯТИИ</h2>
      </div>
      <div class="about__subtitle offset-lg-1 col-lg-10 col-12 mt-5">
        <h2><span>IT-ДОЗОР</span> - это уникальное событие, нацеленное на вдохновение к обучению детей программированию и компьютерным навыкам.</h2>
      </div>
      <div class="row about__content mt-md-5">
        <span class="offset-lg-1 col-lg-5 col-12">
          ИТ-дозор — это праздник цифровых возможностей! Мы предлагаем вам погрузиться в мир тестовых заданий разного уровня сложности, от основ работы с компьютерной техникой и навыков использования Интернет-ресурсов до познания в таких передовых темах, как блокчейн и интернет вещей.
        </span>
        <span class="col-lg-5 col-12">
          Мероприятие приурочено ко <span>Дню интернета</span> в России - этот день, как и интернет сам по себе, переплетает миры и идеи, делая их доступными каждому. Интернет объединяет нас, помогает расширить горизонты и открывает двери в бескрайний мир информации.
        </span>
      </div>
      <div class="row about__items mt-3 mt-md-0">
        <div class="about__item col-lg-4 col-12">
          <div class="about__item_number">
            <img src="@/assets/30.svg" alt="">
          </div>
          <div class="about__item_desc">
            <span>Сентября</span> - старт тестирования
          </div>

        </div>
        <div class="about__item col-lg-4 col-12">
          <div class="about__item_number">
            <img src="@/assets/30.svg" alt="">
          </div>
          <div class="about__item_desc">
            <span>Вопросов</span> об It-мире
          </div>

        </div>
        <div class="about__item col-lg-4 col-12">
          <div class="about__item_number">
            <img src="@/assets/30.svg" alt="">
          </div>
          <div class="about__item_desc">
            <span>Минут</span> на прохождение квеста
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .about{
    padding: 50px 0;
  }
  .about__title h2{
    color: #350364;
    text-align: center;
    font-family: 'Exo', sans-serif;
    font-size: 56px;
    font-style: normal;
    font-weight: 700;
    line-height: 48px; /* 85.714% */
    //text-transform: uppercase;
  }

  .about__subtitle h2{
    color: #350364;
    //font-family: Exo;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    font-family: 'Exo', sans-serif;
  }

  .about__subtitle h2 span{
    font-weight: 700;
    font-family: 'Exo', sans-serif;
  }

  .about__content{
    color: #350364;
    font-family: 'Exo', sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
  }

  .about__content span span{
    font-weight: 700;
  }

  .about__item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .about__item_desc{
    color: #350364;
    font-family: 'Exo', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    text-align: center;
  }

  .about__item_desc span{
    font-family: 'Exo', sans-serif;
    font-weight: 900;
  }

  @media (max-width: 767px) {
    .about__title h2{
      font-size: 28px;
      line-height: 32px;
      font-family: 'Exo', sans-serif;
    }



    .about__subtitle h2{
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
      font-family: 'Exo', sans-serif;
    }

    .about__subtitle h2 span{
      font-size: 20px;
      font-style: normal;
      line-height: 22px;
      font-weight: 700;
      font-family: 'Exo', sans-serif;
    }



    .about__content{
      font-family: 'Exo', sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }

    .about__content span{
      margin-top: 10px;
    }

    .about__content span span{
      font-weight: 700;
      font-family: 'Exo', sans-serif;
    }





    .about__item_number img{
      width: 220px;
      height: 150px;
    }
  }

  @media (max-width: 576px) {

    .container{
      padding: 0 20px;
    }
  }
</style>