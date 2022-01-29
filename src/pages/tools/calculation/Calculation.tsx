import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DefaultLayout } from "~/components/layouts/DefaultLayout";

const sectionMap = {
  member: "member",
  price: "price",
};

export const Calculation = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [member, setMember] = useState<string>("");
  const memberError = members.includes(member)
    ? "すでに追加済みのメンバーです"
    : "";
  const handleMember = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMember(value);
  };
  const submitMember = (event: FormEvent) => {
    event.preventDefault();
    if (memberError) return;
    setMembers([...members, member]);
    setMember("");
  };
  const removeMember = (member: string) => {
    const removedMembers = members.filter((m) => m !== member);
    setMembers(removedMembers);
  };

  const [prices, setPrices] = useState<number[]>([]);
  const handlePrice = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    if (Number.isNaN(Number(value))) return;
    const currentPrices = [...prices];
    currentPrices[index] = Number(value);
    setPrices(currentPrices);
  };

  useEffect(() => {
    if (members.length !== prices.length) {
      setPrices(Array(members.length).fill(0));
    }
  }, [members.length, prices.length]);

  const totalPrice = prices.reduce((acc, price) => {
    return acc + price;
  }, 0);
  const averagePrice = Math.round(totalPrice / members.length);

  return (
    <DefaultLayout>
      <h1 className="mb-8 text-center text-4xl font-bold">割り勘計算ツール</h1>
      <p className="mb-10">
        飲み会やBBQ、キャンプなどイベントの時にみんなでお金をそれぞれ出し合った際に計算するの面倒ですよね。
        <br />
        そんな面倒な計算をスッと終わらせてくれるツールがこちらです。
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">使い方</h2>
        <ol className="mb-3 list-inside list-decimal">
          <li>割り勘するメンバーを追加</li>
          <li>それぞれの使用金額を入力</li>
          <li>計算結果が表示される</li>
        </ol>
        <p>計算結果はLINEでシェアできます。</p>
      </section>

      <section id={sectionMap.member} className="mb-10">
        <h2 className="mb-3 text-xl font-bold">メンバー名を入力</h2>
        <form onSubmit={submitMember} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              name="memberName"
              placeholder="メンバー名"
              value={member}
              onChange={handleMember}
              className="focus:shadow-outline mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            />
            <small className="block">（例）やっしー</small>
            {memberError && (
              <small className="text-red-500">{memberError}</small>
            )}
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-sm font-bold text-white hover:bg-blue-700"
          >
            追加
          </button>
        </form>
        <h3 className="mb-3 text-lg font-bold">メンバーリスト</h3>
        {members.length ? (
          <ol className="list-inside list-decimal">
            {members.map((member) => {
              return (
                <li key={member}>
                  <div className="inline-flex items-center">
                    <p className="mr-3 text-sm">{member}</p>
                    <button
                      type="button"
                      className="h-5 w-5 rounded-full bg-red-500 text-sm font-bold leading-[0] text-white hover:bg-red-700"
                      onClick={() => removeMember(member)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-sm text-gray-500">メンバーが追加されていません</p>
        )}
      </section>

      <section id={sectionMap.price} className="mb-10">
        <h2 className="mb-3 text-xl font-bold">使用金額を入力</h2>
        <p className="mb-3 text-sm">半角数字のみ入力可能です。</p>

        {members.map((member, index) => {
          return (
            <div key={member}>
              <p>{member}</p>
              <input
                type="text"
                name="price"
                inputMode="decimal"
                onChange={(event) => handlePrice(event, index)}
                className="focus:shadow-outline mb-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
          );
        })}
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold">計算結果</h2>
        <p>
          合計金額：
          {totalPrice.toLocaleString("ja-JP", {
            style: "currency",
            currency: "JPY",
          })}
        </p>
        <p>
          一人当たり支出額：
          {averagePrice.toLocaleString("ja-JP", {
            style: "currency",
            currency: "JPY",
          })}
        </p>
        <ol>
          {members.map((member, index) => {
            return (
              <li key={member}>
                <p>{member}</p>
                <p>
                  {(prices[index] - averagePrice).toLocaleString("ja-JP", {
                    style: "currency",
                    currency: "JPY",
                  })}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </DefaultLayout>
  );
};
