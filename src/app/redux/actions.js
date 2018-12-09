import axios from "axios";

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
      .get("http://www.mocky.io/v2/5c0d23782f00004c19e2e52b")
      .then(resp => {
        dispatch(getProductsListSuccess(resp.data));
      })
      .catch(err => {});
  };
}
