<template>
  <div>
    <time-item
      v-for="event in $store.getters.items"
      :key="event.id"
      :id="event.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TimeItem from './TimeItem.vue';

export default Vue.extend({
  components: { TimeItem },
});
</script>

<style lang="postcss"></style>
