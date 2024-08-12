import React from 'react'
import { useSelector } from 'react-redux'

//// hidden will hide the username for small screen
// function UserName() {
//   return (
//     <div className='hidden text-sm font-semibold md:block'>Shivesh Rajput</div>
//   )
// }

// export default UserName;



//// *********************** Add redux 

function UserName() {
  const userName = useSelector(state => state.user.userName)

  if(!userName) return null;

  return (
    <div className='hidden text-sm font-semibold md:block'>{userName}</div>
  )
}

export default UserName;

