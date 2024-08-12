// npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './ui/Home'
import Error from './ui/Error'
import Menu, {loader as menuLoader} from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder, {action as createOrderAction} from "./features/orders/CreateOrder"
import Order, {loader as orderLoader} from "./features/orders/Order"
import AppLayout from "./ui/AppLayout"

///************************ Application planing(Refer to pdf)
////*********************** Structure your application

////********************* Different way of implementing routing using React-Routing 6.4 version
// So React version 6.4 introduced a whole new way of defining routes and of working with React Router. So from now on we can use some powerful mechanisms
// inside React Router for fetching data into pages and for submitting data using forms, so all within React Router.
// npm i react-router-dom@6
// if you want to work with data fetching in React Router, you are most likely going to need createBrowserRoute. Okay, so let's actually use that function
// outside the component here, so createBrowserRouter.

/// It accepts an array and we will use it inside our app component so let's return, and then here, again, a new component which is called RouterProvider.
// So this one right here. And so then this one takes a prop where we pass in that router that we just created.

// Remember that there we declare routes in this declarative way. So we use the really the BrowserRouter component and Routes and Route where we then define the path itself
// as a prop. So here we are doing it more in an imperative way. So we're declaring the router outside of the JSX
// and using this JavaScript array right here. And this is necessary in React Router 6.4 in order to enable data fetching or data loading with React Router.
// So this old way still works even in the modern React Router, but then we cannot use it to load data or to submit data using forms.
// So all these new data loading capabilities are enabled and are only possible to use when we create a router using this createBrowserRouter function.

// Okay so just to recap, in the new React Router, since version 6.4, if we want to use the new powerful APIs like data loaders, data actions, or data features,
// we need to create a new router using this new syntax. So specifying an array of objects where each object is now the route,
// so a correspondence between a path and the component that we want to display in the user interface. And we then provide that router object here
// using the RouterProvider component.

// const router = createBrowserRouter([
//     {
//       path:'/',
//       element: <Home />
//     },
//     {
//       path: '/menu',
//       element: <Menu />
//     },
//     {

//     },
//     { path:'/cart', element: <Cart />},
//     {path: '/order/new', element: <CreateOrder />},
//     {path: '/order/:orderId', element: <Order />}
// ])

// function App() {
//   return <RouterProvider router={router} />
  
// }

// export default App




//// ****************************** App layout

// let's learn how we can implement a global application layout using React Router. And let's start by actually first building that layout
// so that we can then connect it with our Router here. So what I want to do is to create a layout that is going to work both for big screens
// like this one here, or even for mobile phones
// So lets go to ui forlder and create AppLayout.jsx


// So basically we can do the exact same thing but with a different syntax inside this new createBrowserRouter function.
// So the way that we define child routes, so nested routes, is by defining the children property. And so children then accepts another array of routes.
// Now we don't want to do that here, but really here basically as the parent route of all these other routes. So let's create a new object here. 
// And here the element that we want is that app layout that we just created. So this one right here. And here, we don't need any path
// which will then effectively make this a layout route. since this one doesn't have a path, it is technically called in React Router a layout route. 


// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />
//       },
//       {
    
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', element: <CreateOrder />},
      
//       {path: '/order/:orderId', element: <Order />}

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;




////************************************ Fetching Data With React Router "Loaders": Pizza Menu
// React Router's powerful new data loading feature, which is called loaders. So the idea behind a loader is that somewhere in our code
// we create a function that fetches some data from an API. We then provide that loader function to one of our routes and that route will then fetch that data
// as soon as the application goes to that route. And then in the end, once the data has arrived, it will be provided to the page component itself using a custom hook.

// so let's actually implement this with code. And I want to start by fetching the menu data. So again, we do this in three steps.
// First, we create a loader. Second, we provide the loader, and third, we provide the data to the page. Now, this data loader can be placed anywhere
// in our code base but the convention seems to be to place the loader for the data of a certain page inside the file of that page. So here in this case, we want to load the menu data.
// And so let's go to this component and create the loader function right here.
// Go to Menu.jsx component and create a loader function there


// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader
//       },
//       {
    
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', element: <CreateOrder />},
      
//       {path: '/order/:orderId', element: <Order />}

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;




////*************************************** Displaying a Loading Indicator
// In order to be able to display an indicator like this, we need to know whether this data is actually being loaded right now, right?
// So currently, we don't have that information anywhere here yet, right? So there's no like is loading state somewhere to be seen.
// And so, we now need to get that information into our application. And in React Router, we can get access to this by using the useNavigation hook.
// So not use navigate, but really useNavigation. And with this we will be able to see whether the application is currently idle, whether it is loading or submitting.
// And this information is actually for the entire application. So not just for one page, but really here for the entire router.
// So if one of these pages here is loading, then the navigation state will become loading no matter which of these pages is actually being loaded.
// Therefore, it doesn't make much sense to create the loader.
// Go to applayout.jsx

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader
//       },
//       {
    
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', element: <CreateOrder />},
      
