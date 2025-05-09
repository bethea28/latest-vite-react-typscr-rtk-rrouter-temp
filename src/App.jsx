import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetProductsQuery,
  useAddProductsMutation,
} from "./features/initialState/initialStateService";
import {
  increment,
  incrementByAmount,
} from "./features/initialState/InitialStateSlice";
const App = () => {
  const state = useSelector((state) => state.initialState.value);
  const { data } = useGetProductsQuery();
  const [addProduct] = useAddProductsMutation();
  console.log("test increment state", data);
  const dispatch = useDispatch();
  const handleClick = async () => {
    // dispatch(incrementByAmount(5));
    const addingProd = await addProduct({ title: "BMW Pencil" });
    console.log("result", addingProd);
    dispatch(incrementByAmount(5));
  };
  return (
    <section onClick={handleClick}>
      <p>Hello World</p>
    </section>
  );
};

export default App;
