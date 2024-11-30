const englishSynopsis = "<h3>what is eXistenz?</h3>" +
  "<p>eXistenz is a 1999 science fiction horror film written, produced and directed by David Cronenberg. The film follows video game designer Allegra Geller who has created a virtual reality game called eXistenZ.</p>" +
  "<p>After a crazed fan attempts to kill her, Allegra goes on the run with Ted, a young businessman who falls into the role of bodyguard.</p>" +
  "<p>In an attempt to save her game, Allegra implants into Ted's body the video game pod that carries a damaged copy of eXistenZ. Allegra and Ted engage in a series of experiences that blur the lines between fantasy and reality.</p>";

// people tend to use template strings in these cases https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
const jpSynopsis = `<h3>イグジステンズとは</h3>
  <p>『イグジステンズ』（eXistenZ）は、デヴィッド・クローネンバーグ監督・脚本による1999年のカナダ・イギリス映画。</p>
  <p>近未来。誰もが脊髄にバイオポートなる穴を開け、そこにゲームポッド（＝コントローラー）を接続して仮想現実ゲームを楽しんでいた。新作ゲーム「イグジステンズ」の発表会場で、カリスマ的な天才ゲームデザイナー、アレグラ（ジェニファー・ジェイソン・リー）が突然銃撃され、警備員のテッド（ジュード・ロウ）は彼女を連れて逃亡。事件の背後には会社もからんだ陰謀があるらしい。</p>`;

const enUpdates = `
  <h2>UPDATES & PRE-GAME</h2>
  <p>
    Plan is to gather at nearby <a href="https://maps.app.goo.gl/ZCH8rhMbg5hN4puCA">Tobe Park</a> for pre-game chilling from <strong>18:00</strong> (the park is a couple minute walk from the theater)
  </p>
  <p>Feel free to bring your own snacks to the movie (they don't serve food I don't think)</p>
  <p>Everyone gets one drink served by the venue (included with admission price). You are welcome to bring your own drinks in addition, but you'll need to take your garbage with you.</p>
  <p>
    Space is becoming limited. If you haven't confirmed attendance, reach out to someone about availability.
  </p>
`;
const jpUpdates = `
  <h2>ご注意点、映画の前集合予定について</h2>
  <p>
    上映の前は<strong>18:00</strong>から適当で集合して軽く飲む予定です。場所はイベントスペース近く<a href="https://maps.app.goo.gl/ZCH8rhMbg5hN4puCA">戸部公園</a>と目指しています。
  </p>
  <p>
    イベントスペースは食事提供していないと思うので、食べたい物あれば持ち込んでください。
  </p>
  <p>
  イベントスペースからドリンク（ビール、ハイボール、サワー的な）一人ずつ一杯出します（ドリンク代はエントランスに含んでる）。お酒や飲み物は持ち込んでも大丈夫ですが、ゴミは自分責任になっちゃいます。
  </p>
  <p>
    参加人数がちょっと多くなってきたから、友達と連れて行きたいなら先にオーガナイザーにご連絡をお願いします！
  </p>
`;

let currentLang = window.navigator.language || "en";

const infoSection = document.querySelector("#info");
const updatesSection = document.querySelector("#updates");
const button = document.querySelector(".lang-btn");

function changeLanguage() {
  console.log("changing language");
  /**
   * as a dump, contrived example, imagine we had to pull in this data from an api
   * i've made info-data.json which you can pull in with a fetch request
   *
   * fetch('/info-data.json')
   *
   * try using that to render out the same raw html
   */

  if (currentLang.includes("ja")) {
    infoSection.innerHTML = jpSynopsis;
    updatesSection.innerHTML = jpUpdates;
    button.innerHTML = "English";
    currentLang = "en";
    return;
  }

  infoSection.innerHTML = englishSynopsis;
  updatesSection.innerHTML = enUpdates;
  button.innerHTML = "日本語";
  currentLang = "ja";
}

button.addEventListener("click", changeLanguage);
changeLanguage();
