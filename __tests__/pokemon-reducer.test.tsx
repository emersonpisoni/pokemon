/**
 * @jest-environment jsdom
 */
import { pokemonReducer } from "@/app/store/pokemon-slice"

const initialState = {
  "count": 0,
  "currentPokemon": {
    "abilities": [{
      "ability": {
        "name": ""
      }
    }],
    "name": "",
    "sprites": {
      "other": {
        "official-artwork": {
          "front_default": ""
        }
      }
    },
    "stats": [{
      "base_stat": 0,
      "stat": {
        "name": ""
      }
    }],
    "types": [{
      "type": {
        "name": ""
      }
    }]
  },
  "next": "",
  "pokemons": [],
  "previous": ""
}

test('should return initial state', () => {
  expect(pokemonReducer(undefined, { type: 'unknown' })).toEqual(initialState)
})

