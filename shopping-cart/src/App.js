import { useEffect, useReducer } from "react";
import axios from "axios";
import "./App.css";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { cartReducer } from "./reducers/cartReducer";

function App() {
  // [newState, DispatchMethod] = useReducer(Reducer, InitialState)
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: []
  });

  const fetchProducts = () => {
    // 2 ways of calling GET API using axios (async/await, promise)

    // const { data } = await axios.get("https://dummyjson.com/products");

    axios.get("https://dummyjson.com/products").then((response) => {
      const { data } = response;

      dispatch({
        type: "ADD_PRODUCTS",
        payload: data.products
      });
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Products state={state} dispatch={dispatch} />
      <Cart state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
