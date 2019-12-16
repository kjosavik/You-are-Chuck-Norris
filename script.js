function getName() {
  const url = document.URL;
  const indexOfPeriod = url.indexOf('.');
  let name = url.substring(8, indexOfPeriod);
  return firstLetterToUpperCase(name);
}

async function fetchJoke() {
  const url = 'https://api.chucknorris.io/jokes/random';
  const response = await fetch(url)
  const json = await response.json();
  return json.value;
}

function getJokeWithNewName(name, joke) {
  const chuck = 'Chuck Norris';
  let index = joke.indexOf(chuck);
  while (index >= 0) {
    joke = joke.replace(chuck, name);
    joke = joke.replace(`${name}'`, `${name}'s`);
    index = joke.indexOf(chuck);
  }
  return joke;
}

async function setJoke(name) {
  const joke = await fetchJoke();
  const jokeWithName = getJokeWithNewName(name, joke);
  const element = document.getElementById('joke');
  element.innerText = firstLetterToUpperCase(jokeWithName);
}

async function setButton(name) {
  const button = document.getElementById('button');
  console.log(button);
  button.addEventListener('click', () => {
    setJoke(name)
  });
}

function firstLetterToUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const name = getName();
document.title = `Ka faen ${name}?`;
setJoke(name);
window.onload = () => {
  setButton(name)
};
