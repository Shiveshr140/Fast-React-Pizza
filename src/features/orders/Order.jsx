import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

//// Test ID: IIDSAT

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

// function Order() {
//   // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
//   const {
//     // id,
//     status,
//     priority,
//     priorityPrice,
//     orderPrice,
//     estimatedDelivery,
//     // cart,
//   } = order;
//   const deliveryIn = calcMinutesLeft(estimatedDelivery);

//   return (
//     <div>
//       <div>
//         <h2>Status</h2>

//         <div>
//           {priority && <span>Priority</span>}
//           <span>{status} order</span>
//         </div>
//       </div>

//       <div>
//         <p>
//           {deliveryIn >= 0
//             ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
//             : "Order should have arrived"}
//         </p>
//         <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
//       </div>

//       <div>
//         <p>Price pizza: {formatCurrency(orderPrice)}</p>
//         {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
//         <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
//       </div>
//     </div>
//   );
// }

// export default Order;


////****************************** Fetch orders
//// Now do the same as we did in menu add Loader here it will receive the Id
//// use the test id to check if its working
//// Get the data from loader now you are getting data from an api

// //// Test ID: IIDSAT, CQE92U


// function Order() {
//   const order = useLoaderData()
//   // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
//   const {
//     id,
//     status,
//     priority,
//     priorityPrice,
//     orderPrice,
//     estimatedDelivery,
//     cart,
//   } = order;
//   const deliveryIn = calcMinutesLeft(estimatedDelivery);

//   return (
//     <div>
//       <div>
//         <h2>Status</h2>

//         <div>
//           {priority && <span>Priority</span>}
//           <span>{status} order</span>
//         </div>
//       </div>

//       <div>
//         <p>
//           {deliveryIn >= 0
//             ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
//             : "Order should have arrived"}
//         </p>
//         <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
//       </div>

//       <div>
//         <p>Price pizza: {formatCurrency(orderPrice)}</p>
//         {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
//         <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
//       </div>
//     </div>
//   );
// }

// //// As Id is coming from url but we can not use urlParams out side the component as it is a hook but react router has params object to hanle this.

// export async function loader({ params }) {
//   const order = await getOrder(params.orderId);
//   return order;
// }



// export default Order;




////*********************************** Styling

//// Test ID: IIDSAT, CQE92U

//// flex-wrap, Which is to basically allow the flex items to wrap onto a new line in case of less space. So that we do with flex wrap which translates exactly to flex wrap, set to wrap.
//// use tracking wide when we have uppercase

function Order() {
  const order = useLoaderData()
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full text-sm font-semibold 
                         uppercase tracking-wide text-red-50 px-3 py-1 bg-red-500">
                          Priority
                      </span>}
          <span className="rounded-full text-sm font-semibold 
                         uppercase tracking-wide text-green-50 px-3 py-1 bg-green-500">
                          {status} order
                          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map(item => <OrderItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className="space-y-2 px-6 py-5 bg-stone-200">
        <p className="text-sm font-medium text-stone-500">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-500">
                     Price priority: {formatCurrency(priorityPrice)}
                    </p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

//// As Id is coming from url but we can not use urlParams out side the component as it is a hook but react router has params object to hanle this.

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}



export default Order;