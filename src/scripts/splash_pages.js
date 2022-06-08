const splashPages = {
  winPage() {
    const win = document.getElementById('win');
    win.style.backgroundImage = "url(./src/images/pages/you_win.gif)"
    win.style.display = "block";
  },

  losePage() {
    const lose = document.getElementById('lose');
    lose.style.backgroundImage = "url(./src/images/pages/you_lose.png)"
    lose.style.display = "block";
  }
  
}

export default splashPages;