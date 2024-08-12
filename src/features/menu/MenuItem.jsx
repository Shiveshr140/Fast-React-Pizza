import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

//// Now what we can do is to add a margin to the bottom to each of these gap items, right? However, there is a very handy class in Tailwind
// which is the divide class. So we can use the divide class on the parent element of these list items.
// In order to make sold out pizaa image little bit grey you have to do conditional styling

// function MenuItem({ pizza }) {
//   const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

//   return (
//     <li className="flex gap-4 py-2">
//       <img src={imageUrl} alt={name} className={`h-24 ${soldOut? 'opacity:70 grayscale' : ''}`}/>
//       <div className="flex flex-col">
//         <p className="font-medium">{name}</p>
//         <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
//         <div className="mt-auto">
//           {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : 
//           <p className="text-sm uppercase text-stone-500 font-medium">Sold out</p>}
//         </div>
//       </div>
//     </li>
//   );
// }

// export default MenuItem;



////***** Lets add buttom to add menu item to cart
// Add type in button bcs this button look so big

// function MenuItem({ pizza }) {
//   const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

//   return (
//     <li className="flex gap-4 py-2">
//       <img src={imageUrl} alt={name} className={`h-24 ${soldOut? 'opacity:70 grayscale' : ''}`}/>
//       <div className="flex flex-col grow pt-0.5">
//         <p className="font-medium">{name}</p>
//         <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        
//         {/* As items are not full streched use the flex-1/grow in tailwind in parent div above, what we need to do is to allow these flex items to grow as much as they can. */}
        
//         <div className="flex mt-auto items-center justify-between">
//           {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : 
//           <p className="text-sm uppercase text-stone-500 font-medium">Sold out</p>}

//           <Button type='small' to='/cart'> Add to cart </Button>

//         </div>
//       </div>
//     </li>
//   );
// }

// export default MenuItem;




////************************************** Add redux
////************************** Adding Menu Items to the Cart && Delete button 

// function MenuItem({ pizza }) {
//   const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
//   const dispatch = useDispatch()
//   const currentQuantity = useSelector(getCurrentQuantityById(id))
//   // console.log(currentQuantity)

//   const isInCart = currentQuantity > 0;

//   function handleAddToCart(){
//     const newItem = {
//       pizzaId: id,
//       name,
//       quantity: 1,
//       unitPrice,
//       totalPrice: unitPrice*1
//     }
//     dispatch(addItem(newItem))
//   }

//   return (
//     <li className="flex gap-4 py-2">
//       <img src={imageUrl} alt={name} className={`h-24 ${soldOut? 'opacity:70 grayscale' : ''}`}/>
//       <div className="flex flex-col grow pt-0.5">
//         <p className="font-medium">{name}</p>
//         <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        
//         {/* As items are not full streched use the flex-1/grow in tailwind in parent div above, what we need to do is to allow these flex items to grow as much as they can. */}
        
//         <div className="flex mt-auto items-center justify-between">
//           {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : 
//           <p className="text-sm uppercase text-stone-500 font-medium">Sold out</p>}

//            {isInCart && <DeleteButton pizzaId={id}/>}

//           {!soldOut && !isInCart && <Button type='small' onClick={handleAddToCart}> Add to cart </Button>}

//         </div>
//       </div>
//     </li>
//   );
// }

// export default MenuItem;




//// ********************* Add updateElement.jsx


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  // console.log(currentQuantity)

  const isInCart = currentQuantity > 0;

  function handleAddToCart(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice*1
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut? 'opacity:70 grayscale' : ''}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        
        {/* As items are not full streched use the flex-1/grow in tailwind in parent div above, what we need to do is to allow these flex items to grow as much as they can. */}
        
        <div className="flex mt-auto items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : 
          <p className="text-sm uppercase text-stone-500 font-medium">Sold out</p>}

           {isInCart && <div className="flex items-center gap-3 sm:gap-8"> 
                 <UpdateItemQuantity currentQuantity={currentQuantity} pizzaId={id} />
                 <DeleteButton pizzaId={id} />
                </div>}

          {!soldOut && !isInCart && <Button type='small' onClick={handleAddToCart}> Add to cart </Button>}

        </div>
      </div>
    </li>
  );
}

export default MenuItem;