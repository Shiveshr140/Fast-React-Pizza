import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store.jsx"
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../users/userSlice.js";

// // https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   // const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div>
//       <h2>Ready to order? Let's go!</h2>

//       <form>
//         <div>
//           <label>First Name</label>
//           <input type="text" name="customer" required />
//         </div>

//         <div>
//           <label>Phone number</label>
//           <div>
//             <input type="tel" name="phone" required />
//           </div>
//         </div>

//         <div>
//           <label>Address</label>
//           <div>
//             <input type="text" name="address" required />
//           </div>
//         </div>

//         <div>
//           <input
//             type="checkbox"
//             name="priority"
//             id="priority"
//             // value={withPriority}
//             // onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           <button>Order now</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateOrder;




/////************************************ Writing Data With React Router "Actions"

// Now, we don't have that cart yet, but we still want to already learn how to create a new order using these actions and forms.
// And therefore, for now, we are just going to use this fake cart object.
// Form is comming from "react-router-dom" we can do POST, DELETE or PATCH but not GET, And here we do not need to specify the action bcs by default react will simply match the closest route

//Now, this on its own doesn't do anything yet, and so now we need to specify, or we need to create an action. And so this is similar to the loaders/
// that we created earlier. So again, whenever this form here will be submitted, behind the scenes, React Router will then call
// this action function and it will pass in the request that was submitted. And so here we can then get access to that.
// Go to app.jsx to connect it routes

// So notice how this entire form right here works completely without any JavaScript and without any onSubmit handlers, for example.
// So all we have is this form here, and then React Router takes care of the rest. We also didn't have to create any state variables here
// for each of these input fields, and we didn't even have to create a loading state. So React Router will do all of this automatically

// Now, thankfully for us, there is a nice way of actually getting some data into the action without it being a form field.
// So what we can do is a hidden input. So we can do that anywhere in the form, but let's just do it here at the very end. So if we set it to type hidden, and the name to cart,
// and the value to JSON.stringify, because this cart is right now an object, but here we can only have strings. So we need to convert this to a string here.

//// Now we can create a new order so that I can show you that this createOrder function actually returns the newly created object.
// So the new order is actually returned. And so the nice thing about that is that we can now await that here. So we can call this here newOrder.
// And then what we will want to do is to immediately redirect the page to the order/ID. So basically showing the user all the information
// about that new order. o let's do that here, but we cannot do it using the navigate function, because the navigate function
// comes from calling the useNavigate hook, but we cannot call hooks inside this function. So hooks can only be called inside components.
// And so here we need to use another function, which is called redirect. So this is basically another function that is provided to us
// by React Router, which basically will just create a new response or a new request.

//// Lets test it with newOrder it might take some time few secs and also copy the id and paste it order search input check if it works
// And so once again, this is really, really an amazing pattern for doing data manipulation and also for writing new data simply using these actions
// and React Router's form component.

//// Also make the button disabled/abled based on submitting with the help of useNavigation

// https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   const navigation = useNavigation()
//   const isSubmitting = navigation.state ==='submitting'
//   // const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div>
//       <h2>Ready to order? Let's go!</h2>

//       <Form method="POST">
//         <div>
//           <label>First Name</label>
//           <input type="text" name="customer" required />
//         </div>

//         <div>
//           <label>Phone number</label>
//           <div>
//             <input type="tel" name="phone" required />
//           </div>
//         </div>

//         <div>
//           <label>Address</label>
//           <div>
//             <input type="text" name="address" required />
//           </div>
//         </div>

//         <div>
//           <input
//             type="checkbox"
//             name="priority"
//             id="priority"
//             // value={withPriority}
//             // onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           {/* Add input here to receive the data */}
//           <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <button disabled={isSubmitting}>{isSubmitting ? 'Placing order...': 'Order now'}</button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// //// This formData is provided by browser and go and connect it to routes
// //// Convert this formData which is a complex object into plain Javascript object which is easy to work

// // export async function action({request}){
// //     const formData = await request.formData()
// //     const data = Object.fromEntries(formData)
// //     console.log(data)
// //     return null;
// // }

// //// And of course the cart also needs to be converted back to an object.
// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log('data', data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),  // Convert back to an object
//     priority: data.priority === 'on',
//   };

//   // console.log(order);

//   const newOrder = await createOrder(order)
  
