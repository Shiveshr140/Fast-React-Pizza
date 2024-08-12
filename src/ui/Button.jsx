import React from 'react'
import { Link } from 'react-router-dom'

// function Button({children, disabled, to}) {
 
//   const className = `inline-block rounded-full font-semibold text-stone-800 tracking-wide uppercase 
//                     bg-yellow-500 px-4 py-3 hover:bg-yellow-300 transition-colors duration-300
//                     focus:outline-none focus:bg-yellow-300 focus:ring  focus:ring-offset-2
//                     focus:ring-yellow-300 disabled:cursor-not-allowed sm:px-6 sm:py-4`

//  if(to) return <Link to={to} className={className}>{children}</Link>
//   return (
//     <button to = {to} disabled={disabled} className={className}  >
//         {children}
//     </button>
//   )
// }

// export default Button


////************************* Add type && onClick

function Button({children, disabled, to, type, onClick}) {
 
 const base = `inline-block text-sm rounded-full font-semibold text-stone-800 tracking-wide uppercase 
                bg-yellow-500 hover:bg-yellow-300 transition-colors duration-300
                focus:outline-none focus:bg-yellow-300 focus:ring  focus:ring-offset-2
                focus:ring-yellow-300 disabled:cursor-not-allowed`

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' text-xs px-5 py-2 md:px-5 md:py-2.5',
    round: base + ' text-sm px-2.5 py-1 md:px-3.5 md:py-2' ,
    secondary: `inline-block text-sm rounded-full font-semibold text-stone-400 tracking-wide uppercase 
                 border-2 border-stone-200 hover:text-stone-800 hover:bg-stone-300 transition-colors duration-300
                focus:text-stone-800 focus:outline-none focus:bg-stone-300 focus:ring  focus:ring-offset-2
                focus:ring-stone-200 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5`

  }

 if(to) return <Link to={to} className={styles[type]}>{children}</Link>
  
 if(onClick){
  return (
    <button to = {to} disabled={disabled} onClick={onClick} className={styles[type]}  >
        {children}
    </button>
  )
 }

  return (
    <button to = {to} disabled={disabled} className={styles[type]}  >
        {children}
    </button>
  )
}

export default Button