const pokedex = document.getElementById('pokedex');
pokeCache = {};

const fetchPokemon =  async () => {
   const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
   const res = await fetch(url);
   const data =  await res.json();
   const pokemon = data.results.map((result, index) =>({
       ...result,
       id: index + 1,
       image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
       
   }));
   displayPokemon(pokemon);
};



const displayPokemon = (pokemon) =>{
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokey => `
    <li class="card" onclick="selectPokemon(${pokey.id})"/>
        <img class="card-image" src="${pokey.image}"/>
        <h2 class= "card-title"> ${pokey.id}. ${pokey.name}</h2>
    </li>
    `). join('');
    pokedex.innerHTML = pokemonHTMLString;
}

const selectPokemon = async (id) => {
    if(!pokeCache[id]){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokey = await res.json();
    pokeCache[id] = pokey;
    displayPopup(pokey);
    } else{
    displayPopup(pokeCache[id])};
}

const topButton = document.getElementById('topBtn');
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }
const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const displayPopup = (pokey) =>{
    const type = pokey.types.map((type) => type.type.name).join(', ');
    const image = pokey.sprites['front_default'];
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card"/>
            <img class="card-image" src="${image}"/>
            <h2 class= "card-title"> ${pokey.id}. ${pokey.name}</h2>
            <h4><small>Height: </small>${pokey.height} | <small>Weight: </small>${pokey.weight} |<small>Type: </small>${type} </h4>
            
        </div>
    </div>`;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon();
window.onscroll = scrollFunction();