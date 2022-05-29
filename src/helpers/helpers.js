export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

export function checkWin(correct, wrong, word) {
  let status = "";
  // check for win
  word.split("").forEach((letter) => {
    if (!correct.includes(letter)) {
      status = "";
    }
  });

  // if (correct.length == 6) status = "win";
  // check for loss
  if (wrong.length === 6) status = "lose";

  return status;
}
