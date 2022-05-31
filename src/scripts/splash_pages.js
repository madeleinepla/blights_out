const splashPages = {
  winPage() {
    const win = document.getElementById('win');
    win.style.display = "block";
  },

  losePage() {
    const lose = document.getElementById('lose');
    lose.style.display = "block";
  }
}

export default splashPages;