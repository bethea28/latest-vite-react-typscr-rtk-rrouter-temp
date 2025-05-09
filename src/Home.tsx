import "./App.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router";
import {
  useGetProductsQuery,
  useAddProductsMutation,
} from "./features/initialState/initialStateService";
import { incrementByAmount } from "./features/initialState/InitialStateSlice";

import { Product, ProductsResponse, productsType } from "../types/index";

const Home = () => {
  const state = useSelector(
    (state: { initialState: { value: number } }) => state.initialState.value
  );
  const [skip, setSkip] = React.useState(0);
  const { data: allProducts } = useGetProductsQuery({ skip });
  const [addProduct] = useAddProductsMutation();
  console.log("types now");
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetch = async () => {
      const addingProd = await addProduct({ title: "BMW Pencil" });
      console.log("result", addingProd);
    };
    fetch();
  }, []);
  const handleClick = async () => {
    dispatch(incrementByAmount(5));
  };

  const handlePrevious = () => {
    console.log("previous");
    setSkip((prevState) => prevState - 10);
  };
  const handleNext = () => {
    console.log("next");
    setSkip((prevState) => prevState + 10);
  };
  return (
    <section onClick={handleClick}>
      <Link to="/profile">
        <p>Hello World to Profile</p>
      </Link>
      {allProducts?.products.map((prod: Product, key: number) => {
        return (
          <h3 key={key.toString()}>
            {prod.id}: {prod.title}
          </h3>
        );
      })}
      <button
        disabled={allProducts?.products[0].id === 1}
        onClick={handlePrevious}
      >
        previous 10
      </button>
      <button
        disabled={allProducts?.products.at(-1).id == 194}
        onClick={handleNext}
      >
        next 10
      </button>
    </section>
  );
};

const Profile = () => (
  <Link to="/">
    <p>Link back home</p>
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
