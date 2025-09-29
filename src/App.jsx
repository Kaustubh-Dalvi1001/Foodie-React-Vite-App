import Header from "./components/Header";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import CartComp from "./components/CartComp";
import ErrorComp from "./components/ErrorComp";
import RestoMenu from "./components/RestoMenu";

function App() {
  return (
    <div id="appDiv">
      <Header />
      <div id="mainDiv">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <CartComp />,
      },
      {
        path: "/resturants/:restoId",
        element: <RestoMenu />,
      },
    ],
    errorElement: <ErrorComp />,
  },
]);

export default App;
