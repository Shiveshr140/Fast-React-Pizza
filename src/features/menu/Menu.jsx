import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem.jsx"

// function Menu() {
//   return <h1>Menu</h1>;
// }

// export default Menu;


////**********************  Fetching Data With React Router "Loaders": Pizza Menu
// The convention here is to just call this function a loader. And so then here, this function needs to fetch the data
// and then return it. Now, where are we actually going to get that data from? Well, that's where the restaurant service now comes into play.
// take look at apiRestaurant.js

// function Menu() {
//   return <h1>Menu</h1>;
// }

// export async function loader(){
//   const menu = await getMenu()
//   return menu
// }

// export default Menu;



////************************ receiving the data from the loader
//// First go to app.js  and complete step 2 provided this loader function to the menu route
// Now all we have to do is to get that data into the component. And so as I mentioned earlier, for that, we can use a custom hook, which is called useLoaderData.
// And here we don't have to pass in anything into the function because React Router will, of course, automatically know that the data that we want here is the one
// that is associated to this page. And so that's the data coming from this exact loader here.

// And so we successfully connected this loader function now to this page. And effectively what we just did here was to implement
// or to use a render as you fetch strategy because the nice thing about this is that React Router will actually start fetching the data
// at the same time as it starts rendering the correct route. So these things really happen at the same time, while what we did before using useEffect was always a fetch
// on render approach. So basically, we rendered the component first, and then after the component was already rendered is when we then would start to fetch the data.
// And so that would then createso-called data loading waterfalls, but not here. So here everything really happens at the same time,
// which is a really nice.


function Menu() {
  const menu = useLoaderData()
  // console.log(menu)  /// Now if you open network inside the inspection and checkfetch "/menu" u will see the fetch request is made
  return (
    <ul className="divide-y divide-stone-200 px-2 ">
      {menu.map(pizza=><MenuItem pizza={pizza} key={pizza.id}/>)}
    </ul>
  )
}

export async function loader(){
  const menu = await getMenu()
  return menu
}

export default Menu;




