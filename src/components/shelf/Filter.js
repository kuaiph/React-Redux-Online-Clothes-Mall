import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { updateFilters } from '../../store/actions/filterActions';
import Checkbox from '../Checkbox';

// This .js works with Checkbox.js to filter the size of clothes.
const availableSizes = [
  'XS',
  'S',
  'M',
  'ML',
  'L',
  'XL',
  'XXL',
  'XXXL'
];

class Filter extends Component {
  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  }

  createCheckbox = (label) => (
    <Checkbox
        classes="filters-available-size"
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
    />
  )

  createCheckboxes = () => (
    availableSizes.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="filters">
        <h4 className="title">Sizes:</h4>
        {this.createCheckboxes()}
      </div>
    );
  }
}

Filter.propTypes = {
  // updateFilters is a function and this is required!
  updateFilters: PropTypes.func.isRequired,
  // filters is an array.
  filters: PropTypes.array,
}

const mapStateToProps = (state) => ({
  filters: state.filters.items,
})

// Filter is a UI component
export default connect(
  // mapStateToProps used for convert state into own props
  /* 
    updateFilters is the actions written in ../../store/actions/filterActions
    connect conbine this action with Filter's props
  */  
  mapStateToProps, { updateFilters }
  )(Filter);