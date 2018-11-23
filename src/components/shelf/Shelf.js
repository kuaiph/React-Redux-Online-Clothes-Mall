import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchProducts } from '../../store/actions/productActions';
import { addProduct } from '../../store/actions/floatCartActions';

import Product from './Product';
import Filter from './Filter';
import ShelfHeader from './ShelfHeader';
import Clearfix from '../Clearfix';
import Spinner from '../Spinner';


// This is an integration of all sub component.
class Shelf extends Component {
  state = {
    loading: false,
  }

  // componentWillMount: components loaded, before render(), exec only once
  componentWillMount() {
    const { filters, sort } = this.props;

    this.handleFetchProducts(filters, sort);
  }
  // when receive a new prop, exec it. Init render() no exec.
  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, sort: nextSort } = nextProps;

    // If change filter setting (Left-top)
    if (nextFilters !== this.props.filters) {
      this.handleFetchProducts(nextFilters, undefined);
    }
    // If change sort setting (Right-top)
    if (nextSort !== this.props.sort) {
      this.handleFetchProducts( undefined, nextSort);
    }
  }

  handleFetchProducts = (filters = this.props.filters, sort = this.props.sort) => {
    this.setState({ loading: true });
    this.props.fetchProducts(filters, sort, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { products } = this.props;
    
    const p = products.map(p => {
      return (
        <Product
          product = { p }
          addProduct = { this.props.addProduct }
          key = { p.id }
        />
      );
    });

    return (
      /*
      Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。
        <React.Fragment>
          <ChildA />
          <ChildB />
          <ChildC />
        </React.Fragment> 
      */
      <React.Fragment>
        <Filter /> 
        { this.state.loading &&
          <Spinner />
        }
         
        <div className="shelf-container">
          <ShelfHeader productsLength = { products.length }/>
          { p }
          {/* <Clearfix /> */}
        </div>
        <Clearfix />
      </React.Fragment>
    )
  }
}

Shelf.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  filters: PropTypes.array,
  sort: PropTypes.string,
}

const mapStateToProps = state => ({
  products: state.products.items,
  filters: state.filters.items,
  sort: state.sort.item,
})

export default connect(
  mapStateToProps, { fetchProducts, addProduct }
)(Shelf);
