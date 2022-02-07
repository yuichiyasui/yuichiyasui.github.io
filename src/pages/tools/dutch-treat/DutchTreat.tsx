import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { enableMapSet } from "immer";
import { useImmerReducer } from "use-immer";
import { DefaultLayout } from "~/components/layouts/DefaultLayout";
import { dutchTreat, getOutcomePerPerson, getTotalPrice } from "./functions";

enableMapSet();

const sectionMap = {
  member: "member",
  price: "price",
};

export type MemberName = string;
export type Price = number;

type SetMembers = {
  type: "SET_MEMBERS";
  payload: [MemberName, Price][];
};
type AddMember = {
  type: "ADD_MEMBER";
  payload: { name: MemberName };
};
type RemoveMember = {
  type: "REMOVE_MEMBER";
  payload: { name: MemberName };
};
type UpdateMemberPrice = {
  type: "UPDATE_MEMBER_PRICE";
  payload: { name: MemberName; price: Price };
};
type UpdateError = {
  type: "UPDATE_ERROR";
  payload: { errorMessage: string };
};

type Action =
  | SetMembers
  | AddMember
  | RemoveMember
  | UpdateMemberPrice
  | UpdateError;
type State = {
  members: Map<MemberName, Price>;
  error: string;
};
const reducer = (draft: State, action: Action) => {
  switch (action.type) {
    case "SET_MEMBERS":
      draft.members = new Map(action.payload);
      break;
    case "ADD_MEMBER":
      draft.members.set(action.payload.name, 0);
      break;
    case "REMOVE_MEMBER":
      draft.members.delete(action.payload.name);
      break;
    case "UPDATE_ERROR":
      draft.error = action.payload.errorMessage;
      break;
    case "UPDATE_MEMBER_PRICE":
      draft.members.set(action.payload.name, action.payload.price);
      break;
  }
};

const initialState: State = {
  members: new Map<MemberName, Price>(),
  error: "",
};

export const DutchTreat = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const [member, setMember] = useState<string>("");
  const handleMember = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let errorMessage;
    if (!value) {
      errorMessage = "メンバー名を入力してください";
    } else if (state.members.has(value)) {
      errorMessage = "すでに追加済みのメンバーです";
    } else {
      errorMessage = "";
    }
    dispatch({
      type: "UPDATE_ERROR",
      payload: { errorMessage },
    });
    setMember(value);
  };
  const submitMember = (event: FormEvent) => {
    event.preventDefault();
    if (state.error) return;
    dispatch({ type: "ADD_MEMBER", payload: { name: member } });
    setMember("");
  };

  const handlePrice = (
    event: ChangeEvent<HTMLInputElement>,
    name: MemberName,
  ) => {
    const { value } = event.target;
    const price = Number(value);
    if (Number.isNaN(price) || price > 999999) return;
    dispatch({ type: "UPDATE_MEMBER_PRICE", payload: { name, price } });
  };

  // TODO: ローカルストレージに実行時の結果を保存する処理
  // useEffect(() => {
  //   const cache = localStorage.getItem("DUTCH_TREAT");
  //   console.log("mount");
  //   if (cache) {
  //     const members = JSON.parse(cache);
  //     dispatch({ type: "SET_MEMBERS", payload: members });
  //     localStorage.removeItem("DUTCH_TREAT");
  //   }
  //   return () => {
  //     localStorage.setItem(
  //       "DUTCH_TREAT",
  //       JSON.stringify(Array.from(state.members)),
  //     );
  //     console.log("unmount");
  //   };
  // }, [dispatch]);

  const members = Array.from(state.members).map((member) => ({
    name: member[0],
    price: member[1],
  }));
  const prices = members.map((member) => member.price);
  const totalPrice = getTotalPrice(prices);
  const [average, surplus] = getOutcomePerPerson(prices);

  const [logs, setLogs] = useState<string[]>([]);
  const executeDutchTreat = () => {
    const result = dutchTreat(state.members);
    setLogs(result);
  };

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
            {state.error && (
              <small className="text-red-500">{state.error}</small>
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
        {state.members.size ? (
          <ol className="list-inside list-decimal">
            {members.map((member) => {
              return (
                <li key={member.name}>
                  <div className="inline-flex items-center">
                    <p className="mr-3 text-sm">{member.name}</p>
                    <button
                      type="button"
                      className="inline-grid h-5 w-5 place-items-center rounded-full bg-red-500 hover:bg-red-700"
                      title={`${member.name}をメンバーから削除する`}
                      aria-label="削除"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_MEMBER",
                          payload: { name: member.name },
                        })
                      }
                    >
                      <span className="text-[10px] font-bold text-white">
                        ×
                      </span>
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
        <ul className="mb-5">
          {members.map((member) => {
            return (
              <li key={member.name} className="mb-2">
                <p>{member.name}</p>
                <div className="relative">
                  <span className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400">
                    ¥
                  </span>
                  <input
                    type="text"
                    name="price"
                    inputMode="decimal"
                    value={state.members.get(member.name)}
                    onChange={(event) => handlePrice(event, member.name)}
                    className="focus:shadow-outline w-[100px] appearance-none rounded border py-2 pr-3 pl-5 text-right leading-tight text-gray-700 shadow focus:outline-none"
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={executeDutchTreat}
          className="rounded bg-teal-500 py-2 px-4 text-sm font-bold text-white hover:bg-teal-700"
        >
          割り勘する
        </button>
      </section>

      {!!logs.length && (
        <>
          <section className="mb-10">
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
              {average.toLocaleString("ja-JP", {
                style: "currency",
                currency: "JPY",
              })}
            </p>
            <p>
              余り：
              {surplus.toLocaleString("ja-JP", {
                style: "currency",
                currency: "JPY",
              })}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">割り勘フロー</h2>
            <textarea
              rows={logs.length}
              defaultValue={logs.reduce((acc, log, index, array) => {
                const result = `${acc}(${index + 1}) ${log}`;
                if (index === array.length - 1) return result;
                return result + "\n";
              }, "")}
              className="focus:shadow-outline w-full appearance-none whitespace-pre-line rounded border py-2 px-3 text-gray-700 shadow focus:outline-none"
            />
          </section>
        </>
      )}
    </DefaultLayout>
  );
};
