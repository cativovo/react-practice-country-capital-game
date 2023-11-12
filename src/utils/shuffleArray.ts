// https://bost.ocks.org/mike/shuffle/
export const shuffleArray = <T>(arr: T[]): T[] => {
  const result: T[] = [...arr];

  result.forEach((v, i) => {
    const randomIndex = Math.floor(Math.random() * i);

    // swap randomIndex's value and current index's value
    result[i] = result[randomIndex];
    result[randomIndex] = v;
  });

  return result;
};
