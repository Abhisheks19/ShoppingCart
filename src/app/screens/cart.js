import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getProductsList } from "../redux/actions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    };
    this.cartItems = [];
  }

  componentDidMount() {
    this.props.getProductsList();
  }

  addToCart = data => {
    this.cartItems.push(data);
    this.calculateCost();
  };

  calculateCost = () => {
    const totalAmount = this.cartItems.reduce(
      (total, obj) => obj.price + total,
      0
    );

    this.setState({ totalPrice: totalAmount.toFixed(2) });
  };

  render() {
    const { productList } = this.props;

    const { totalPrice } = this.state;

    const productListData =
      productList &&
      productList.productList.map(product => {
        return (
          <Fragment key={product.id}>
            <span>{product.title}</span>

            <button
              type="button"
              className="btnClick"
              onClick={() => {
                this.addToCart(product);
              }}
            >
              Add To Cart
            </button>
          </Fragment>
        );
      });

    return (
      <Fragment>
        <div>{productListData}</div>
        <div>
          <h1>Total Amount</h1>
          <h3>{totalPrice}</h3>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsList: () => dispatch(getProductsList())
  };
};

const mapStateToProps = state => {
  return {
    productList: state.productList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
