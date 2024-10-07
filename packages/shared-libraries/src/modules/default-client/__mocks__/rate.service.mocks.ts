import { faker } from '@faker-js/faker';
import { IRate, RateSourceEnum } from '../../../interfaces';

const cache = {
  settings: {},
  rates: {},
};
let pairsDb = [];

export const rateServiceMocks = {
  rate: {
    get(pair) {
      return faker.number.float({ min: 0.001, max: 5 });
    },
    getDetailed(pair): IRate {
      return {
        pair,
        price: faker.number.float({ min: 0.001, max: 5 }),
        source: RateSourceEnum.KRAKEN,
        timestamp: +new Date(),
        weight: 1,
      };
    },
    getMulti(data) {
      const res = {} as any;
      // eslint-disable-next-line no-restricted-syntax
      for (const pair of data.pairs) {
        const r = this.getDetailed(pair);
        r.price = +r.price;
        res[pair] = data.withDetails ? r : r.price;
      }
      return res;
    },
    getWithOHLC(data) {
      return {
        rate: 2.13,
        ohlc: {},
      };
    },
  },
  pairs: {
    get(data) {
      if (data.pair) {
        return pairsDb.find((p) => p.pair === data.pair);
      }
      return pairsDb.find((p) => p.id === +data.id);
    },
    create(data) {
      const pair = { id: faker.number.int(), ...data };
      pairsDb.push(pair);
      return pair;
    },
    update({ id, ...rest }) {
      let pair = pairsDb.find((p) => p.id === +id);
      if (!pair) throw Error(`Pair with ${id} not found.`);
      const index = pairsDb.indexOf(pair);
      pair = { ...pair, ...rest };
      pairsDb.splice(index, 1, pair);
      return pair;
    },
    delete({ id }) {
      const pair = pairsDb.find((p) => p.id === +id);
      if (!pair) throw Error(`Pair with ${id} not found.`);
      pairsDb = pairsDb.filter((p) => p.id !== +id);
      return 1;
    },
    getAll() {
      return pairsDb;
    },
  },
  systemSettings: {
    get(key) {
      return cache.settings[key];
    },
    getAll() {
      return Object.keys(cache.settings).map((k) => {
        return {
          [k]: cache.settings[k],
          id: faker.number.int(),
        };
      });
    },
    refreshAll({ data }) {
      data.forEach((s) => {
        cache.settings[s.key] = s.value;
      });
    },
    upsert(data) {
      cache.settings[data.key] = data.value;
      return data;
    },
    clearCache() {
      cache.settings = {};
    },
  },
};
