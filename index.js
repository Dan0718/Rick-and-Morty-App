import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');


// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";

  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  const characters = data.results;

  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage}`; 

  characters.forEach((character) => {
    const card = createCharacterCard({
    
    name: character.name,
      status: character.status,
      type: character.type,
      occurences: character.episode.length,
      imgSrc: character.image,
    });
    cardContainer.append(card);
  });
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
    cardContainer.innerHTML = "";
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
    cardContainer.innerHTML = "";
  }
});

fetchCharacters();
