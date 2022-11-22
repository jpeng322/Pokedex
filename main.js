import axios from "axios"


//npm create vite@latest pokedex-web -- --template vanilla

function firstUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

//fetches one pokemon
async function fetchPokemon(name) {
  try {
    const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (pokemonData.status == 200) {
      console.log(pokemonData)
      return pokemonData.data
      // return pokemonData.data
    } else {
      console.log("failed fetch")
      return null
    }
  } catch (error) {
    // console.log(error)
    // console.log("hahahah")
    // console.log(pokemonData, "cannot work")
    const imageContainer = document.querySelector(".imageContainer")
    const pokePic = document.createElement("img")
    const displayContainer = document.querySelector(".displayContainer")
    displayContainer.classList.remove("default")
    imageContainer.classList.remove("hide");
    // imageContainer.append(pokePic);
    // pokePic.src 
    // imageContainer.textContent = "NONONO"
    pokePic.src = "./images/psyduck.jpg"
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



  pokeSearchBtn.addEventListener("click", async () => {
    const pokeData = await fetchPokemon(pokeSearchBar.value);
    if (pokeData !== undefined) {
      imageContainer.classList.remove("full")
      const allButtons = document.querySelectorAll(".btn");
      allButtons.forEach(button => button.disabled = false)
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
      const displayContainer = document.querySelector(".displayContainer")
      displayContainer.classList.remove("default")
      const abilitiesContainer = document.querySelector(".abilities")
      abilitiesContainer.classList.remove("hide");
      const typesContainer = document.querySelector(".types")
      typesContainer.classList.remove("hide");
      const physicalContainer = document.querySelector(".physicalTraits")
      physicalContainer.classList.remove("hide");
    }
    else {
      const allButtons = document.querySelectorAll(".btn");
      allButtons.forEach(button => button.disabled = true)
      console.log(allButtons)
      console.log("else statement")
      // const imageContainer = document.querySelector(".imageContainer")
      // const pokePic = document.createElement("img")
      const displayContainer = document.querySelector(".displayContainer")
      displayContainer.classList.remove("default")
      imageContainer.classList.remove("hide");
      // imageContainer.append(pokePic);
      // pokePic.src 
      // imageContainer.textContent = "NONONO"
      const typesSection = document.querySelector(".types-section");
      while (typesSection.firstChild) {
        typesSection.firstChild.remove()
      }
      const physicalSection = document.querySelector(".physical-section");
      while (physicalSection.firstChild) {
        physicalSection.firstChild.remove()
      }
      const abilitiesSection = document.querySelector(".ability-section")
      while (abilitiesSection.firstChild) {
        abilitiesSection.firstChild.remove()
      }
      const abilitiesContainer = document.querySelector(".abilities")
      abilitiesContainer.classList.add("hide");
      const typesContainer = document.querySelector(".types")
      typesContainer.classList.add("hide");
      const physicalContainer = document.querySelector(".physicalTraits")
      physicalContainer.classList.add("hide");
      imageContainer.classList.add("full")
      pokemonName.textContent = ""
      pokePic.src = "./images/error_page.png"
      // pokePic.width = "300px"

    }
  }
  )





  document.addEventListener('keydown', async (e) => {


    if (e.key === "Enter") {
      const pokeData = await fetchPokemon(pokeSearchBar.value);
      // pokemonName.textContent = firstUpperCase(pokeSearchBar.value);
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
      const displayContainer = document.querySelector(".displayContainer")
      displayContainer.classList.remove("default")
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
let counter2 = 0;

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
// const initialContainer = document.querySelector(".initial.container")
const initialContainer = document.querySelector(".container-initial")
const containerOpened = document.querySelector(".container.opened")
const rightPanel = document.querySelector(".right-panel")
const openButton = document.querySelector(".open-button")
const closeButton = document.querySelector(".close-button")
openButton.addEventListener("click", () => {
  // const 
  initialContainer.classList.add("hide")
  containerOpened.classList.remove("hide")
  rightPanel.classList.remove("hide")
})

// const imageContainer = document.querySelector(".imageContainer");
// imageContainer.append(pokePic);

closeButton.addEventListener("click", () => {
  // const 
  initialContainer.classList.remove("hide")
  containerOpened.classList.add("hide")
  rightPanel.classList.add("hide")
})