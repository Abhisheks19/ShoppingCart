import axios from "axios";
//import productData from "../data/products.json";

export const ProductList = {
  getProductsListSuccess: "getProductsListSuccess/ProductList"
};

export const getProductsListSuccess = data => {
  return {
    type: ProductList.getProductsListSuccess,
    data
  };
};

export function getProductsList() {
  return dispatch => {
    axios
      .get("http://www.mocky.io/v2/5c0bf67f2f0000100013ec83")
      .then(resp => {
        dispatch(getProductsListSuccess(resp.data));
      })
      .catch(err => {});
  };
}
