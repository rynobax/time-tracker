<template>
  <div class="bg-grey-lighter min-h-screen pt-4">
    <div class="list-container">
      <time-list />
      <add-item />
      <div class="flex">
        <button @click="edit" type="button" class="btn btn-primary mt-4">
          <icon-base name="edit"> <icon-edit-white /> </icon-base>Edit
        </button>
        <button @click="clear" type="button" class="btn btn-primary mt-4 ml-8">
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';

import TimeList from './components/TimeList.vue';
import AddItem from './components/AddItem.vue';
import IconBase from './components/IconBase.vue';
import IconEditWhite from './components/icons/IconEditWhite.vue';

export default Vue.extend({
  name: 'app',
  store,
  components: {
    TimeList,
    AddItem,
    IconBase,
    IconEditWhite,
  },
  methods: {
    edit() {
      this.$store.commit('toggleEditing');
    },
    clear() {
      this.$store.commit('clear');
    },
  },
});
</script>

<style lang="postcss">
.btn {
  @apply font-bold py-2 px-4 pl-3 rounded flex;
}
.btn-primary {
  @apply bg-teal text-white;
}
.btn-primary:hover {
  @apply bg-teal-dark;
}
.list-container {
  @apply mx-auto max-w-md bg-white shadow-md rounded px-8 py-8;
}
.primary {
  fill: config('colors.teal-darker');
}
.secondary {
  fill: config('colors.teal-light');
}
.svg-white {
  fill: white;
}
</style>
