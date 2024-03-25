import { createSlice, configureStore, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getPokemonByName, getPokemons } from '../api/route.api'

type Pokemon = {
  name: string
  url: string
}

type CurrentPokemonTypeType = {
  type: { name: string }
}

type CurrentPokemonAbilityType = {
  ability: { name: string }
}

type CurrentPokemonStatType = {
  base_stat: number
  stat: { name: string }
}

type CurrentPokemonType = {
  name?: string
  types?: CurrentPokemonTypeType[]
  sprites?: { other: { 'official-artwork': { 'front_default': string } } }
  abilities?: CurrentPokemonAbilityType[]
  stats?: CurrentPokemonStatType[]
}

export type PokemonState = {
  count: number
  next: string
  previous: string
  pokemons: Pokemon[],
  currentPokemon: CurrentPokemonType
}

const initialStateCurrentPokemon = {
  name: '',
  types: [{
    type: {
      name: ''
    },
  }],
  sprites: {
    other: {
      "official-artwork": {
        front_default: ''
      }
    }
  },
  abilities: [{
    ability: { name: '' }
  }],
  stats: [{
    stat: { name: '' },
    base_stat: 0
  }]
}

const initialState: PokemonState = {
  count: 0,
  next: "",
  previous: '',
  pokemons: [],
  currentPokemon: initialStateCurrentPokemon
}



export const fetchPokemons = createAsyncThunk('getPokemons', getPokemons)
export const fetchPokemonByName = createAsyncThunk('getPokemonByName', getPokemonByName)

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.pokemons = payload.results
      state.count = payload.count
      state.next = payload.next
      state.previous = payload.previous
    })
    builder.addCase(fetchPokemonByName.pending, (state, { payload }) => {
      state.currentPokemon = initialStateCurrentPokemon
    })
    builder.addCase(fetchPokemonByName.fulfilled, (state, { payload }) => {
      state.currentPokemon = payload

    })
  },
})

export const { reducer: pokemonReducer, actions } = pokemonSlice