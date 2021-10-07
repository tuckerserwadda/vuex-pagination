<template>
<div class="events-list">
  <EventDisplay />
</div>
</template>

<script>
import EventDisplay from '../components/EventDisplay.vue';
export default {
  components: { EventDisplay },
  name: "EventsList",
};
</script>
