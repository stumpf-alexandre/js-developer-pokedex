const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const sectionPokemon = document.querySelector('.content');
const openDetails = document.querySelector('.content-detail')
const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <a class="pokemonLink" onclick="selectPokemon('${pokemon.number}');">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function convertPokeDetailsHtml(pokeDetail) {
    
    return `
        <div class="popup ${pokeDetail.type}">
            <button id="closeBtn" onclick="closePopup();">Fechar</button>
            <div class="card">
                <img src="${pokeDetail.photo}" alt="Imagem do pokemon ${pokeDetail.name}">
                <h2 class="card-title name">${pokeDetail.number}. ${pokeDetail.name}</h2>
                <p><small>Altura: </small>${pokeDetail.height} m | <small>Peso: </small>${pokeDetail.weight} Kg | <small>Tipo: </small>${pokeDetail.types.map((type) => type).join(', ')}
                <p><small>Habilidades: </small>${pokeDetail.abilities.map((ability) => ability).join(', ')}
                ${pokeDetail.stats.map((stat) => `
                    <div class="card-details">
                        <span class="detail-name-stat">${stat['stat']['name']}</span>
                        <div class="card-container">         
                            <div class="progress-bar progress-bar-${pokeDetail.type}" style="width: ${stat['base_stat']}%;"></div>
                        </div>
                    </div>
                `).join(' ')}
            
            </div>
        </div>
    `
}

function selectPokemon(numId) {
    pokeApi.getDetailsPokemon(numId).then((pokeDetail = []) => {
        const newPopup = convertPokeDetailsHtml(pokeDetail);
        pokemonList.innerHTML += newPopup;
        sectionPokemon.classList.add("open-modal")
    })
}

function closePopup () {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}