import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';


//***************************** Tailwind CSS
// Go to CreateOrder.jsx

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function Cart() {
//   const cart = fakeCart;

//   return (
//     <div>
//       <Link to="/menu" className='text-sm text-blue-500 hover:text-blue-600 hover:underline'>
//         &larr; Back to menu
//       </Link>

//       <h2>Your cart, %NAME%</h2>

//       <div>
//         <Link to="/order/new">Order pizzas</Link>
//         <button>Clear cart</button>
//       </div>
//     </div>
//   );
// }

// export default Cart;



////********************  Reuse the style with help of React Component
// Reuse the link, make order new a button



// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function Cart() {
//   const cart = fakeCart;

//   return (
//     <div >
//       <LinkButton to="/menu">
//         &larr; Back to menu
//       </LinkButton>

//       <h2>Your cart, %NAME%</h2>

//       <div>
//         <Button  type='primary' to="/order/new">Order pizzas</Button>
//         <button>Clear cart</button>
//       </div>
//     </div>
//   );
// }

// export default Cart;


//////***************************  Style the cart completely and display fake cart

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function Cart() {
//   const cart = fakeCart;

//   return (
//     <div className='px-4 py-3'>
//       <LinkButton to="/menu">
//         &larr; Back to menu
//       </LinkButton>

//       <h2 className='mt-7 text-xl font-semibold'>Your cart, %NAME%</h2>
   
//       <ul className='divide-y divide-stone-200 border-b mt-3'>
//          {cart.map(item => <CartItem item={item} key={item.key}/>)}
//       </ul>

//       <div className='mt-6 space-x-2'>
//         <Button  type='primary' to="/order/new">Order pizzas</Button>
//         <Button type='secondary'>Clear cart</Button>
//       </div>
//     </div>
//   );
// }

// export default Cart;





////*************************************************  Add redux
/// Remove the fake cart
///One of the biggest advantage of this slector functions is that suppose we change the cart structure then we do not have to make chenges all over the place in our application

/// Style this emptycart.jsx

function Cart() {
  const cart = useSelector(getCart);
  const userName = useSelector(state => state.user.userName)
  const dispatch = useDispatch()

  if(!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>
   
      <ul className='divide-y divide-stone-200 border-b mt-3'>
         {cart.map(item => <CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button  type='primary' to="/order/new">Order pizzas</Button>
        <Button type='secondary' onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;