export const Top = () => {
  return (
    <div>
      <header className="sticky top-0 w-full bg-gradient-to-br from-blue-900/90 via-sky-900/90 to-teal-800/90 py-3 px-5 shadow-sm backdrop-blur-sm">
        <p className="font-bold tracking-wider text-white">yuichiyasui</p>
      </header>
      <main className="mx-5 py-5 lg:mx-auto lg:w-[1024px]">
        <h1 className="mb-4 font-bold">Profile</h1>
        <div className="mx-auto mb-8 w-[50vw] max-w-[320px] overflow-hidden rounded-full shadow-md">
          <img
            width="320"
            height="320"
            src="/profile.jpg"
            alt=""
            className="h-auto w-full"
          />
        </div>
        <p>Yuichi Yasui</p>
        <p>
          派遣Webエンジニアです。(2019.10~)
          <br />
          エンジニアとして活動する以前は、とある専門領域のコンサルタントをやっていました。
        </p>

        <section>
          <h2 className="font-bold">スキルセット</h2>
          <ul>
            <li>JavaScript/TypeScript(Vue.js/React)</li>
            <li>HTML/CSS</li>
            <li>GraqhQL</li>
            <li>Java(SpringBoot)</li>
            <li>Ruby(Rails)</li>
          </ul>
          <p>
            実務ではフロントの開発をメインに携わっています。
            <br />
            バックエンドは「個人開発（学習）」＋「実務で少し」という感じです。
            <br />
            フロント周りのセットアップやパフォーマンス改善に活かすべくAWSについて学習しています。
            <br />
            技術的側面以外でもプロジェクトのプロセス改善へのアプローチなどを考えるのが好きです。
          </p>
        </section>

        <section>
          <h2 className="font-bold">趣味</h2>
          <ul>
            <li>音楽鑑賞、ライブを見に行く</li>
            <li>ラーメン</li>
            <li>お酒</li>
            <li>ランニング（2021年9月からスタート）</li>
            <li>銭湯、サウナ</li>
            <li>キャンプ</li>
            <li>DIY</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold">SNS</h2>
          <ul>
            <li>Twitter</li>
            <li>GitHub</li>
          </ul>
        </section>
      </main>
      <footer className="bg-gradient-to-br from-blue-900/90 via-sky-900/90 to-teal-800/90 py-4">
        <div className="text-center text-sm tracking-wider text-white">
          © yuichiyasui 2022
        </div>
      </footer>
    </div>
  );
};
