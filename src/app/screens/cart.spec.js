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

  it("Finding the HTML Elements in the component", () => {
    const props = {};

    const wrapper = mount(
      <Provider store={store} key="provider">
        <Cart {...props} />
      </Provider>
    );

    expect(wrapper.find("h1").exists()).toBe(true);

    expect(wrapper.find("h3").exists()).toBe(true);

    expect(wrapper.find("div").exists()).toBe(true);
  });

  it("Check Empty Cart and Total Price to be equal to 0", () => {
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

  it("Simulate Add to Cart Button and Adding Dove Soap to the cart", () => {
    const onClick = jest.fn();

    const store = mockStore({
      productList: {
        productList: [{ id: 1, title: "Dove Soap", price: 39.99 }]
      }
    });

    const wrapper = mount(
      <Provider store={store} key="provider">
        <Cart onClick={onClick} />
      </Provider>
    );

    const clickButton = wrapper.find("button");

    clickButton.simulate("click");

    expect(wrapper.find("button").length).toEqual(1);

    wrapper.setState({
      totalPrice: 39.99
    });

    expect(wrapper.state("totalPrice")).toEqual(39.99);
  });

  it("Simulate Add to Cart Button and Adding 5 Dove Soap to the cart", () => {
    const store = mockStore({
      productList: {
        productList: [{ id: 1, title: "Dove Soap", price: 39.99 }]
      }
    });

    const wrapper = mount(
      <Provider store={store} key="provider">
        <Cart />
      </Provider>
    );

    const clickButton = wrapper.find("button");

    clickButton.simulate("click");

    clickButton.simulate("click");

    clickButton.simulate("click");

    clickButton.simulate("click");

    clickButton.simulate("click");

    wrapper.setState({
      totalPrice: 199.95
    });

    expect(wrapper.state("totalPrice")).toEqual(199.95);
  });
});
