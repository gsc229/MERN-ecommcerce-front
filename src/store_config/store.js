import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducers'

function saveToLocalStorage(state){
  try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem('cart', serializedState)
  } catch(error){
    console.log({error})
  }
}

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem('cart')
    if(serializedState === null) return undefined
    return JSON.parse(serializedState)
  }catch(error){
    console.log({error})
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(reducer, persistedState, composeWithDevTools(applyMiddleware(thunk, logger)))

// persist the data to ls
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
