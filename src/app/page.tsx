'use client'

import { useDispatch } from "react-redux";
import { fetchPokemons } from "./store/pokemon-slice";
import { AppDispatch } from "./store/store";
import PokemonList from "../components/ui/pokemon-list";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])

  return (
    <PokemonList />
  );
}
