import Game from "./scripts/game"

document.addEventListener("DOMContentLoaded", () => {
  let game = new Game({
    element: document.querySelector(".game-container")
  })

  const title = document.getElementById('title')
  title.style.backgroundImage = "url(./src/images/pages/title.gif)";
  title.addEventListener("click", () => {
    
    title.style.opacity = "1.0"

    const fadeTitle = setInterval(() => {
      if (title.style.opacity > "0.0") {
        title.style.opacity -= "0.01";
      } else {
        title.remove();
        clearInterval(fadeTitle);
      }
    }, 5)

    const instructions = document.getElementById('instructions')
    instructions.addEventListener("click", () => {

      instructions.style.opacity = "1.0"

      const fadeInstructions = setInterval(() => {
        if (instructions.style.opacity > "0.0") {
          instructions.style.opacity -= "0.01";
        } else {
          instructions.remove();
          clearInterval(fadeInstructions);
        }
      }, 5)
      game.init();
    })
  })
})