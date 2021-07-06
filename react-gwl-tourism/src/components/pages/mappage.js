import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {something} from '../../constants';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
<iframe src={"https://www.google.com/maps/embed?pb="+something} width="100%" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>      </div>
    );
  }
}
 
export default SimpleMap;