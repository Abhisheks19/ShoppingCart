import React from "react";
import { shallow, mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import Cart from "./cart";

configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

let store;

describe.only("<Cart />", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it("Check Empty Shopping Cart and Total Price to be equal to 0", () => {
    const props = {};

    const state = {};

    const wrapper = shallow(
      <Provider store={store} key="provider">
        <Cart {...props} {...state} />
      </Provider>
    );

    wrapper.setState({
      totalPrice: 0
    });

    wrapper.cartItems = [];

    expect(wrapper.state("totalPrice")).toBe(0);

    expect(wrapper.cartItems).toEqual([]);
  });

  it("Simulate Add to Cart Button and Adding Dove Soap and Axe Deo to the cart", () => {
    const onClick = jest.fn();

    const store = mockStore({
      productList: {
        productList: [
          { id: 1, title: "Dove Soap", price: 39.99 },
          { id: 2, title: "Axe Deo", price: 99.99 }
        ]
      }
    });

    const wrapper = mount(
      <Provider store={store} key="provider">
        <Cart onClick={onClick} />
      </Provider>
    );

    const clickButton = wrapper.find("button");

    clickButton.at(0).simulate("click");
    clickButton.at(0).simulate("click");

    clickButton.at(1).simulate("click");
    clickButton.at(1).simulate("click");

    expect(wrapper.find("button").length).toEqual(2);

    wrapper.setState({
      totalPrice: 314.95
    });

    expect(wrapper.state("totalPrice")).toEqual(314.95);
  });
});
