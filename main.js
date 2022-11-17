import axios from "axios"


// fetchAllPokemon()

//npm create vite@latest pokedex-web -- --template vanilla

function firstUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
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

  // pokePic.src = fetchPokemon("bulbasaur").sprites.front_default
  pokeSearchBtn.addEventListener("click", async () => {
    const pokeData = await fetchPokemon(pokeSearchBar.value);
    pokemonName.textContent = firstUpperCase(pokeSearchBar.value);
    pokePic.src = pokeData.sprites.front_default;
    pokeSearchBar.value = "";
  })


  document.addEventListener('keydown', async (e) => {


    if (e.key === "Enter") {
      const pokeData = await fetchPokemon(pokeSearchBar.value);
      pokemonName.textContent = firstUpperCase(pokeSearchBar.value);
      pokePic.src = pokeData.sprites.front_default
      pokeSearchBar.value = "";
      const pokeAbilities = pokeData.abilities;

      //adds abilities
      const abilitiesSection = document.querySelector(".ability-section")
      while (abilitiesSection.firstChild) {
        abilitiesSection.firstChild.remove()
      }
      pokeAbilities.forEach(ability => {
        const abilityDiv = document.createElement("div");
        abilityDiv.className = "ability";
        abilityDiv.textContent = firstUpperCase(ability.ability.name);
        abilitiesSection.append(abilityDiv);
      })

      //adds physical attributes
      const physicalSection = document.querySelector(".physical-section");
      while (physicalSection.firstChild) {
        physicalSection.firstChild.remove()
      }
      const physicalArray = ["height", "weight", "stats"];
      for (let i = 0; i < physicalArray.length; i++) {
        if (physicalArray[i] === "stats") {
          const physicalStat = pokeData[physicalArray[i]][0].base_stat
          const physicalDiv = document.createElement("div");
          physicalDiv.className = "physicalStat";
          physicalDiv.textContent = `HP: ${physicalStat}`;
          physicalSection.append(physicalDiv);
        } else {
          const physicalStat = pokeData[physicalArray[i]]
          const physicalDiv = document.createElement("div");
          physicalDiv.className = "physicalStat";
          // physicalDiv.textContent = `${physicalArray[i].charAt(0).toUpperCase() + physicalArray[i].slice(1)}: ${physicalStat}`;
          physicalDiv.textContent = `${firstUpperCase(physicalArray[i])}: ${physicalStat}`;
          physicalSection.append(physicalDiv);
        }
      }

      //adds types
      const pokeTypes = pokeData.types;
      const typesSection = document.querySelector(".types-section");
      while (typesSection.firstChild) {
        typesSection.firstChild.remove()
      }
      pokeTypes.forEach(type => {
        const typesDiv = document.createElement("div");
        typesDiv.className = "type";
        typesDiv.textContent = firstUpperCase(type.type.name);
        typesSection.append(typesDiv);
      })
      pokemonName.classList.remove("hide");
      imageContainer.classList.remove("hide");

      //unhides information when a pokemon is searched
      const abilitiesContainer = document.querySelector(".abilities")
      abilitiesContainer.classList.remove("hide");
      const typesContainer = document.querySelector(".types")
      typesContainer.classList.remove("hide");
      const physicalContainer = document.querySelector(".physicalTraits")
      physicalContainer.classList.remove("hide");
    }
  })
}

searchPokemon()
fetchPokemon("bulbasaur")

const basicSpritesArray = ["back_default", "back_shiny", "front_default", "front_shiny"]
const otherSpritesArray = ["dream_world", "home", "official-artwork"]

async function makeOtherSpritesArray() {
  const pokeData = await fetchPokemon(pokemonName.textContent.toLowerCase())
  const pokeImg = document.querySelector("img")
  console.log(pokeData.sprites.other)
  const otherSprites = pokeData.sprites.other
  pokeImg.src = otherSprites[otherSpritesArray[counter2]].front_default
  }

let counter = 0;
let counter2 =0;

async function changeImg() {
  const pokeData = await fetchPokemon(pokemonName.textContent.toLowerCase())
  const pokeImg = document.querySelector("img")
  // console.log(pokeData)
  pokeImg.src = pokeData.sprites[basicSpritesArray[counter]]

}


const topBtn = document.querySelector(".top-btn");

const botBtn = document.querySelector(".bot-btn");

const leftBtn = document.querySelector(".left-btn");

const rightBtn = document.querySelector(".right-btn");

const pokemonName = document.querySelector(".pokemonName")
topBtn.addEventListener("click", () => {
  // const pokeData = await fetchPokemon(pokemonName.textContent.toLowerCase())
  changeImg()
  counter += 1;
  if (counter === 4) {
    counter = 0
  }
})


botBtn.addEventListener("click", () => {
  changeImg()
  counter -= 1;
  if (counter === -1) {
    counter = 3
  }
})

leftBtn.addEventListener("click", async () => {
  makeOtherSpritesArray()
  counter2 -= 1;
  if (counter2 === -1) {
    counter2 = 2
  }
})

rightBtn.addEventListener("click", () => {
  makeOtherSpritesArray()
  counter2 += 1;
  if (counter2 === 3) {
    counter2 = 0
  }
})



// const imageContainer = document.querySelector(".imageContainer");
// imageContainer.append(pokePic);