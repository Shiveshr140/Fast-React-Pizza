import React from 'react'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

// function AppLayout() {

//   return (
//     <div>
//       <Header />

//      <main>
//         <Outlet /> 
//      </main>
      
//       <CartOverview />

//     </div>
//   )
// }

// export default AppLayout



 ////*************************************** Displaying a Loading Indicator
 //// add temprory class layout

// function AppLayout() {
//   const navigation = useNavigation()
//   // console.log(navigation) // click back menu in "/cart" page u will see state changes from loading to idle 
//   const isLoading = navigation.state === 'loading'
//   return (
//     <div className='layout'>
//       {isLoading && <Loader />}
//       <Header />
//      <main>
//         <Outlet /> 
//      </main>
      
//       <CartOverview />

//     </div>
//   )
// }

// export default AppLayout



//// ***************************** Tailwind CSS: Css grid
// So basically what we want to do is to set up a grid which contains three rows for the layout. So one row here for the header, one for this content,
// and one for this card overview. The goal of that is that we can then easily push this overview here all the way to the bottom of the screen.
// start with giving Height, grid-rows-auto fit to content every row, customization grid-rows-[auto_1fr_auto]
// h-screen -> full width

// for order/new, to center the container you need to give some width, situation where you want fluid design just give max-width, and give left, right margin auto or mx-auto

function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      
      {isLoading && <Loader />}
      {/* {true && <Loader /> this was for styling}  */}
      
      <Header />
     <div className='overflow-scroll'>
        <main className='max-w-3xl mx-auto'>
        <Outlet /> 
        </main>
     </div>
      
      <CartOverview />

    </div>
  )
}

export default AppLayout