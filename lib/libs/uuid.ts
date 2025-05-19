export const shortUUID = () => {
  return self.crypto.randomUUID().split('-').slice(-1)[0];
};

export const UUID = () => {
  return self.crypto.randomUUID();
};
