<template>
  <div class="item-row">
    <button v-if="editing" class="btn btn-primary" @click="onDelete">
      <icon-base>
        <icon-archive-white />
      </icon-base>
    </button>
    <div v-if="!editing" class="item-title">{{ title }}</div>
    <input v-if="editing" class="item-title" v-model="title" />
    <div class="flex-initial flex text-right">
      <div v-if="!editing" class="item-time">{{ start }}</div>
      <input v-if="editing" class="item-time" v-model="start" />
      <div v-if="!editing" class="item-time">{{ end }}</div>
      <input v-if="editing" class="item-time" v-model="end" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Item } from '../store';
import IconBase from './IconBase.vue';
import IconArchiveWhite from './icons/IconArchiveWhite.vue';

export default Vue.extend({
  name: 'time-item',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    editing: function() {
      return this.$store.state.editing;
    },
    title: {
      get() {
        const title: string = this.$store.getters.item(this.id).title;
        return title;
      },
      set(title: string) {
        const item = this.$store.getters.item(this.id);
        const newItem = { ...item, title };
        this.$store.commit('edit', newItem);
      },
    },
    start: {
      get() {
        const start: string = this.$store.getters.item(this.id).start;
        return start;
      },
      set(start: string) {
        const item = this.$store.getters.item(this.id);
        const newItem = { ...item, start };
        this.$store.commit('edit', newItem);
      },
    },
    end: {
      get() {
        const end: string = this.$store.getters.item(this.id).end;
        return end;
      },
      set(end: string) {
        const item = this.$store.getters.item(this.id);
        const newItem = { ...item, end };
        this.$store.commit('edit', newItem);
      },
    },
  },
  methods: {
    onDelete() {
      this.$store.commit('delete', this.id);
    },
  },
  components: {
    IconBase,
    IconArchiveWhite,
  },
});
</script>

<style lang="postcss" scoped>
.item-row {
  @apply flex p-4 border-l-4 border-teal bg-teal-lightest text-teal-darkest mb-4 rounded;
}
.item-time {
  @apply w-24 flex-initial text-right p-2 rounded-sm mx-1;
}
.item-title {
  @apply flex-auto font-bold my-auto text-lg;
}
</style>