//       {path: '/order/:orderId', element: <Order />}

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;


////************************************ Error handling with error elements
// so let's now see how it's done in the new React Router. So with create browser Router whenever there is some error that is thrown in a loader,
// an action, or simply while rendering a component, we can render an error element instead of these elements here that correspond to the actual pages.
// So again, if for example, some error happens here in the menu, we can instead of rendering this menu, render an error element
// and so let's specify that error element first up here.So here in the parent route. because these errors that happen here
// in these nested routes, they will bubble up to the parent route. So error element and then here, let's use the error that we already have.

// And then what I want to try first is to render some path that doesn't exist and so there we go. So now we moved immediately here to the error element,
// Yo can specify the Error go to Error.jsx

// Lets do one more thing go to Loader.jsx
// You can see that error replace the complete application with Error message but error is in menu so place this element in menu route also
// it's just important to notice that each of these errors here will bubble up to the parent route unless it is actually handled in the route itself.
// So by placing error element right on the route where the error might happen.


// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />
//       },
//       {
    
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', element: <CreateOrder />},
      
//       {path: '/order/:orderId', element: <Order />}

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;




////**************************************** Fetching the orders
//// First see the project requirements
// So, up until this point, actually all we did was to load the menu from the API. So, that's really the only thing here. But since we are now loading data from API,
// let's also load individual orders. So, basically so that we can implement this other feature here where a user can look up their order based on the ID of that order.
// So, we cannot create orders yet, but we can already use some dummy IDs to look up orders that had been placed before. And so, let's now implement that functionality.

// Create SearchOrder.jsx in order and add in Header.jsx

// let's now work here on the order.jsx.

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />
//       },
//       {
    
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', element: <CreateOrder />},
      
//       {
//       path: '/order/:orderId', element: <Order />, 
//       loader: orderLoader, 
//       errorElement: <Error />
//       }

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;




////******************************************  Writing Data With React Router "Actions"
// Let's now change subjects and learn how we can use React Router's actions to write data or to mutate data on the server. So while the loaders that we used earlier are to read data,
// actions are used to write data or to mutate data. So a state that is stored on some server. Or in other words, actions allow us
// to manage this remote server state using action functions and forms that we then wire up to routes similar to what we did earlier with the loaders.
// Okay, so remember from the project requirements that orders are made by sending a post request with the order data to the API.
// And so these actions and forms that we just talked about are ideal to create new orders. And so that's what we're going to do in this lecture.

// So we will come now to this create order page component, and there we will create a form and we will create an action.
// Go to CreateOrder.jsx
// Now connect that action here, So now whenever the form is submitted at this createOrderRoute then this form action will be called


// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', 
//       element: <CreateOrder />,
//       action: createOrderAction
//       },
      
//       {
//       path: '/order/:orderId', element: <Order />, 
//       loader: orderLoader, 
//       errorElement: <Error />
//       }

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;



////***************************************** Error Handling in Form Actions

// So at error handling, what I mean, is that there might happen some errors while this form is being submitted.
// CreateOrder.jsx

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', 
//       element: <CreateOrder />,
//       action: createOrderAction
//       },
      
//       {
//       path: '/order/:orderId', element: <Order />, 
//       loader: orderLoader, 
//       errorElement: <Error />
//       }

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;






////****************************************** Adding TAILWIND CSS

// Step 1. install, npm install -D tailwindcss postcss autoprefixer
// Step 2. Will then create the Tailwind and the post CSS config files, npx tailwindcss init -p
// Step 3. Open the tailwind configfile, add to content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}",] , what we want is this to basically tell Tailwind where or index HTML file is located
          // and also where all or JavaScript files are located. So by default they are inside this source folder but if for some reason we changed all of this right here
          // then we would also have to change this config.

// Step 4. And so now what we have to do is to actually change our index CSS file for the first time. So let's grab all of this here. So copy this and paste it right at the very top of index.CSS.
            // @tailwind base; @tailwind components; @tailwind utilities;

// If you havn't install tailwind Css extension then go and install it right away

// One more thing left i.e Tailwind prettier package, in browser go in github install this "npm install -D prettier prettier-plugin-tailwindcss"
// so what this will do is to automatically sort the order of the class names in the way that Tailwind recommends it. And this is gonna be pretty helpful for you

// And with this, we are actually finished. So all we need to do now is to start our project and then we can start using Tailwind in our project.

