<template>
  <form class="w-full" @submit.prevent="submit">
    <div class="flex items-center border-b border-b-2 border-teal py-2">
      <input
        v-model="item"
        class="input-underline focus:outline-none"
        type="text"
        placeholder="Working on stuff"
      />
      <button type="submit" class="btn btn-primary">
        <icon-base name="add"> <icon-add-white /> </icon-base>Add
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import IconBase from './IconBase.vue';
import IconAddWhite from './icons/IconAddWhite.vue';

export default Vue.extend({
  name: 'add-item',
  data: () => ({
    item: '',
  }),
  methods: {
    submit() {
      if (this.item === '') return;
      this.$store.commit('add', this.item);
      this.item = '';
    },
  },
  components: {
    IconBase,
    IconAddWhite,
  },
});
</script>

<style lang="postcss">
.input-underline {
  @apply appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight;
}
</style>