//   // return null;
//   return redirect(`/order/${newOrder.id}`)
// }

// export default CreateOrder;




////***************************************** Error Handling in Form Actions 

// So at error handling, what I mean, is that there might happen some errors while this form is being submitted.
// So for example, the phone number might be this. So this will then still pass the required filter here basically, but it is not in the shape that we want.
// So this is not a valid phone number. And so we can now check this phone number.
// And so we can now check this phone number right here in our action. And if it's not correct, we can then basically tell our form
// that there is an error right here in this field.

// Remember this createOrder component is wired up to the action , so component has the access to the data that is returns from the action.
// So it is yet another custom hook that we are going to need here. And so let's call the result of this one here formErrors and then useActionData. (keyboard clacking)
// Just like this. And notice that it's not called something like useActionErrors. So it's really for any data. But the most common use case of this hook
// is to actually do what we are doing right now. So to return some errors that we can then display right here in the user interface.

// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   const navigation = useNavigation()
//   const isSubmitting = navigation.state ==='submitting'

//   const formErrors = useActionData()
//   // const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div>
//       <h2>Ready to order? Let's go!</h2>

//       <Form method="POST">
//         <div>
//           <label>First Name</label>
//           <input type="text" name="customer" required />
//         </div>

//         <div>
//           <label>Phone number</label>
//           <div>
//             <input type="tel" name="phone" required />
//             {formErrors?.phone && <p>{formErrors.phone}</p>}
//           </div>
//         </div>

//         <div>
//           <label>Address</label>
//           <div>
//             <input type="text" name="address" required />
//           </div>
//         </div>

//         <div>
//           <input
//             type="checkbox"
//             name="priority"
//             id="priority"
//             // value={withPriority}
//             // onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           {/* Add input here to receive the data */}
//           <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <button disabled={isSubmitting}>{isSubmitting ? 'Placing order...': 'Order now'}</button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// //// This formData is provided by browser and go and connect it to routes
// //// Convert this formData which is a complex object into plain Javascript object which is easy to work

// //// And of course the cart also needs to be converted back to an object.
// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log('data', data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),  // Convert back to an object
//     priority: data.priority === 'on',
//   };

//   const errors = {}
//   if(!isValidPhone(order.phone))
//     errors.phone = "Please give us your correct contact number. We might need it to contact you."

//   if(Object.keys(errors).length > 0) return errors;

//   // if everything is fine then create a new order
//   const newOrder = await createOrder(order)
//   return redirect(`/order/${newOrder.id}`)
// }

// export default CreateOrder;




////********************************* Tailwind CSS
// styling the button
// So in order to remove that ugly focus there, we can do "focus," so the focus state, and then here, "outline-none." However, we cannot just leave it like this
// because this will create some accessibility issues. And so we need to do something else. So in this focus state, instead of having this outline,
// we can use something that Tailwind created, which is what they call a ring. So a ring, as we can see here, is basically some shadows
// that they will place outside the element. So this creates this ring. And then we also need to define the color of the ring.
// So again, that's within the focus state. So all of this should only happen when the element is focused, and so we need to prefix all of this
// always with this "focus" word.

// After styling SearchOrder input
// Styling input

// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   const navigation = useNavigation()
//   const isSubmitting = navigation.state ==='submitting'

//   const formErrors = useActionData()
//   // const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div>
//       <h2>Ready to order? Let's go!</h2>

//       <Form method="POST">
//         <div>
//           <label>First Name</label>
//           <input type="text" name="customer" required />
//         </div>

//         <div>
//           <label>Phone number</label>
//           <div>
//             <input type="tel" name="phone" required />
//             {formErrors?.phone && <p>{formErrors.phone}</p>}
//           </div>
//         </div>

//         <div>
//           <label>Address</label>
//           <div>
//             <input type="text" name="address" required 
//                     className="w-full rounded-full px-4 py-2 border border-stone-200 text-sm transition-all duration-300
//                                 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
//             />
//           </div>
//         </div>

//         <div>
//           {/* as focus-ring color and accent color are same we need some spacing so use the offset */}
//           <input
//             className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
//             type="checkbox"
//             name="priority"
//             id="priority"
//             // value={withPriority}
//             // onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           {/* Add input here to receive the data */}
//           <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <button disabled={isSubmitting} 
//                 className="inline-block rounded-full font-semibold text-stone-800 tracking-wide uppercase 
//                           bg-yellow-500 px-4 py-3 hover:bg-yellow-300 transition-colors duration-300
//                           focus:outline-none focus:bg-yellow-300 focus:ring  focus:ring-offset-2 focus:ring-yellow-300
//                           disabled:cursor-not-allowed">
            
