export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWin(correct, wrong, word) {
  let status = "";
  if (word.length != 0) status = "win";
  // check for win
  word.split("").forEach((letter) => {
    if (!correct.includes(letter)) {
      status = "";
    }
  });
// console.log(correct.length, word.length)
// console.log(correct, word)
  // if (word.length!=0 && correct.length === word.length) status = "win";
  // check for loss
  if (wrong.length === 6) status = "lose";

  return status;
}
