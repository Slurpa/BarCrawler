import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from './Map';
import {wrapper as GoogleApiComponent} from './GoogleApiComponent';


export class MapContainer extends React.Component {
    render() {
        if (!this.props.loaded) return <div>Loading...</div>;

        return (
            <Map
                centerAroundCurrentLocation
                className="map"
                google={this.props.google}
                style={{ height: '100%', position: 'relative', width: '100%' }}
                zoom={14}
            />
        );
    };
}

const Loading = () => <div>Fancy loading container</div>;

export default GoogleApiComponent({
    apiKey: __PUT_API_KEY_HERE__,
    libraries: ['places'],
    LoadingContainer: Loading
})(MapContainer)