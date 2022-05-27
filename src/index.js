import Example from "./scripts/example"

document.addEventListener("DOMContentLoaded", () => {
  console.log("blah")
  const main = document.getElementById("main")
  new Example(main);
})