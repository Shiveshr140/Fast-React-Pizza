import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

// function CartOverview() {
//   return (
//     <div >
//       <p>
//         <span>23 pizzas</span>
//         <span>$23.45</span>
//       </p>
//       <Link to="/cart">Open cart &rarr;</Link>
//     </div>
//   );
// }

// export default CartOverview;



//// ***************************** Tailwind Css
// after this go to Home.jsx

// function CartOverview() {
//   return (
//     <div className="bg-stone-800 text-stone-200 uppercase">
//       <p className="text-stone-300">
//         <span>23 pizzas</span>
//         <span>$23.45</span>
//       </p>
//       <Link to="/cart">Open cart &rarr;</Link>
//     </div>
//   );
// }

// export default CartOverview;


////************************  The Box Model: Spacing, Borders, and Display && Responsvive design
// now staying again on the topic of spacing. Tailwind actually includes a very, very nice and helpful class, which allows us to add spacing
// between elements in a very easy way. So without, for example, having to use any flex box tricks. So the way that works, and let's say we wanted some space
// between these elements here, is that on the parent you simply use space, then the direction. So X for horizontal and Y for vertical,
// and then the amount again.

// After responsive design go CreateUser.jsx

// function CartOverview() {
//   return (
//     <div className=" bg-stone-800 text-stone-200 text-sm uppercase px-4 py-4 sm:px-6 md:text-base">
//       <p className="space-x-4 text-stone-300 sm:space-x-6">
//         <span>23 pizzas</span>
//         <span>$23.45</span>
//       </p>
//       <Link to="/cart">Open cart &rarr;</Link>
//     </div>
//   );
// }

// export default CartOverview;


////********************************** Flex Box
// Go to header.jsx

// function CartOverview() {
//   return (
//     <div className="flex items-center justify-between bg-stone-800 text-stone-200 text-sm uppercase px-4 py-4 sm:px-6 md:text-base">
//       <p className="space-x-4 text-stone-300 sm:space-x-6">
//         <span>23 pizzas</span>
//         <span>$23.45</span>
//       </p>
//       <Link to="/cart">Open cart &rarr;</Link>
//     </div>
//   );
// }

// export default CartOverview;



////******************************************************* Add Redux
////************************************* Building the Cart Overview With Redux Selectors

// So Redux actually recommends that we do this kind of data manipulation that we just did here. So selecting the cart, and then immediately calculating the value that we want
// right inside the selector function and not out here in a component.

// However, Redux, again, recommends to take this function here and actually place it right into the cart slice file.

// And the recommendation and the standard is that these functions start with the get keyword and that we have them all in the central place
// in the cart slice file because we will actually need this operation later on in another component.

// If there are no pizzas then we do not to show the cartoverview


function CartOverview() {
  // const totalCartQuantity = useSelector(state => {
  //       return state.cart.cart.reduce((sum, item)=>{
  //         return sum + item.quantity
  //       },0)
  // })

  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if(!totalCartQuantity) return null

  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 text-sm uppercase px-4 py-4 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
