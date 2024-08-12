import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/orders/SearchOrder'
import UserName from '../features/users/UserName'

// function Header() {
//   return (
//     <header>
//         <Link to='/' > React Fast Pizza Co. </Link> 
//     </header>
//   )
// }

// export default Header


////********************* Fetch orders

// function Header() {
//   return (
//     <header>
//         <Link to='/' > React Fast Pizza Co. </Link> 
//         <SearchOrder />
//         <p>Shivesh Rajput</p>
//     </header>
//   )
// }

// export default Header


////****************************** Tailwind CSS 
// After this go to CartOverview.jsx
// If you want more letter spacing u can give artibary value "tracking-[5px/1rem]" this can be for anything else such as text-[10px]
// for name create UserName.jsx in user
// for border First, we write border then enter direction and then width/not necessasery => "border-b-2/border-b...", "border-color-intensity"

// function Header() {
//   return (
//     <header className='bg-yellow-500 uppercase px-4 py-3 border-b-2 border-stone-200 sm:px-6'>
//         <Link to='/' className='tracking-widest' > React Fast Pizza Co. </Link> 
//         <SearchOrder />
//         <UserName />
//     </header>
//   )
// }

// export default Header


////************************** Flex box
// Go to UserName.jsx

function Header() {
  return (
    <header className='flex items-center justify-between bg-yellow-400 uppercase px-4 py-3 border-b-2 border-stone-200 sm:px-6'>
        <Link to='/' className='tracking-widest' > Fast React Pizza Co. </Link> 
        <SearchOrder />
        <UserName />
    </header>
  )
}

export default Header