/// And if you want to know exactly what that CSS reset is, you can come here to the documentation again and it is right here in this Preflight.
// So all the base styles that Tailwind is applying are described right here.

// Lets go to home.jst and try it


////****************** Working with Colors
// Go to docs in customizing see color, we can define our own color pallet for that we need to add in config file.
// So background color, and there it is. And so here you see that basically we set the background color of some element with "bg", dash, and then again
// the name and the intensity of the color that we want.
// for bg go to Header.jsx, then CartOverview.jsx and then Home.jsx to change.


////**************  Text styling
// We cannot only use these Tailwind classes right here in the JSX, but also inside our HTML. So for example, we can add some classes here to the body
// that we want every element on the page to inherit or that we want to set on the entire body element. So typically that is like a background color,
// First of all go to index.html them give some styling that out component will inherit
// Docs typography first see font size -> "text-xl, text-xs...etc", for font-weight -> "font-semibold", for Letter Spacing -> "tracking-widest"
// If you want more letter spacing u can give artibary value "tracking-[5px/1rem]" this can be for anything else such as text-[10px]



//// ***************  The Box Model: Spacing, Borders, and Display
// First of all add <CreatUser in Home.jsx />
// mb-4 => 1rem, mx -> both left and right, 
// for border First, we write border then enter direction and then width => "border-b-2/border-b...", "border-color-intensity"

// now staying again on the topic of spacing. Tailwind actually includes a very, very nice and helpful class, which allows us to add spacing
// between elements in a very easy way. So without, for example, having to use any flex box tricks. So the way that works, and let's say we wanted some space
// between these elements here, is that on the parent you simply use space, then the direction. So X for horizontal and Y for vertical,
// and then the amount again => "space-x-4"

// display: block, flex, grid...etc just use property name, hidden is used to hide for small screen

// CartOverview.jsx , Header.jsx



/////**************************** Responsive design
// Inside the Core concept in docs
// So by default, Tailwind comes with five breakpoints and these breakpoints are mobile first, which means that they are min with media queries.
// By default it is applied to all screen if we do not specify
// sm start with 640px, if we specify sm:my-16 then if screen width greater than 640px then this margin will apply.
// Go to Home.jsx -> Header.jsx -> CartOverview.jsx -> CreateUser.jsx



//// ********************************* Building Layout: flex box, CSS Grid
// flex box
// Lets move to CartOverview.jsx -> header.jsx -> UserName.jsx

// Css grid
// So basically what we want to do is to set up a grid which contains three rows for the layout. So one row here for the header, one for this content,
// and one for this card overview. The goal of that is that we can then easily push this overview here all the way to the bottom of the screen.
// start with giving Height, grid-rows-auto fit to content every row, customization grid-rows-[auto_1fr_auto]
// h-screen -> full width
// Applayout.jsx


////********************************** Styling Buttons: Element States and Transitions
// Go to the Cart.jsx, /order/new in CreateOrder.jsx,
// Styling the button:
// So in order to remove that ugly focus there, we can do "focus," so the focus state, and then here, "outline-none." However, we cannot just leave it like this
// because this will create some accessibility issues. And so we need to do something else. So in this focus state, instead of having this outline,
// we can use something that Tailwind created, which is what they call a ring. So a ring, as we can see here, is basically some shadows
// that they will place outside the element. So this creates this ring. And then we also need to define the color of the ring.
// So again, that's within the focus state. So all of this should only happen when the element is focused, and so we need to prefix all of this
// always with this "focus" word.


////***************************** Styling Form Elemnets
// Go to SearchOrder.jsx -> CreateOrder.jsx


//// ************************ Reusing the style with @apply
//// Go to Index.css create @layer component inside we will place out classes, CreateOrder.jsx, reuse the inputs
// It should be use as exception, it shouldn't be use everywhere

////************************* Reusing the styles with React Component
// This is better way of reusing the styles
// Here we will reuse button in CreateOrder.jsx, reuse link in Cart.jsx and Error.js, Error.jsx has Button which is link.



//// *************************** Absolute Positioning, z-index, and More
// Loader.jsx, to formate the loader it is good ideal make isLoading: true then do styling then do not forget to make its back to prev value
// So first of all go to AppLayout.jsx and replace  isloading true.

//// *************************** Configuring tailwind: Custom Font family
// One of the big advantages of Tailwind is its extreme flexibility which allows us to configure basically everything about it.
// let's at least try to explore it a little bit by changing the default font family and by doing some other changes. Now as always you can read everthing about it in configuration topic at docs.
// What we will need now is this Tailwind dot config file where we can really change everything about Tailwind. And the easiest way I found to see what exactly
// we can change is to open up this link here, which takes us to the default configuration. And so then here, we can see all the things that
// Tailwind basically sets by default.

