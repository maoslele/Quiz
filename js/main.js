'use strict';
{

  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  //正解はquizSet[0]
  const quizSet = shuffle([
    { q: '2020年6月時点の東京都の人口は?', c: ['1,400万人', '1,500万人', '1,300万人']},
    { q: '2020年7月19日時点で2コロナ感染者数が一番多い国は？', c: ['米国', 'ブラジル', 'インド']},
    { q: '東京五輪の開催予定初日はいつ？', c: ['2021/07/23', '2021/06/23', '2021/08/12']},
  ]);
  let currentNum = 0;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
      return arr;
    }
  }

  let status = 0; //回答済みか判定する変数

  function checkAns(li) {
    if (status) {
      return;
    }
    status = 1;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    status = 0;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) { //最初の子要素があったら削除する（実施済みクイズ）
      choices.removeChild(choices.firstChild);
    }

    //値が直接渡されないようにスプレッド演算子を使う。そうすれば配列の中身は固定したままシャッフル
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAns(li);
      });
      choices.appendChild(li);
    });
  }

  setQuiz();
  btn.addEventListener('click', () => { //Nextを押したら次の問題を出力する
    if (btn.classList.contains('disabled')) {
      return;
    }

    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      //console.log(`Score: ${score} / ${quizSet.length+1}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });

}