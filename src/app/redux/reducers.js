import { ProductList } from "./actions";

const defaultState = {
  productList: []
};

const ProductListState = (state = defaultState, action) => {
  switch (action.type) {
    case ProductList.getProductsListSuccess:
      return {
        ...state,
        productList: action.data
      };

    default:
      return state;
  }
};

export default ProductListState;
