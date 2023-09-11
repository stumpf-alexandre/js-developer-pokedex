
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = (pokeDetail.height / 10).toFixed(2)

    pokemon.weight = (pokeDetail.weight / 10).toFixed(2)

    const abilities = pokeDetail.abilities.map((abilityType) => abilityType.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    const stats = pokeDetail.stats.map((typeStat) => typeStat)
    pokemon.stats = stats;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getDetailsPokemon = (numId) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${numId}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon) 
}