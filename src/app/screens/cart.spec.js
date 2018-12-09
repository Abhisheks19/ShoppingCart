import React from "react";
import { shallow, mount } from "enzyme";
import Cart from "./cart";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

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

  it("Check initial state", () => {
    const props = {};
    const state = {};
    const wrapper = shallow(
      <Provider store={store} key="provider">
        <Cart {...props} {...state} />
      </Provider>
    );
    expect(wrapper.state("totalPrice")).toBe(0);
    // wrapper.find("button").simulate("click");
    // expect(wrapper.state("totalPrice")).toBe(39.99);
  });
});

// describe('indirectly testing "incrementCounter" through click simulation', () => {
//   it("should update the count by 1 when invoked by default", () => {
//     const wrapper = shallow(<Cart />);
//     expect(wrapper.state("totalPrice")).toBe(0);
//     wrapper.find("button").simulate("click");
//     expect(wrapper.state("totalPrice")).toBe(39.99);
//   });

//   it("renders correctly", () => {
//     const tree = renderer.create(<Cart />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
//   it('should add two to the count when the "two" value is true', () => {
//     const wrapper = shallow(<Home two />);
//     expect(wrapper.state("counter")).toBe(0);
//     wrapper.find("button").simulate("click");
//     expect(wrapper.state("counter")).toBe(2);
//   });
// });

// const setup = props => {
//   const actions = {
//     onCheckoutClicked: jest.fn()
//   };

//   const component = shallow(<Cart {...props} />);

//   return {
//     component: component,
//     span: component.find("span")
//   };
// };

// describe("Cart component", () => {
//   it("should render title, price, and inventory", () => {
//     const { component } = setup({
//       productList: {
//         id: 1,
//         price: 39.99,
//         title: "Dove Soap"
//       }
//     });
//     expect(
//       shallow(<Cart />)
//         .dive()
//         .find("span")
//         .text()
//     ).toMatch("Dove Soap");
//   });

//   it("should display total", () => {
//     const { span } = setup("Dove Soap");
//     expect(span.text()).toMatch("Dove Soap");
//   });

//   it("should render without throwing an error", () => {
//     expect(
//       shallow(<Cart />)
//         .find("h1")
//         .exists()
//     ).toBe(true);
//   });
// });

//expect(wrapper.props().onCancel).toHaveBeenCalledTimes(1);
