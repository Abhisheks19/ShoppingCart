import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductsList } from "../redux/actions";
import "../../App.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }

  componentDidMount() {
    this.props.getProductsList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cartItems: [].concat(...Array(5).fill(nextProps.productList.productList))
    });
  }

  render() {
    const productList =
      this.props.productList &&
      this.props.productList.productList.map(product => {
        return <p key={product.id}>{product.title}</p>;
      });

    const totalCost = this.state.cartItems.reduce(
      (total, obj) => obj.price + total,
      0
    );

    return (
      <React.Fragment>
        <div>
          <p>{productList}</p>
        </div>
        <div>
          {/* <h1>Total Amount</h1> */}
          <h3>{totalCost.toFixed(2)}</h3>
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
