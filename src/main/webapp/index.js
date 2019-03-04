
import React from 'react';
import ReactDOM from 'react-dom';

import MapContainer from "./components/MapContainerComponent";



const Container = (
    <MapContainer/>
);
const mountNode = document.querySelector('#app');
ReactDOM.render(Container, mountNode);

