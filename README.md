# react-leaflet-google [![npm version](https://img.shields.io/badge/npm-5.4.0-blue.svg)](https://www.npmjs.com/package/react-leaflet-google) [![Greenkeeper badge](https://badges.greenkeeper.io/skyeer/react-leaflet-google-tile-layer.svg)](https://greenkeeper.io/)

GoogleMaps layer as React component for Leaflet build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet). 

The google maps layer is using the plugin from [Leaflet.GridLayer.GoogleMutant](https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant) 

Also it uses [google-maps](https://www.npmjs.com/package/google-maps), a wrapper for asynchronously download Google Maps API in the browser.

![Example](images/example.gif)

# Getting started

```
import { Map, TileLayer, LayersControl } from 'react-leaflet'
import GoogleLayer, { GOOGLE_LAYER_TYPES, ADDITIONAL_GOOGLE_LAYERS } from '../src'

const { BaseLayer } = LayersControl;
const key = 'Your Key goes here';
const settings = {
  center: [42.09618442380296, -71.5045166015625],
  zoom: 2,
}

....
  <Map {...settings}>  
    <LayersControl position="topright">
      <BaseLayer checked name='Google Maps Roadmap'>
        <GoogleLayer 
          googleKey={KEY} 
          maxZoom={MAX_ZOOM} 
          type={GOOGLE_LAYER_TYPES.ROADMAP} 
        />
      </BaseLayer>
    </LayersControl>
  </Map>
```

# Layers 

```
export const ADDITIONAL_GOOGLE_LAYERS = {
  TRAFFIC_LAYER: 'TrafficLayer',
  TRANSIT_LAYER: 'TransitLayer',
}

export const GOOGLE_LAYER_TYPES = {
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain',
  HYDRID: 'hybrid',
}
```

For more details on how to use this plugin check the example.
