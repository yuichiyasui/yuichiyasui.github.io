const skills = [
  'JavaScript/TypeScript(Vue.js/React)',
  'HTML/CSS',
  'GraqhQL',
  'Java(SpringBoot)',
  'Ruby(Rails)',
];

const hobbies = [
  '音楽鑑賞、ライブ',
  'ラーメン',
  'お酒',
  'ランニング（2021年9月からスタート）',
  '銭湯、サウナ',
  'キャンプ',
  'DIY',
];

export const Top = () => {
  return (
    <div>
      <header className="sticky top-0 w-full bg-gradient-to-br from-blue-900/90 via-sky-900/90 to-teal-800/90 py-3 px-5 shadow-sm backdrop-blur-sm">
        <p className="font-bold tracking-wider text-white">yuichiyasui</p>
      </header>
      <main className="mx-5 py-12 lg:mx-auto lg:w-[1024px]">
        <div className="sm:mx-auto sm:w-[600px]">
          <h1 className="mb-8 text-center text-4xl font-bold">Profile</h1>
          <div className="mx-auto mb-8 w-[50vw] max-w-[320px] overflow-hidden rounded-full shadow-md">
            <img
              width="320"
              height="320"
              src="/profile.jpg"
              alt=""
              className="h-auto w-full"
            />
          </div>
          <p className="mb-6 text-center text-lg">Yuichi Yasui</p>
          <p className="mb-10 text-sm">
            Webエンジニアです。(2019.10~)
            <br />
            エンジニアとして活動する以前は、とある専門領域のコンサルタントをやっていました。
          </p>

          <section className="mx-auto mb-10">
            <h2 className="mb-3 text-xl font-bold">Skills</h2>
            <ul className="mb-4">
              {skills.map((skill, index) => {
                return (
                  <li key={index} className="list-inside list-disc text-sm">
                    {skill}
                  </li>
                );
              })}
            </ul>
            <p className="text-sm">
              実務ではフロントの開発をメインに携わっています。
              <br />
              バックエンドは「個人開発（学習）」＋「実務で少し」という感じです。
              <br />
              フロント周りのセットアップやパフォーマンス改善に活かすべくAWSについて学習しています。
              <br />
              技術的側面以外でもプロジェクトのプロセス改善へのアプローチなどを考えるのが好きです。
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold">Hobbies</h2>
            <ul>
              {hobbies.map((hobby, index) => {
                return (
                  <li key={index} className="list-inside list-disc text-sm">
                    {hobby}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">SNS</h2>
            <ul>
              <li className="list-inside list-disc text-sm">Twitter</li>
              <li className="list-inside list-disc text-sm">GitHub</li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="bg-gradient-to-br from-blue-900/90 via-sky-900/90 to-teal-800/90 py-4">
        <div className="text-center text-sm tracking-wider text-white">
          © yuichiyasui 2022
        </div>
      </footer>
    </div>
  );
};
