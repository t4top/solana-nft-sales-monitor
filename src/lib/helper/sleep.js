export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const randomSleep = (minMS, maxMS) => {
  const random = Math.floor(Math.random() * (maxMS - minMS + 1) + minMS);
  return sleep(random);
};
