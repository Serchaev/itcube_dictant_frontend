<script>
export default {
  name: "Event"
}
</script>

<template>
  <div class="event">
    <div class="container">
      <div class="row event__content mt-sm-5">
        <div class="offset-lg-1 col-lg-5 col-12 event__title">
          реши задания на <span>100</span> баллов и получи диплом от <span>IT-Куб</span>
        </div>
        <div class="col-lg-5 col-12 event__desc mt-4 mt-sm-5 mt-lg-0">
          Реши задания на 100 баллов, прояви свои выдающиеся навыки в мире цифровых технологий, и получи заслуженный сертификат от IT-Куб, который подтвердит твои высокие компетенции и готовность к испытаниям в сфере информационных технологий.
          <br><br>
          Это уникальная возможность отметить свой успех и приобрести ценный документ, который откроет перед тобой новые горизонты в мире IT.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event{
  background: linear-gradient(256deg, #3CB9FC -39.7%, #350364 38.77%);
  padding: 80px 0;
}
.event__title{
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 56px; /* 116.667% */
  text-transform: uppercase;
}
.event__title span{
  color: #3CB9FC;
  font-family: 'Exo', sans-serif;
  font-weight: 900;
}
.event__desc{
  color: #FFF;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}

@media (max-width: 767px) {
  .event{
    padding: 50px 0;
  }

  .event__title{
    color: #FFF;
    font-family: 'Exo', sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px; /* 116.667% */
    text-transform: uppercase;
  }
  .event__desc{
    font-family: 'Exo', sans-serif;
    font-size: 20px;
    line-height: 20px;
  }
}

@media (max-width: 576px) {

  .container{
    padding: 0 20px;
  }
}
</style>