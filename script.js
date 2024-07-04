// 요소 선택
const player1El = document.querySelector(".player01");
const player2El = document.querySelector(".player02");
const totalScore1El = document.getElementById("total-score");
const totalScore2El = document.getElementById("total-score2");
const currentScore1El = document.getElementById("current-score");
const currentScore2El = document.getElementById("current-score2");
const btnNewGame = document.getElementById("newGame-btn");
const btnRollDice = document.getElementById("rollDice-btn");
const btnHold = document.getElementById("hold-btn");
const diceImg = document.querySelector(".dice");

// JavaScript 변수 및 초기 설정
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0: Player 1, 1: Player 2
  playing = true;

  totalScore1El.value = 0;
  totalScore2El.value = 0;
  currentScore1El.value = 0;
  currentScore2El.value = 0;

  // 모든 플레이어 섹션에서 winner 클래스 제거 및 배경색 초기화
  player1El.classList.remove("winner");
  player2El.classList.remove("winner");
  player1El.style.backgroundColor = "";
  player2El.style.backgroundColor = "";

  player1El.classList.add("active");
  player2El.classList.remove("active");
};

init();

// 주사위 굴리기 기능
btnRollDice.addEventListener("click", function () {
  if (playing) {
    // 1. 랜덤 주사위 숫자 생성
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.src = `dice-${dice}.png`;
    console.log(dice);
    // 2. 주사위 숫자가 1 또는 2인지 확인
    if (dice === 1 || dice === 2) {
      // 플레이어 전환
      switchPlayer();
    } else {
      // 주사위 숫자를 현재 점수에 추가
      currentScore += dice;
      document.getElementById(
        `current-score${activePlayer === 0 ? "" : "2"}`
      ).value = currentScore;
    }
  }
});

const switchPlayer = function () {
  document.getElementById(
    `current-score${activePlayer === 0 ? "" : "2"}`
  ).value = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle("active");
  player2El.classList.toggle("active");
};

// 점수 홀드 기능
btnHold.addEventListener("click", function () {
  if (playing) {
    // 현재 점수를 총 점수에 추가
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);

    document.getElementById(
      `total-score${activePlayer === 0 ? "" : "2"}`
    ).value = scores[activePlayer];

    // 플레이어가 승리했는지 확인
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player0${activePlayer + 1}`)
        .classList.add("winner");

      // 추가: 배경색 변경
      document.querySelector(
        `.player0${activePlayer + 1}`
      ).style.backgroundColor = "yellow";
    } else {
      switchPlayer();
    }
  }
});

// 새로운 게임 시작
btnNewGame.addEventListener("click", init);
