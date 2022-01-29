import { ChangeEvent, FormEvent, useState } from "react";
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

  return (
    <DefaultLayout>
      <h1 className="mb-8 text-center text-4xl font-bold">割り勘計算ツール</h1>
      <p>
        飲み会やBBQ、キャンプなどイベントの時にみんなでお金をそれぞれ出し合った際に計算するの面倒ですよね。
        <br />
        そんな面倒な計算をスッと終わらせてくれるツールがこちらです。
      </p>

      <section>
        <h2>使い方</h2>
        <ol>
          <li>割り勘するメンバーを追加</li>
          <li>それぞれの使用金額を入力</li>
          <li>計算結果が表示される</li>
        </ol>
        <p>計算結果はLINEでシェアできます。</p>
      </section>

      <section id={sectionMap.member}>
        <h2>メンバー名を入力</h2>
        <form onSubmit={submitMember}>
          <input
            type="text"
            name="memberName"
            placeholder="メンバー名"
            value={member}
            onChange={handleMember}
          />
          <small className="block">（例）やっしー</small>
          {memberError && <small className="text-red-500">{memberError}</small>}
          <button type="submit">追加</button>
        </form>
        <h3>メンバーリスト</h3>
        <ul>
          {members.map((member) => {
            return (
              <li key={member} className="flex">
                <p>{member}</p>
                <button type="button" onClick={() => removeMember(member)}>
                  削除
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section id={sectionMap.price}>
        <h2>使用金額を入力</h2>
      </section>
    </DefaultLayout>
  );
};