//             {isSubmitting ? 'Placing order...': 'Order now'}
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }


// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log('data', data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),  // Convert back to an object
//     priority: data.priority === 'on',
//   };

//   const errors = {}
//   if(!isValidPhone(order.phone))
//     errors.phone = "Please give us your correct contact number. We might need it to contact you."

//   if(Object.keys(errors).length > 0) return errors;

//   // if everything is fine then create a new order
//   const newOrder = await createOrder(order)
//   return redirect(`/order/${newOrder.id}`)
// }

// export default CreateOrder;




////************************************ Resusing the style with @apply && Reusing the styles with React Component
//// We will create @apply in Index.css
// Using React componenet we will make button reusable by creating Button.jsx Component in ui.

// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   const navigation = useNavigation()
//   const isSubmitting = navigation.state ==='submitting'

//   const formErrors = useActionData()
//   // const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div className="px-4 py-6">
//       <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

//       <Form method="POST">
//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">First Name</label>
//           <input  className="input grow" type="text" name="customer" required />
//         </div>

//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">Phone number</label>
//           <div className="grow">
//             <input className="input w-full" type="tel" name="phone" required />
//             {formErrors?.phone && <p className="mt-2 p-2 rounded-md text-xs text-red-700 bg-red-100">{formErrors.phone}</p>}
//           </div>
//         </div>

//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">Address</label>
//           <div className="grow">
//             <input className="input w-full" type="text" name="address" required />
//           </div>
//         </div>

//         <div className="mb-12 flex items-center gap-5 ">
//           {/* as focus-ring color and accent color are same we need some spacing so use the offset */}
//           <input
//             className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
//             type="checkbox"
//             name="priority"
//             id="priority"
//             // value={withPriority}
//             // onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label className="font-semibold" htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           {/* Add input here to receive the data */}
//           <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <Button type='primary' disabled={isSubmitting}>
//             {isSubmitting ? 'Placing order...': 'Order now'}
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }


// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log('data', data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),  // Convert back to an object
//     priority: data.priority === 'on',
//   };

//   const errors = {}
//   if(!isValidPhone(order.phone))
//     errors.phone = "Please give us your correct contact number. We might need it to contact you."

//   if(Object.keys(errors).length > 0) return errors;

//   //// if everything is fine then create a new order
//   // const newOrder = await createOrder(order)
//   // return redirect(`/order/${newOrder.id}`)
//   return null;
// }

// export default CreateOrder;





////****************************************** Adding redux
/// Now to prepoplating the input fields we can not use value attribute because when the user start typing it will not change
// We we will use less commonly use atrr. defaultValue

// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

// function CreateOrder() {
//   const navigation = useNavigation()
//   const isSubmitting = navigation.state ==='submitting'
//   const userName = useSelector(state => state.user.userName)

//   const formErrors = useActionData()
//   // const [withPriority, setWithPriority] = useState(false);
//   const cart = fakeCart;

//   return (
//     <div className="px-4 py-6">
//       <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

//       <Form method="POST">
//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">First Name</label>
//           <input  className="input grow" type="text" name="customer" defaultValue={userName} required />
//         </div>

//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">Phone number</label>
//           <div className="grow">
//             <input className="input w-full" type="tel" name="phone" required />
//             {formErrors?.phone && <p className="mt-2 p-2 rounded-md text-xs text-red-700 bg-red-100">{formErrors.phone}</p>}
//           </div>
//         </div>

//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">Address</label>
//           <div className="grow">
//             <input className="input w-full" type="text" name="address" required />
//           </div>
//         </div>

//         <div className="mb-12 flex items-center gap-5 ">
//           {/* as focus-ring color and accent color are same we need some spacing so use the offset */}
//           <input
//             className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
//             type="checkbox"
//             name="priority"
//             id="priority"
//             // value={withPriority}
//             // onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label className="font-semibold" htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           {/* Add input here to receive the data */}
//           <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <Button type='primary' disabled={isSubmitting}>
//             {isSubmitting ? 'Placing order...': 'Order now'}
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }


// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log('data', data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),  // Convert back to an object
//     priority: data.priority === 'on',
//   };

//   const errors = {}
//   if(!isValidPhone(order.phone))
//     errors.phone = "Please give us your correct contact number. We might need it to contact you."

//   if(Object.keys(errors).length > 0) return errors;

//   //// if everything is fine then create a new order
//   // const newOrder = await createOrder(order)
//   // return redirect(`/order/${newOrder.id}`)
//   return null;
// }

// export default CreateOrder;






////************************************** Using the Cart for New Orders
// geting pizza from the cart

// Now you might have noticed a small problem which is that we still have the pizzas in our cart. So that shouldn't be happening, right?
// So usually after you place an order, then your cart gets automatically emptied out. And so let's implement that here as well,
// even though it is not going to be super easy. So we will have to use some kind of hack here again because clearly the dispatching of the clear cart action
// will need to happen right here inside this form action. However, for dispatching, we need to call the use dispatch hook, which is only available in components
// and not in a regular function like this one. So the hack that we can use and which we should really, really not overuse is to directly import the store object here
// into this function and then dispatch directly on that store.

// But really don't overuse this technique because it deactivates a couple of performance optimizations of Redux on this page.

// finally show total price in the order now button, and make true instead of on in action function

// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );



// function CreateOrder() {
//   const [withPriority, setWithPriority] = useState(false);
//   const navigation = useNavigation()
//   const isSubmitting = navigation.state ==='submitting'
//   const userName = useSelector(state => state.user.userName)
  

//   const formErrors = useActionData()
//   const cart= useSelector(getCart)

//   const totalCartPrice = useSelector(getTotalCartPrice)
//   const priorityPrice = withPriority ? totalCartPrice*0.2 : 0
//   const totalPrice = totalCartPrice + priorityPrice

//   if(!cart.length) return <EmptyCart />

//   return (
//     <div className="px-4 py-6">
//       <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

//       <Form method="POST">
//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">First Name</label>
//           <input  className="input grow" type="text" name="customer" defaultValue={userName} required />
//         </div>

//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">Phone number</label>
//           <div className="grow">
//             <input className="input w-full" type="tel" name="phone" required />
//             {formErrors?.phone && <p className="mt-2 p-2 rounded-md text-xs text-red-700 bg-red-100">{formErrors.phone}</p>}
//           </div>
//         </div>

//         <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
//           <label className="sm:basis-40">Address</label>
//           <div className="grow">
//             <input className="input w-full" type="text" name="address" required />
//           </div>
//         </div>

//         <div className="mb-12 flex items-center gap-5 ">
//           {/* as focus-ring color and accent color are same we need some spacing so use the offset */}
//           <input
//             className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
//             type="checkbox"
//             name="priority"
//             id="priority"
//             value={withPriority}
//             onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label className="font-semibold" htmlFor="priority">Want to yo give your order priority?</label>
//         </div>

//         <div>
//           {/* Add input here to receive the data */}
//           <input  type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <Button type='primary' disabled={isSubmitting}>
//             {isSubmitting ? 'Placing order...': `Order now for ${formatCurrency(totalPrice)}`}
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }


// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log('data', data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),  // Convert back to an object
//     priority: data.priority === 'true',
//   };

//   const errors = {}
//   if(!isValidPhone(order.phone))
//     errors.phone = "Please give us your correct contact number. We might need it to contact you."

//   if(Object.keys(errors).length > 0) return errors;

//   //// if everything is fine then create a new order
//   const newOrder = await createOrder(order)

//   store.dispatch(clearCart())

//   return redirect(`/order/${newOrder.id}`)
  
// }

// export default CreateOrder;




////***************************** Redux Thunks With createAsyncThunk
// Lets add get position button
// so let's just wrap it into a span. So that's no problem at all. And so here we need to position this absolutely. For this, we just use Tailwind's absolute class.
// But for that, we then need to make the closest parent relatively positioned, so with position 'relative.'
// As we are using this button right inside the form so we need to use prevent deafault bcs if we click it then its goona submit the form

// Also need to get this data then here into our form action. So right here in the form action, when we submit the new order, we will also want to submit it
// with the actual position data, so with the user's GPS location, because that's going to be really important or really helpful for the company to deliver the pizza.
// And so let's use the same trick that we used here for the cart.

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;