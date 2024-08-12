import { useState } from 'react';
import Button from '../../ui/Button';
import { updateName } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// function CreateUser() {
//   const [username, setUsername] = useState('');

//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <p className='mb-4 text-sm text-stone-600 md:text-base'>
//         👋 Welcome! Please start by telling us your name:
//       </p>

//       <input
//         type="text"
//         placeholder="Your full name"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className='w-72'
//       />

//       {username !== '' && (
//         <div>
//           <button>Start ordering</button>
//         </div>
//       )}
//     </form>
//   );
// }

// export default CreateUser;



////***************  Reusing the styles and create Button

// function CreateUser() {
//   const [username, setUsername] = useState('');

//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <p className='mb-4 text-sm text-stone-600 md:text-base'>
//         👋 Welcome! Please start by telling us your name:
//       </p>

//       <input
//         type="text"
//         placeholder="Your full name"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className='w-72 mb-8 input'
//       />

//       {username !== '' && (
//         <div>
//           <Button type='primary'>Start ordering</Button>
//         </div>
//       )}
//     </form>
//   );
// }

// export default CreateUser;




//// ***************************************** Add redux, Reading and Updating the User State
// So do you remember how we update the state inside Redux? Well, we update Redux state by dispatching an action to our reducer here,
// and we do that by using the action creator that was automatically created by the create slice function.
// We Generally do not update the redux store directly specially incase of input field what I means wher I start typing it should not be updtating redux store at the same time thats the bad practice 
// So what we want is to update after we click the submit button or enter thats why we dispatch action in handleSubmit function.

// Go to Home.jsx


function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return
    dispatch(updateName(username))
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-72 mb-8 input'
      />

      {username !== '' && (
        <div>
          <Button type='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;