import React from 'react'

// function Loader() {
//   return (
//     <div className='loader'> </div>
//   )
// }

// export default Loader


////**********************  Adding Error
// But now let's try something else, which is to basically create an error in a loader and the way we can do that is by simply basically changing
// this URL(apiRestaurant.js) here or let's try something else like here.

// function Loader() {
//   return (
//     <div className='loader'> </div>
//   )
// }

// export default Loader




////************************** Absolute Positioning, z-index, and More
// So first of all go to AppLayout.jsx and replace  isloading true.

// So, what we want with this loader is that it basically will cover the entire page here, sitting kind of in the middle here.
// So, on top of everything else, and also adding a small background blur. So, the way we can achieve this with CSS is to basically add one parent element around this loader here,
// and then absolutely position that element here in this top left corner and making it so that it occupies the entire page.

// absolute will make it top of everything, give it some back-graound color, inorder to stech it make top,bottom corners set to 0 which can be done using inset-0
// give some opacity just to show background blur i.e /20 say, et's add a really nice background blur.
// So, this we can achieve with backdrop blur, Now, all we have to do is to center this here in the middle, which is a piece of cake, using Flexbox.

// Now change the color of this loader for that we already have class loader in index.css we can integrate it with tailwind 

function Loader() {
  return (
    <div className='absolute flex items-center justify-center bg-slate-200/10 inset-0 backdrop-blur-sm '>
      <div className='loader'> </div>
    </div>
  )
}

export default Loader