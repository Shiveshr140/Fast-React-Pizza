import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityById } from "./cartSlice";
import DeleteButton from "./DeleteButton";
import UpdateItemQuantity from "./UpdateItemQuantity";

// function CartItem({ item }) {
//   const { pizzaId, name, quantity, totalPrice } = item;

//   return (
//     <li className="py-3 sm:flex sm:items-center sm:justify-between">
//       <p className="mb-1 sm:mb-0">
//         {quantity}&times; {name}
//       </p>
//       <div className="flex items-center justify-between sm:gap-6 ">
//         <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
//         <Button type='small' > Delete </Button>
//       </div>
//     </li>
//   );
// }

// export default CartItem;





////******************************** Add redux
////*****************************

// Create reusable DeleteButton.jsx

// function CartItem({ item }) {
//   const { pizzaId, name, quantity, totalPrice } = item;

//   return (
//     <li className="py-3 sm:flex sm:items-center sm:justify-between">
//       <p className="mb-1 sm:mb-0">
//         {quantity}&times; {name}
//       </p>
//       <div className="flex items-center justify-between sm:gap-6 ">
//         <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

//        <UpdateItemQuantity pizzaId={pizzaId} />

//         <DeleteButton pizzaId={pizzaId}/>
//       </div>
//     </li>
//   );
// }

// export default CartItem;



////***************************** Updating Cart Quantities

// create UpdateItemQuantity.jsx
// MenuItem.jsx add updateElement

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6 ">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

       <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />

        <DeleteButton pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
