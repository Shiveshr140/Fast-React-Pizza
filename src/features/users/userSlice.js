import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {getAddress} from "../../services/apiGeocoding"

// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }



// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }


/////************************  Add redux
// then create a store.jsx

//// function getPosition() {
////   return new Promise(function (resolve, reject) {
////     navigator.geolocation.getCurrentPosition(resolve, reject);
////   });
//// }

//// async function fetchAddress() {
////   // 1) We get the user's geolocation position
////   const positionObj = await getPosition();
////   const position = {
////     latitude: positionObj.coords.latitude,
////     longitude: positionObj.coords.longitude,
////   };

////   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
////   const addressObj = await getAddress(position);
////   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

////   // 3) Then we return an object with the data that we are interested in
////   return { position, address };
//// }


// const initialState = {
//     userName: "",
// }

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers:{
//     updateName(state, action){//
//       state.userName =  action.payload
//     }
//   }
// })

// export const {updateName} = userSlice.actions;

// export default userSlice.reducer




////***************************** Redux Thunks With createAsyncThunk
// Let's now go back to some more advanced Redux Toolkit and in particular, we will now create a Thunk middleware by using the built-in CreateAsyncThunk function
// which is a way of creating a Thunk that we avoided when we first learned about Redux, and the idea here is to implement the feature
// where our users can use geolocation in order to get their GPS position and their address

// So let's analyze what we have here. So we have dysfunction here called fetchAddress which, as the name says, is responsible for fetching some information
// about the user's address and it does so in two steps. So first of all, it gets the user's geolocation position which is provided by this getPosition function right here.
// So basically wrapping a promise around this function right here. So then we can use await. So here we get the user's position
// and then with that position, so that latitude and longitude, we use this reverse geocoding API. So this one right here, let's open that,
// and so here all we do is to make a fetch request to this API right here with the user's current latitude and longitude. And so this will then do reverse geocoding
// which is basically getting some information about that GPS position like the city or the street name. So things like that,
// and so then we can display that information later in the form.

// As we can see, this is an async function which means that we cannot just call this function directly inside a Redux reducer
// because remember Redux is by nature completely synchronous, and so that's why we now need to talk about Thunks again. So we learned all about Thunks back in the Redux section
// which you can of course revisit and review, but basically all you need to know at this point is that a Thunk is a middleware
// that sits between the dispatching and the reducer itself. So it will do something to the dispatched action before actually updating the store.

// Now back then when we wanted to use Thunks with Redux Toolkit, we manually created our own action creator and placed the Thunk in there
// so instead of using Redux Toolkit's native way of creating a Thunk, but now let's actually do that. so now in order to create a Thunk,
// we will use the createAsyncThunk function.

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// So this fetch address will be the result of calling createAsyncThunk. And so this createAsyncThunk receives two things. First, we need to pass in the action name, so that's gonna be user and then fetchAddress and then second, we need to pass in an async function
// that will return the payload for the reducer later. So this function needs to return the promise and so an async function is ideal here. So let's just create an anonymous function here and then grab all this code
// and place that in there. So then we can remove this and paste that here. All right, and now this fetchAddress here will actually become the action creator function
// that we will later call in or code, and so let's export this one as well. So now besides this updateName action creator,

export const fetchAddress = createAsyncThunk("user/fetchAddress", async function(){
        // 1) We get the user's geolocation position
        const positionObj = await getPosition();
        const position = {
          latitude: positionObj.coords.latitude,
          longitude: positionObj.coords.longitude,
        };

        // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
        const addressObj = await getAddress(position);
        const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

        // 3) Then we return an object with the data that we are interested in
        // payload for fuilfield status
        return { position, address };
    }
  )

// add status and others
const initialState = {
  userName: "",
  status: "idel",
  error: "",
  position: {},
  address: "",
}


// So let's just quickly recap what we did here. So this time we used the Redux Toolkit way of creating a Thunk function. So we called this function right here
// where we passed in the action type name and so that's this one right here which we will never manually use, but still Redux needs this internally.
// And then as a second argument, we pass in the actual Thunk function, so the code that we want to execute as soon as this action here will be dispatched.
// Now what's special about this is that this createAsyncThunk will basically produce three additional action types. So one for depending promise state,
// one for the fulfilled state, and one for the rejected state. And so now we need to handle these cases separately back in our reducers and so this is how we then connect this Thunk
// with our reducers down here.

// And finally, let's add a case for a possible error. So for example, when the user doesn't accept geolocation.

const userSlice = createSlice({
name: "user",
initialState,

reducers:{
 updateName(state, action){//
    state.userName =  action.payload
  }
},
 
extraReducers: (builder) => builder
     .addCase(fetchAddress.pending, (state) => {
               state.status = 'loading'
          })
     .addCase(fetchAddress.fulfilled, (state, action)=>{
                state.position = action.payload.position;
                state.address = action.payload.address
                state.status='idel'
          })
     .addCase(fetchAddress.rejected, (state, action)=>{
                state.status = 'error';
                // state.error = action.error.message
                state.error = 'There was a problem getting your address. Make sure to fill this field!';
     })
})



export const {updateName} = userSlice.actions;

export default userSlice.reducer