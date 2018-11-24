import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/floatCartActions';
import { updateCart } from '../../store/actions/updateCartActions';
import CartProduct from './CartProduct';
import persistentCart from "../../persistentCart";
import util from '../../util';


class FloatCart extends Component {
  
  state = {
    isOpen: false,
  };

  componentWillMount() {
    // This will be executed befor DOM. Client and Server.
    this.props.loadCart( JSON.parse(persistentCart().get()) || [] );
  }

  componentDidMount() {
    /*
     This will be excuted after first DOM, only in client. 
     After that, components generate corresponding DOM, which can be accessed by this.getDOMNode().
     If you want to use with other JS framework, you can call setTimeout, setInterval or send AJAX, etc.
    */ 
    setTimeout(() => {
      this.props.updateCart(this.props.cartProducts);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    // Called when components recieve a new prop prop prop.
    // This method will not be called when init render().
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  }

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  }

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  }

  removeProduct = (product) => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  }

  proceedToCheckout = () => {
    const { totalPrice, productQuantity, currencyFormat, currencyId } = this.props.cartTotals;

    if (!productQuantity) {
      alert("Come on! Add some cool gadges");
    }else {
      alert(`Checkout - Subtotal: ${ currencyFormat } ${ util.formatPrice(totalPrice, currencyId) } \nThank you for your shopping! Hope to see you again!`);
    }
  }

  render() {
    const { cartTotals, cartProducts, removeProduct } = this.props;

    const products = cartProducts.map(p => {
      return (
        <CartProduct
          product = { p }
          removeProduct = { removeProduct }
          key= { p.id }
        />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className = { classes.join(' ') }>
        {/* If cart open, show close (x) button */}
        { this.state.isOpen && (
          <div
            onClick = { () => this.closeFloatCart() }
            className = "float-cart__close-btn"
          >
          X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick = { () => this.openFloatCart() }
            className = "bag bag--float-cart-closed"
          >
            <span className = "bag__quantity">{ cartTotals.productQuantity }</span>
          </span>
        )}

        <div className = "float-cart__content">
          <div className = "float-cart__header">
            <span className = "bag">
              <span className = "bag__quantity">
                { cartTotals.productQuantity }
              </span>
            </span>
            <span className = "header-title">Cart</span>
          </div>

          <div className = "float-cart__shelf-container">
            { products }
            { !products.length && (
              <p className="shelf-empty">
                Add some cool! <br />
              </p>
            ) }
          </div>

          <div className = "float-cart__footer">
            <div className = "sub">Total</div>
            <div className = "sub-price">
              <p className = "sub-price__val">
                {`${ cartTotals.currencyFormat } ${ util.formatPrice(cartTotals.totalPrice, cartTotals.currencyId) }`}
              </p>
              <small className = "sub-price__installment">
                { !!cartTotals.installments && (
                  <span>
                    { `or pay ${cartTotals.installments } x ${ cartTotals.currencyFormat } ${ util.formatPrice(cartTotals.totalPrice / cartTotals.installments, cartTotals.currencyId) }/month` }
                  </span>
                )}
              </small>
            </div>
            <div onClick = { () => this.proceedToCheckout() } className = "buy-btn">
              Check out!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FloatCart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
};


const mapStateToProps = (state) => ({
  cartProducts: state.cartProducts.items,
  newProduct: state.cartProducts.item,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
});

// mapStateToProps allows us to bind states in store with the prop of component.
// mapDispatchToProps allows us to bind actions to ownComp's prop

// redux: 代理top-level single data flow，从最外层的container下发数据流触发dumb components的更新。
// 当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给 MyComp。

// All states are decleared in 'actions'.
// You may confused about the state declearation at the beginning this class, isOpen = false;
// We only use it in ownComp, not redux

export default connect(
  mapStateToProps, { loadCart, updateCart, removeProduct }
)(FloatCart);

