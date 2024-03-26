export async function getPokemons(offset: number = 0) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    return data.json()
  } catch (error) {
    console.log(error, 'getPokemons Error');
  }
}

export async function getPokemonByName(name: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

  return data.json()
}