// So it's all these different values here. And so this is all the stuff that we can override. And so what we will override now
// is the default font family. And let's get that font from Google Fonts. So Google Fonts. And let's immediately search the one
// that we want, which is Roboto Mono-spaced. 
// Go to Index.html and link of this font, and then go tailwind.config file add font family say pizza to override default font family of the tailwind
// After this we can use this font anywhere. font-pizza
// Better way just to override the sans: "Roboto Monospace, monospace" then entire page will get that font, font-sans
// Go to header.jsx

// You can also config the color but do not put this in theme  it will give you an error bcs colors we wrote in stylying will no longer exist so write it in extended.
// say u defined it as pizza: #123 then we can use it anywhere like "bg-pizza".

// I actually wanted to change is now this height. So right here, remember how in the layout we used the height of screen, which corresponds to 100 viewport height units.
// However, this creates problems on mobile browsers. And so instead of using this unit, we should use an even more modern unit,
// which is called D.V.H. So let's do that. And I will just for the sake of fun, keep this one here. But now let's update the height. And so in the height,
// what we want to change is screen. So screen should now no longer be 100 V.H., but 100 D.V.H which stands for dynamic viewport height units.
// And so with this, we no longer have the problem that on mobile browsers sometimes the viewport type is not really 100%.
 


////*************************************** Styling the menu
// First style menuItems.jsx, add type prop to Button


////***************************************** Styling the Cart


//// *************************** Styling the Order Form
// Css Trickes to place the pizza at title go emoji as favicons open Css trick website and copy link and place it in the index.html file


////************************************** Styling the order overview


// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', 
//       element: <CreateOrder />,
//       action: createOrderAction
//       },
      
//       {
//       path: '/order/:orderId', element: <Order />, 
//       loader: orderLoader, 
//       errorElement: <Error />
//       }

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;






/////************************************* Adding Redux and advance React router

////**********************  Modeling the "User" State With Redux Toolkit 
// So let's do npm install and then @reduxjs/toolkit and then let's also immediately install react-redux
// Go to userSlice.jsx then create store.jsx => userName.jsx

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path:'/',
//         element: <Home />
//       },
//       {
//         path: '/menu',
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />
//       },
      
//       { path:'/cart', element: <Cart />},
      
//       {path: '/order/new', 
//       element: <CreateOrder />,
//       action: createOrderAction
//       },
      
//       {
//       path: '/order/:orderId', element: <Order />, 
//       loader: orderLoader, 
//       errorElement: <Error />
//       }

//     ]
//   },
// ])

// function App() {
// return <RouterProvider router={router} />

// }

// export default App;




////************************* Reading and Updating the User State
// So do you remember how we update the state inside Redux? Well, we update Redux state by dispatching an action to our reducer here,
// and we do that by using the action creator that was automatically created by the create slice function.

// Go to createUser.jsx, Hoe.jsx, Cart.jsxt



////******************************* Modeling the cart state
// The best of redux toolkit is we can create a slice in same folder which is containg the files that are related to that feature.
// Create cartSlice.jsx, store.jsx


////************************************ Adding Menu Items to the Cart
// MenuItem.jsx, Button.jsx


////***************************************  Building the Cart Overview With Redux Selectors
// CartOverview.jsx


////**************************************** Building the Cart Page
// Cart.jsx, EmptyCart.jsx


////****************************************** Deleting Cart Items
// CartItem.jsx, create DeleteButton.jsx
// MenuItem.jsx, CartSlice.jsx


////****************************** Updating Cart Quantities
// Create UpdateItemQuantity.jsx, Button.jsx(add round case also), CartItem.jsx, cartSlice.jsx, MenuItem.jsx


////************************************** Using the Cart for New Orders
// CreateOrder.jsx


////***************************** Redux Thunks With createAsyncThunk
// Let's now go back to some more advanced Redux Toolkit and in particular, we will now create a Thunk middleware by using the built-in CreateAsyncThunk function
// which is a way of creating a Thunk that we avoided when we first learned about Redux, and the idea here is to implement the feature
// where our users can use geolocation in order to get their GPS position and their address
// userSlice.jsx, CreateOrder.jsx



////************************************** Integrating Geolocation
// CreateOrder.jsx



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />
      },
      
      { path:'/cart', element: <Cart />},
      
      {path: '/order/new', 
      element: <CreateOrder />,
      action: createOrderAction
      },
      
      {
      path: '/order/:orderId', element: <Order />, 
      loader: orderLoader, 
      errorElement: <Error />
      }

    ]
  },
])

function App() {
return <RouterProvider router={router} />

}

export default App;