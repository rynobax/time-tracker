import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

export interface Item {
  id: number;
  title: string;
  start: string;
  end: string;
}

interface State {
  editing: boolean;
  items: Item[];
}

const MIN = 1000 * 60;
const HR = MIN * 60;

Vue.use(Vuex);

export const timeToHHMM = (time: number | null) => {
  if (!time) return '';
  const date = new Date(time);
  let hr = date.getHours();
  const ampm = hr > 12 ? 'pm' : 'am';
  if (ampm === 'pm') hr -= 12;
  const hh = String(hr).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}${ampm}`;
};

export const HHMMToTime = (time: string) => {
  if (time === '') return null;
  const match = time.match(/(\d*):(\d*)(\w*)/);
  if (!match) return null;
  let [_, hStr, mStr, a] = match;
  let h = Number(hStr);
  const m = Number(mStr);
  if (a === 'pm') h += 12;
  const date = new Date();
  date.setHours(h);
  date.setMinutes(m);
  return date.valueOf();
};

const store = new Vuex.Store<State>({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger(), createPersistedState()],
  state: {
    editing: false,
    items: [
      {
        id: 1,
        title: 'Work on Vue',
        start: timeToHHMM(Date.now() - HR * 3),
        end: timeToHHMM(Date.now() - HR * 2),
      },
      {
        id: 2,
        title: 'Learn tailwind.css',
        start: timeToHHMM(Date.now() - HR * 2),
        end: timeToHHMM(Date.now() - HR * 1),
      },
      {
        id: 3,
        title: 'Use Jest',
        start: timeToHHMM(Date.now() - HR * 1),
        end: '',
      },
    ],
  },
  getters: {
    items: state => state.items,
    item: state => (id: number) => state.items.find(item => item.id === id),
  },
  mutations: {
    toggleEditing(state) {
      state.editing = !state.editing;
    },
    add(state, title: string) {
      const items = [...state.items];
      const lastItem = items[items.length - 1];
      if (lastItem) lastItem.end = timeToHHMM(Date.now());
      items.push({
        id: Math.random(),
        title,
        start: timeToHHMM(Date.now()),
        end: '',
      });
      state.items = items;
    },
    edit(state, item: Item) {
      const items = [...state.items];
      const index = items.findIndex(e => e.id === item.id);
      items[index] = item;
      state.items = items;
    },
    delete(state, id: number) {
      const items = [...state.items];
      state.items = items.filter(e => e.id !== id);
    },
    clear(state) {
      state.items = [];
    },
  },
});

export default store;
