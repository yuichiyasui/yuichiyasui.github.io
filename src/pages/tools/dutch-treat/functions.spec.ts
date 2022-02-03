import {
  dutchTreat,
  getMinMaxOutcomePersons,
  getOutcomePerPerson,
  getTotalPrice,
} from "./functions";

describe("getTotalPrice", () => {
  test("合計金額を返す", () => {
    const result = getTotalPrice([3000, 6000, 3000]);
    expect(result).toBe(12000);
  });
});

describe("getOutcomePerPerson", () => {
  test("1人あたりの支出と端数を返す", () => {
    const [average, surplus] = getOutcomePerPerson([1111, 2222, 2222]);
    expect(average).toBe(1851);
    expect(surplus).toBe(2);
  });
});

describe("getMaxOutcomePerson", () => {
  test("最も支出が少ない人と多い人を返す", () => {
    const state = new Map([
      ["A", 2000],
      ["B", 0],
      ["C", 8000],
      ["D", 5000],
    ]);
    const result = getMinMaxOutcomePersons(state);
    expect(result).toStrictEqual([
      ["B", 0],
      ["C", 8000],
    ]);
  });
  test("支出額が同額の人がいた場合先頭の人を優先して返す", () => {
    const state = new Map([
      ["A", 2000],
      ["B", 2000],
      ["C", 8000],
      ["D", 8000],
    ]);
    const result = getMinMaxOutcomePersons(state);
    expect(result).toStrictEqual([
      ["A", 2000],
      ["C", 8000],
    ]);
  });
});

describe("dutchTreat", () => {
  test("割り勘する", () => {
    const state = new Map([
      ["A", 2000],
      ["B", 0],
      ["C", 8000],
      ["D", 5000],
    ]);
    const result = dutchTreat(state);
    expect(result[0]).toBe("BさんからCさんに3750円渡す。");
    expect(result[1]).toBe("AさんからDさんに1250円渡す。");
    expect(result[2]).toBe("AさんからCさんに500円渡す。");
    expect(result[3]).toBe("end");
  });

  test("割り勘する(差額の絶対値が同じ人がいる場合)", () => {
    const state = new Map([
      ["A", 0],
      ["B", 0],
      ["C", 5000],
      ["D", 5000],
    ]);
    const result = dutchTreat(state);
    expect(result[0]).toBe("AさんからCさんに2500円渡す。");
    expect(result[1]).toBe("BさんからDさんに2500円渡す。");
    expect(result[2]).toBe("end");
  });
});
