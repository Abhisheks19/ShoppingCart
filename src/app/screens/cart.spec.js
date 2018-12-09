import React from "react";
import { shallow } from "enzyme";
import Cart from "./cart";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const setup = props => {
  const actions = {
    onCheckoutClicked: jest.fn()
  };

  const component = shallow(<Cart {...props} />);

  return {
    component: component,
    p: component.find("p")
  };
};

describe("Cart component", () => {
  it("should render title, price, and inventory", () => {
    const { component } = setup({
      productList: {
        id: 1,
        price: 39.99,
        title: "Dove Soap"
      }
    });
    expect(p.text()).toMatch("Dove Soap");
  });

  //   it("should display total", () => {
  //     const { p } = setup("76");
  //     expect(p.text()).toMatch(/^Total: \$76/);
  //   });

  //   it('should display add some products message', () => {
  //     const { em } = setup()
  //     expect(em.text()).toMatch(/^Please add some products to cart/)
  //   })

  //   it('should disable button', () => {
  //     const { button } = setup()
  //     expect(button.prop('disabled')).toEqual('disabled')
  //   })

  //   describe('when given product', () => {
  //     const product = [
  //       {
  //         id: 1,
  //         title: 'Product 1',
  //         price: 9.99,
  //         quantity: 1
  //       }
  //     ]

  //     it('should render products', () => {
  //       const { products } = setup('9.99', product)
  //       const props = {
  //         title: product[0].title,
  //         price: product[0].price,
  //         quantity: product[0].quantity
  //       }

  //       expect(products.at(0).props()).toEqual(props)
  //     })

  //     it('should not disable button', () => {
  //       const { button } = setup('9.99', product)
  //       expect(button.prop('disabled')).toEqual('')
  //     })

  //     it('should call action on button click', () => {
  //       const { button, actions } = setup('9.99', product)
  //       button.simulate('click')
  //       expect(actions.onCheckoutClicked).toBeCalled()
  //     })
  //   })
});
