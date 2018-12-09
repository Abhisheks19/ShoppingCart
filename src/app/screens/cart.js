import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductsList } from "../redux/actions";
import "../../App.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      taxPercentage: 12.5
    };
    this.cartItems = [];
  }

  componentDidMount() {
    this.props.getProductsList();
  }

  addToCart = data => {
    this.cartItems.push(data);
  };

  calculateCost = () => {
    const totalAmount = this.cartItems.reduce(
      (total, obj) => obj.price + total,
      0
    );
    const taxAmount = (this.state.taxPercentage / 100) * totalAmount;
    this.setState({ totalPrice: (totalAmount + taxAmount).toFixed(2) });
  };

  render() {
    const productList =
      this.props.productList &&
      this.props.productList.productList.map(product => {
        return (
          <React.Fragment key={product.id}>
            <span>{product.title}</span>
            <button
              onClick={() => {
                this.addToCart(product);
                this.calculateCost();
              }}
            >
              Add To Cart
            </button>
          </React.Fragment>
        );
      });

    return (
      <React.Fragment>
        <div>{productList}</div>
        <div>
          <h1>Total Amount</h1>
          <h3>{this.state.totalPrice}</h3>
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProductsList: () => dispatch(getProductsList())
  };
}

function mapStateToProps(state) {
  return {
    productList: state.productList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
