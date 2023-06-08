const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonShiny = document.querySelector('.btn-shiny');
const pokemonNormal = document.querySelector('.btn-normal');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let data = null;
let isShiny = false;

const fetchPokemon = async (pokemon) => {
    if (pokemon > 649) {
        searchPokemon = 650;
        return null;
    }
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const responseData = await APIResponse.json();
        return responseData;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading... ';
    pokemonNumber.innerHTML = '';

    data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        if (isShiny) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        } else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }

        input.value = '';
        searchPokemon = data.id;

        // Verifica o estado do botão "btn-normal"
        if (isShiny) {
            pokemonNormal.style.display = 'block';
            pokemonShiny.style.display = 'none';
        } else {
            pokemonNormal.style.display = 'none';
            pokemonShiny.style.display = 'block';
        }

        // Verifica se o número do Pokémon é 602 (Tynamo)
        if (data.id === 602) {
            pokemonImage.style.bottom = '55%';
            pokemonImage.style.left = '54%';
            pokemonImage.style.transform = 'translate(-63%, 20%)';
            pokemonImage.style.height = '12%';
        } else {
            // Se não for Tynamo, redefine as propriedades de estilo para os valores padrão
            pokemonImage.style.bottom = '';
            pokemonImage.style.left = '';
            pokemonImage.style.transform = '';
            pokemonImage.style.height = '';
        }
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        input.value = '';
    }
};

const updatePokemonImage = (imageUrl) => {
    pokemonImage.src = imageUrl;
};

const toggleShiny = () => {
    isShiny = !isShiny;

    if (data) {
        if (isShiny) {
            const shinyImage = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
            updatePokemonImage(shinyImage);
        } else {
            const defaultImage = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            updatePokemonImage(defaultImage);
        }

        // Atualiza a exibição dos botões "btn-normal" e "btn-shiny"
        if (isShiny) {
            pokemonNormal.style.display = 'block';
            pokemonShiny.style.display = 'none';
        } else {
            pokemonNormal.style.display = 'none';
            pokemonShiny.style.display = 'block';
        }
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

pokemonShiny.addEventListener('click', () => {
    toggleShiny();
});

pokemonNormal.addEventListener('click', () => {
    toggleShiny();
});

renderPokemon(searchPokemon);
