import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/// trick for just submit by hitting enter wrap input inside the form element
// So, next up what we need to do is to then actually fetch the data from the API. So, using this getOrder function that we already have
// which will receive exactly that ID right there. Okay, so this one is finished.
// And so, let's now work here on the order.jsx.

// function SearchOrder() {
//     const [query, setQuery] = useState("")
//     const navigate = useNavigate()

//     const handleSubmit = (e)=>{
//         e.preventDefault()
//         if(!query) return;
//         navigate(`/order/${query}`)
//         setQuery("")
//     }

//   return (
//     <form onSubmit={handleSubmit}>
//         <input placeholder='Search order #' value={query} onChange={(e)=>setQuery(e.target.value)}   />
//     </form>
//   )
// }

// export default SearchOrder



////***************************** Tailwind Css

/// trick for just submit by hitting enter wrap input inside the form element
// So, next up what we need to do is to then actually fetch the data from the API. So, using this getOrder function that we already have
// which will receive exactly that ID right there. Okay, so this one is finished.
// And so, let's now work here on the order.jsx.

function SearchOrder() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
      e.preventDefault()
      if(!query) return;
      navigate(`/order/${query}`)
      setQuery("")
  }

return (
  <form onSubmit={handleSubmit}>
      <input placeholder='Search order #' 
         className='w-28 rounded-full text-sm px-4 py-2 bg-yellow-100 placeholder:text-stone-400 
                     transition-all duration-300 focus:outline-none focus:ring 
                   focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72 '
         value={query} onChange={(e)=>setQuery(e.target.value)}   />
  </form>
)
}

export default SearchOrder