

//// Whenever possible never store derived state(e.g total price which we can get at cartoverview through mapping) here.
//// because that would just create more problems because then we would have to keep them in sync while we are updating the cart.

import { createSlice } from "@reduxjs/toolkit"

//// This fake data use to make out action creators implentation easy
const initialState = {
  cart: [],
//   cart: [{
//     pizzaId: 12,
//     name: "hat",
//     quantity: 4,
//     unitPrice: 12,
//     totalPrice: 16
//   }]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem(state, action){
            state.cart.push(action.payload)
        },

        deleteItem(state, action){
            // We can use slice method as we can do mutation inside the reducer
            state.cart = state.cart.filter(item=> item.pizzaId !== action.payload)
        },

        increaseItemQuantity(state, action){
            const item = state.cart.find(item=>item.pizzaId === action.payload)
            item.quantity ++;
            item.totalPrice = item.quantity*item.unitPrice
        },

        decreaseItemQuantity(state, action){
            const item = state.cart.find(item=>item.pizzaId === action.payload)
            item.quantity --;
            item.totalPrice = item.quantity*item.unitPrice

            if(item.quantity ===0) cartSlice.caseReducers.deleteItem(state, action)
        },
        
        clearCart(state){
            state.cart = []
        }
    }
})


export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

export const  getCart = state => state.cart.cart 

export const getTotalCartQuantity = (state) => {
     return state.cart.cart.reduce((sum, item)=>{
        return sum + item.quantity
      },0)
} 

export const getTotalCartPrice = (state) => {
     return state.cart.cart.reduce((sum, item)=>{
        return sum + item.totalPrice
      },0)
} 

export const getCurrentQuantityById = id => state => {
    return state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
  };
  

