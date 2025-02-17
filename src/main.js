const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// 現在のカードを追跡
let currentActiveCard = 0;

// カードのDOMを格納
const cardsEl = [];

// カードのデータを格納
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

// 全てのカードを作成
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// DOMに1枚のカードを作成
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  // 'cardsEl'に追加
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// カードの枚数を表示
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// ローカルストレージからカードを取得
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// ローカルストレージにカードを追加
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

// イベントリスナー
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// 'Add New Card'ボタンの実装
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// 'X'ボタンの実装
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

// 'Add Card'ボタンの実装
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question: question, answer: answer };
    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// 'Clear Cards'ボタンの実装
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
