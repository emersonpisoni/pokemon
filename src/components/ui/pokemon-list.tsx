import { useState } from "react";
import { useAppSelector } from "../../app/store/store";
import { PaginationSection } from "./pagination-section";
import { PokemonGrid } from "./pokemon-grid";

export default function PokemonList() {
  const pokemonData = useAppSelector(state => state.pokemon)

  const [name, setName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)



  return <div className="flex flex-col w-full gap-4">
    <input data-testid='input' id="name" name="name" placeholder="Pikachu, Charmander, Bulbasaur..." value={name} onChange={e => setName(e.target.value)} className="sticky top-6 text-white bg-black/85 p-2 w-1/2 self-center rounded-lg z-10" />
    <PokemonGrid name={name} />
    <PaginationSection pokemonDataCount={pokemonData.count} currentPage={currentPage} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
  </div>
}

