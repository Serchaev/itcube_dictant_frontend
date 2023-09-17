<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/HomePage/Header.vue'
import About from '@/components/HomePage/About.vue'
import Event from '@/components/HomePage/Event.vue'
import Organizer from '@/components/HomePage/Organizer.vue'
import Footer from '@/components/HomePage/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    About,
    Event,
    Organizer,
    Footer
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
  <div class="home">
    <Header :is_auth="is_auth"/>
    <About/>
    <Event/>
    <Organizer/>
    <Footer/>
  </div>
</template>

<style scoped>
</style>


