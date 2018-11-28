import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
  <div style = { {
    color: 'white', 
    background: 'red',
    padding: '10px 1px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  } }>
    { text }
  </div>
);

class GoogleMap extends Component {
  static defaultProps = {
    center: {lat: 42.444966, lng: -76.48289},
    zoom: 16
  };

  render() {
    return (
       <GoogleMapReact
        bootstrapURLKeys = { { key: 'AIzaSyAoyK0y4YHSXwgW9M-qYAZqCio_Bj7z9xE' } }
        defaultCenter = { this.props.center }
        defaultZoom = { this.props.zoom }
      >
        <AnyReactComponent 
          lat = { 42.444966 } 
          lng = { -76.48289 } 
          text = { 'Cornell' } 
        />
      </GoogleMapReact>
    );
  }
}

export default GoogleMap;