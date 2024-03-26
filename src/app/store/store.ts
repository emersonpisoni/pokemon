import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "./pokemon-slice";
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  pokemon: pokemonReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector