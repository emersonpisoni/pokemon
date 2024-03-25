export async function getPokemons(offset: number = 0) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`)

  return data.json()
}

export async function getPokemonByName(name: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

  return data.json()
}

