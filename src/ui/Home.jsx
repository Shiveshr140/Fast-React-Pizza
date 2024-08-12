import { useSelector } from "react-redux";
import CreateUser from ".././features/users/CreateUser"
import Button from "./Button";

// function Home() {
//   return (
//     <div>
//       <h1>
//         The best pizza.
//         <br />
//         Straight out of the oven, straight to you.
//       </h1>
//     </div>
//   );
// }

// export default Home;



////*********************** Tailwind css

// function Home() {
//   return (
//     <div>
//       <h1 className="text-center text-xl font-semibold">
//         The best pizza.
//         <br />
//         <span className="text-yellow-500">
//         Straight out of the oven, straight to you.
//        </span>
//       </h1>
//     </div>
//   );
// }

// export default Home;



////********************** The Box Model: Spacing, Borders, and Display
// First of all add <CreatUser in Home.jsx /> and adjustment of styles
// mb-4 => 1rem, mx -> both left and right
// Go to header.jsx 

// function Home() {
//   return (
//     <div className="my-4 text-center">
//       <h1 className="text-xl font-semibold mb-8">
//         The best pizza.
//         <br />
//         <span className="text-yellow-500">
//         Straight out of the oven, straight to you.
//        </span>
//       </h1>
    
//         <CreateUser />

//     </div>
//   );
// }

// export default Home;



////********************************Responsive design 
// sm start with 640px, if we specify sm:my-16 then if screen width greater than 640px then this margin will apply.
//// Then go to CartOverview.jsx

// function Home() {
//   return (
//     <div className="my-10 px-4 sm:my-16 text-center">
//       <h1 className="mb-8 text-xl font-semibold md:text-3xl">
//         The best pizza.
//         <br />
//         <span className="text-yellow-500">
//         Straight out of the oven, straight to you.
//        </span>
//       </h1>
    
//         <CreateUser />

//     </div>
//   );
// }

// export default Home;



//// ************************************** Add redux

// And then if click the back <- in browser then we again have the form to write the name which looks bad to handle this
// go to Cart.jsx

function Home() {
  const userName = useSelector(state => state.user.userName)
  
  return (
    <div className="my-10 px-4 sm:my-16 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
       </span>
      </h1>
    
        {userName === ''? <CreateUser />: <Button to='/menu' type="primary">Continue odering, {userName}</Button>}

    </div>
  );
}

export default Home;