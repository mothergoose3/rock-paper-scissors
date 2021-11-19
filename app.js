const shieldBtn = document.querySelector(".shield-weapon");
const spearBtn = document.querySelector(".spear-weapon");
const baaBtn = document.querySelector(".baa-weapon");
const weaponBtn = document.querySelectorAll(".weapon-button");
const battleLog = document.querySelector(".battle-log");
const endGameModal = document.querySelector(".end-game-modal");
const palyGameModal = document.querySelector(".modal-button");

let playerHealth = 100;
let challengerHealth = 100;
let attempt = 0;

function countAttempts() {
  const attempts = document.querySelector(".attempt");
  attempt += 1;
  attempts.textContent = `Attempt: ${attempt}`;
  return attempt;
}

function challengerChoice() {
  const weaponSection = document.querySelector(".challenger-weapon");
  const weapon = ["shield", "spear", "bow and arrow"];
  const challengerWeapon = weapon[Math.floor(Math.random() * weapon.length)];

  if (challengerWeapon === "shield") {
    weaponSection.textContent = `${challengerWeapon}`.toUpperCase();
  } else if (challengerWeapon === "spear") {
    weaponSection.textContent = `${challengerWeapon}`.toUpperCase();
  } else if (challengerWeapon === "bow and arrow") {
    weaponSection.textContent = `${challengerWeapon}`.toUpperCase();
  }
  return challengerWeapon;
}

function roundWinner(playerWeapon, challengerWeapon) {
  const healthStatus = document.querySelector(".health-status");
  const gameStatusSection = document.querySelector(".game-status");
  const challengerTab = document.querySelector(".challenger-tab");

  switch (true) {
    case playerWeapon === challengerWeapon:
      battleLog.textContent = `Close! Two ${playerWeapon}s and a green border signifies a draw, so both health remains. Try to attack again!`;
      gameStatusSection.style.border = "0.375rem solid #67bfa2";
      challengerTab.classList.remove(
        "challenger-grey-border",
        "challenger-yellow-border",
        "challenger-brown-border"
      );
      challengerTab.classList.add("challenger-green-border");
      break;
    case playerWeapon === "shield" && challengerWeapon === "spear":
    case playerWeapon === "spear" && challengerWeapon === "bow and arrow":
    case playerWeapon === "bow and arrow" && challengerWeapon === "shield":
      battleLog.textContent = `Wonderful attack! In addition to a yellow border, enemy's health has decreased because of the great power of your ${playerWeapon} crushed its ${challengerWeapon}.`;
      gameStatusSection.style.border = "0.375rem solid #e8c77c";
      challengerTab.classList.remove(
        "challenger-green-border",
        "challenger-grey-border",
        "challenger-brown-border"
      );
      challengerTab.classList.add("challenger-yellow-border");
      challengerHealth -= 10;
      break;
    default:
      battleLog.textContent = `Too bad.. a brown border denotes you lost the round because your ${playerWeapon} lacks of power against challenger's ${challengerWeapon}.`;
      gameStatusSection.style.border = "0.375rem solid #705b5b";
      challengerTab.classList.remove(
        "challenger-green-border",
        "challenger-yellow-border",
        "challenger-grey-border"
      );
      challengerTab.classList.add("challenger-brown-border");
      playerHealth -= 10;
      break;
  }

  healthStatus.textContent = `Your Health: ${playerHealth}% | Challenger's Health: ${challengerHealth}%`;
  return [playerHealth, challengerHealth];
}

function endGame(playerHealth, challengerHealth) {
  if (playerHealth === 0 || challengerHealth === 0) {
    weaponBtn.forEach((weapon) => {
      weapon.setAttribute("disabled", "");
      weapon.classList.add("dead-button");
    });

    const endGameText = document.querySelector(".end-game-text");
    if (playerHealth > challengerHealth) {
      endGameText.textContent =
        "Congratulations, Champion! Your challenger barely holds himself in one piece. Haha!";
      endGameText.style.color = "9e9ea6";
    } else {
      endGameText.textContent =
        "Pity you. Enjoy the mocking laughter of your opponent.";
      endGameText.style.color = "9e9ea6";
    }
    endGameModal.style.visibility = "visible";
    endGameModal.style.opacity = "1";
  }
}

function playGame() {
  palyGameModal.addEventListener("click", () => {
    window.location.reload();
  });
}

const gameStart = () => {
  let playerWeapon;
  const weaponBtn = document.querySelectorAll(".weapon-button");
  const playerTab = document.querySelector(".weapons");
  weaponBtn.forEach((weapon) => {
    weapon.addEventListener("click", () => {
      if (weapon.classList.contains("shield")) {
        playerWeapon = "shield";
        playerTab.classList.remove(
          "player-green-border",
          "player-yellow-border",
          "player-brown-border"
        );
        playerTab.classList.add("player-green-border");
        playerTab.style.border = "0.375rem solid #67bfa2";
      } else if (weapon.classList.contains("spear")) {
        playerWeapon = "spear";
        playerTab.classList.add("player-yellow-border");
        playerTab.classList.remove(
          "player-green-border",
          "player-yellow-border",
          "player-brown-border"
        );
        playerTab.style.border = "0.375rem solid #e8c77c";
      } else {
        playerWeapon = "bow and arrow";
        playerTab.classList.add("player-brown-border");
        playerTab.classList.remove(
          "player-green-border",
          "player-yellow-border",
          "player-brown-border"
        );
        playerTab.style.border = "0.375rem solid #705b5b";
      }
      countAttempts();
      roundWinner(playerWeapon, challengerChoice());
      endGame(playerHealth, challengerHealth);
      playGame();
    });
  });
};

gameStart();
