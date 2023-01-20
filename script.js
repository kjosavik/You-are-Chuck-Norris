function getName() {
  const url = document.URL;
  const indexOfPeriod = url.indexOf(".");
  let name = url.substring(8, indexOfPeriod);
  return firstLetterToUpperCase(name);
}

async function fetchJoke() {
  const url = "https://api.chucknorris.io/jokes/random";
  const response = await fetch(url);
  const json = await response.json();
  return json.value;
}

function getJokeWithNewName(name, joke) {
  const chuck = "Chuck Norris";
  joke = replaceAllOccurances(joke, chuck, name);
  joke = replaceAllOccurances(joke, `${name}'`, `${name}'s`);
  return joke;
}

function getJokeWithNewGender(joke) {
  joke = replaceAllOccurances(joke, "he", "she");
  joke = replaceAllOccurances(joke, "him", "her");
  joke = replaceAllOccurances(joke, "his", "her");
  return joke;
}

function replaceAllOccurances(joke, toBeReplaced, replaceWith) {
  const regex = new RegExp("\\b" + toBeReplaced + "\\b");
  let index = joke.search(regex);
  console.log(joke);
  while (index >= 0) {
    joke = joke.replace(regex, replaceWith);
    index = joke.search(regex);
  }
  return joke;
}

async function setJoke(name) {
  const joke = await fetchJoke();
  let fixedJoke = getJokeWithNewName(name, joke);
  if (name === "Ninafina") {
    fixedJoke = getJokeWithNewGender(fixedJoke);
  }
  const element = document.getElementById("joke");
  element.innerText = firstLetterToUpperCase(fixedJoke);
}

async function setButton(name) {
  const button = document.getElementById("button");
  console.log(button);
  button.addEventListener("click", () => {
    setJoke(name);
  });
}

function firstLetterToUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const name = getName();
document.title = `Ka faen ${name}?`;
setJoke(name);
window.onload = () => {
  setButton(name);
};
