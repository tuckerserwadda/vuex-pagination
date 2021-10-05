<template>
<div class="events-list">
  <EventDisplay  :events="events"/>
</div>
  
</template>

<script>
import EventDisplay from '../components/EventDisplay.vue';
//import EventDisplay from "@/components/EventDisplay.vue";
export default {
  components: { EventDisplay },
  name: "EventsList",

created(){
  this.$store.dispatch("fetchEvents")
},
computed:{
  events(){
    return this.$store.state.events
  },
},

};
</script>
