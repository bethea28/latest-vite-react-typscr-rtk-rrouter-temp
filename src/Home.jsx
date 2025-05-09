import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router";
import {
  useGetProductsQuery,
  useAddProductsMutation,
} from "./features/initialState/initialStateService";
import { incrementByAmount } from "./features/initialState/InitialStateSlice";

const Home = () => {
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
      <Link to="/profile">
        <p>Hello World to Profile</p>
      </Link>
    </section>
  );
};

const Profile = () => (
  <Link to="/">
    <p>Link back home</p>;
  </Link>
);

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
