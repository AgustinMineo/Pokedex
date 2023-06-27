
document.addEventListener('DOMContentLoaded', function() { // Wit until the page is full laod
    const pokedex = document.getElementById('pokeContainer');
  
    fetchPokemon('https://pokeapi.co/api/v2/pokemon');//Fetch the pokemon list
  
    async function fetchPokemon(urlAPI) {
      fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
          data.results.forEach(pokemon => {
            fetch(pokemon.url)// search information about every pokemon
              .then(response => response.json())
              .then(pokemonData => {
                generatePokemonCard(pokemonData); // Generate every card with the information
              });
          });
  
          if (data.next) { // Check if there is any other pokemon left
            fetchPokemon(data.next);
          }
        });
    }
  
    function generatePokemonCard(pokemon) {
      const card = document.createElement('div');
      card.className = 'card';
  
      const image = document.createElement('img');
      image.src = pokemon.sprites.front_default;
      image.className = 'card-img-top';
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
  
      const name = document.createElement('h5');
      name.className = 'card-title';
      name.textContent = pokemon.name;
  
      const id = document.createElement('p');
      id.className = 'card-text';
      id.textContent = `ID: ${pokemon.id}`;
  
      cardBody.appendChild(name);
      cardBody.appendChild(id);
  
      card.appendChild(image);
      card.appendChild(cardBody);
  
      pokedex.appendChild(card);
    }
  });