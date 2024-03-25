import { useAppSelector } from "@/app/store/store"
import { PokemonCard } from "./pokemon-card"

type PokemonGridType = {
  name: string
}

export function PokemonGrid({ name }: PokemonGridType) {
  const pokemonData = useAppSelector(state => state.pokemon)
  const filtered = searchedFilter()

  function searchedFilter() {
    return pokemonData.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name))
  }

  return <div className="sticky top-0 grid grid-cols-[repeat(auto-fill,_minmax(200px,_auto))] gap-6 px-20 pb-20">
    {filtered.map(({ name, url }) => {
      return <PokemonCard key={name} name={name} url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${url.split('/')[6]}.png`} />
    })}
  </div>
}