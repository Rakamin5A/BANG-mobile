export const randomizeNumber = () => {
  const noise = Math.floor(Math.random() * 0.5);
  const num = Math.floor(Math.random() * 3 + noise);

  return num;
};
