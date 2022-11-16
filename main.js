import axios from "axios"


// fetchAllPokemon()

//npm create vite@latest pokedex-web -- --template vanilla


async function fetchAllPokemon() {
  try {
    const allPokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon")
    if (allPokemonData.status == 200) {
      console.log(allPokemonData)
      return allPokemonData.data
    } else {
      return null
    }
  } catch (error) {
    console.log("something went wrongasdasdsa");
    console.log(error)
  }
}

// async function fetchAllPokemon() {
//   try {
//     const allPokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=340&limit=20")
//     if (allPokemonData.status == 200) {
//       console.log(allPokemonData)
//       return allPokemonData.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log("something went wrongasdasdsa");
//     console.log(error)
//   }
// }

//fetches one pokemon
async function fetchPokemon(name) {
  try {
    const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (pokemonData.status == 200) {
      console.log(pokemonData.data)
      return pokemonData.data
      // return pokemonData.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}


async function searchPokemon() {
  const pokeContainer = document.querySelector(".container")

  const pokemonName = document.querySelector(".pokemonName")

  const pokeSearchBar = document.querySelector("#pokemonSearch");

  const pokeSearchBtn = document.querySelector(".pokemonSearchBtn");

  const imageContainer = document.querySelector(".imageContainer")

  const pokePic = document.createElement("img")
  imageContainer.append(pokePic);
  console.log(imageContainer)
  // pokePic.src = fetchPokemon("bulbasaur").sprites.front_default
  pokeSearchBtn.addEventListener("click", async () => {
    const pokeData = await fetchPokemon(pokeSearchBar.value);
    // console.log(pokeData.sprites.front_default)
    pokemonName.textContent = pokeSearchBar.value;
    pokePic.src = pokeData.sprites.front_default;
    pokeSearchBar.value = "";
  })


  document.addEventListener('keydown', async (e) => {
    if (e.key === "Enter") {
      console.log("entered")
      const pokeData = await fetchPokemon(pokeSearchBar.value);
      // console.log(pokeData.sprites.front_default)
      pokemonName.textContent = pokeSearchBar.value;
      pokePic.src = pokeData.sprites.front_default
      pokeSearchBar.value = "";
    }
  })
}

searchPokemon()
fetchPokemon("bulbasaur")
