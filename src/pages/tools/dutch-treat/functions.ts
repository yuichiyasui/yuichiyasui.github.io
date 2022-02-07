import { MemberName, Price } from "./DutchTreat";

export const getTotalPrice = (prices: number[]): number => {
  return prices.reduce((acc, price) => acc + price, 0);
};

export const getOutcomePerPerson = (
  prices: number[],
): [average: number, surplus: number] => {
  const totalPrice = getTotalPrice(prices);
  const surplus = totalPrice % prices.length;
  return [(totalPrice - surplus) / prices.length || 0, surplus || 0];
};

export const getMinMaxOutcomePersons = (
  state: Map<MemberName, Price>,
): [
  mix: [name: MemberName, price: Price],
  max: [name: MemberName, price: Price],
] => {
  const persons = Array.from(state);
  const prices = persons.map((person) => person[1]);
  const maxPerson = persons.filter(
    (person) => person[1] === Math.max(...prices),
  )[0];
  const minPerson = persons.filter(
    (person) => person[1] === Math.min(...prices),
  )[0];
  return [minPerson, maxPerson];
};

export const dutchTreat = (state: Map<MemberName, Price>) => {
  const log: string[] = [];
  const copy = new Map(state);
  // 平均金額を出す
  const [average, surplus] = getOutcomePerPerson(Array.from(copy.values()));
  // それぞれの差分を出す(差分がなければその人は計算から除外する)
  copy.forEach((value, key) => {
    const diff = value - average;
    if (diff === 0) {
      copy.delete(key);
    }
    copy.set(key, diff);
  });
  while (copy.size !== 0) {
    // 差分の大きい人同士でやり取りする
    const [minPerson, maxPerson] = getMinMaxOutcomePersons(copy);
    if (copy.size === 1) {
      log.push(`${maxPerson[0]}さんの手元に${maxPerson[1]}円余りました。`);
      copy.delete(maxPerson[0]);
    } else if (Math.abs(minPerson[1]) === Math.abs(maxPerson[1])) {
      // 差額が-500, 500とかだった場合はそれぞれ精算
      copy.delete(minPerson[0]);
      copy.delete(maxPerson[0]);
      log.push(
        `${minPerson[0]}さんから${maxPerson[0]}さんに${maxPerson[1]}円渡す。`,
      );
    } else if (Math.abs(minPerson[1]) < Math.abs(maxPerson[1])) {
      copy.set(maxPerson[0], maxPerson[1] + minPerson[1]);
      copy.delete(minPerson[0]);
      log.push(
        `${minPerson[0]}さんから${maxPerson[0]}さんに${Math.abs(
          minPerson[1],
        )}円渡す。`,
      );
    } else {
      copy.set(minPerson[0], maxPerson[1] + minPerson[1]);
      copy.delete(maxPerson[0]);
      log.push(
        `${minPerson[0]}さんから${maxPerson[0]}さんに${Math.abs(
          maxPerson[1],
        )}円渡す。`,
      );
    }
  }
  log.push("精算完了");

  return log;
};
