import React from "react";
import { shallow, mount } from "enzyme";
import Cart from "./cart";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

const setup = props => {
  const actions = {
    onCheckoutClicked: jest.fn()
  };

  const component = shallow(<Cart {...props} />);

  return {
    component: component,
    span: component.find("span")
  };
};

describe("Cart component", () => {
  // it("should render title, price, and inventory", () => {
  //   const { component } = setup({
  //     productList: {
  //       id: 1,
  //       price: 39.99,
  //       title: "Dove Soap"
  //     }
  //   });
  //   expect(component.span.text()).toMatch("Dove Soap");
  // });

  // it('About shows "About"', () => {
  //   const component = renderer.create(<Cart />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it("should display total", () => {
    const { span } = setup("Dove Soap");
    expect(span.text()).toMatch("Dove Soap");
  });
});
