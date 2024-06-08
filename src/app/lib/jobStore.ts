const InMemoryKeyValueStore = {} as any;

const set = <T>(key: string | number, value: T): void => {
  InMemoryKeyValueStore[key.toString()] = value;
};

const getById = <T>(key: string): T | undefined => {
  return InMemoryKeyValueStore[key];
};

const getAll = <T>(): Array<T> => {
  return Object.values(InMemoryKeyValueStore);
};

const remove = (key: string): void => {
  delete InMemoryKeyValueStore[key];
};

const generateId = (() => {
  let counter = 0;

  return () => {
    counter += 1;
    return counter;
  };
})();

export const JobStore = {
  generateId,
  getById,
  getAll,
  set,
  remove,
};
