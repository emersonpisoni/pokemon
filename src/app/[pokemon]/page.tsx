'use client'

import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "../store/store"
import { ReactNode, useEffect } from "react"
import { fetchPokemonByName } from "../store/pokemon-slice"
import Image from "next/image"
import Link from "next/link"

type pokemonTypeIconsType = {
  [pokemonType: string]: string
}

const pokemonTypeIcons: pokemonTypeIconsType = {
  normal: '/Pokemon_Type_Icon_normal.svg',
  fighting: '/Pokemon_Type_Icon_fighting.svg',
  flying: '/Pokemon_Type_Icon_flying.svg',
  poison: '/Pokemon_Type_Icon_poison.svg',
  ground: '/Pokemon_Type_Icon_ground.svg',
  rock: '/Pokemon_Type_Icon_rock.svg',
  bug: '/Pokemon_Type_Icon_bug.svg',
  ghost: '/Pokemon_Type_Icon_ghost.svg',
  steel: '/Pokemon_Type_Icon_steel.svg',
  fire: '/Pokemon_Type_Icon_fire.svg',
  water: '/Pokemon_Type_Icon_water.svg',
  grass: '/Pokemon_Type_Icon_grass.svg',
  electric: '/Pokemon_Type_Icon_electric.svg',
  psychic: '/Pokemon_Type_Icon_psychic.svg',
  ice: '/Pokemon_Type_Icon_ice.svg',
  dragon: '/Pokemon_Type_Icon_dragon.svg',
  dark: '/Pokemon_Type_Icon_dark.svg',
  fairy: '/Pokemon_Type_Icon_fairy.svg',
  unknown: '/Pokemon_Type_Icon_unknown.svg',
  shadow: '/Pokemon_Type_Icon_shadow.svg',
}

const Ditto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png'

export default function Pokemon({ params }: { params: { pokemon: string } }) {
  const dispatch = useDispatch<AppDispatch>()
  const { currentPokemon: { name, types, abilities, stats, sprites } } = useAppSelector(state => state.pokemon)


  useEffect(() => {
    dispatch(fetchPokemonByName(params.pokemon))
  }, [dispatch])

  return (
    <>
      <Link href={'/'} className=" lg:fixed top-10 left-28 text-white text-3xl p-2 mb-4 border border-white rounded">🔙 Voltar</Link>
      <div className="bg-black/85 relative text-white gap-6 p-10 mx-4 text-2xl font-bold flex flex-col justify-center items-center shadow-2xl rounded-lg border-white/75 border-[10px] transition-transform cursor-pointer hover:scale-110">
        <div className="flex flex-wrap justify-between w-full pt-6">
          <span className="text-4xl">{name}</span>
          <div className="flex items-center gap-2 absolute right-2 top-2">
            <span>HP</span>
            <span className="text-5xl">{stats?.find(stat => stat.stat.name === 'hp')?.base_stat}</span>
            {types?.map(type => <Image key={`${name}-${type.type.name}`} alt="" src={pokemonTypeIcons[type.type.name]} width={30} height={0} />)}
          </div>

        </div>
        <div className="border border-white rounded-md w-full flex justify-center">
          <Image src={sprites?.other["official-artwork"].front_default || Ditto} alt={`${name}-image`} width={300} height={100} className="hover:scale-150 transition-transform" />
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {abilities?.map(({ ability }) => <div key={`${name}-${ability.name}`} >
              <Badge>{ability.name}</Badge>
            </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-evenly">
            {stats?.map(({ stat, base_stat }) => {
              return ['attack', 'defense'].includes(stat.name) && <div key={`${name}-${stat.name}`} className="flex flex-col justify-center items-center gap-4">
                <span className="text-5xl">{base_stat}</span>
                <Image src={`${stat.name}.svg`} alt={`${name}-${stat.name}`} width={30} height={0} />
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="border border-white px-2 rounded-xl">{children}</span>
}