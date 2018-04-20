import React, { Component } from "react";
import { Map, TileLayer, LayersControl } from "react-leaflet";
import GoogleLayer, {
  GOOGLE_LAYER_TYPES,
  ADDITIONAL_GOOGLE_LAYERS
} from "../src";
const { BaseLayer } = LayersControl;

const MAX_ZOOM = 24;
const KEY = "AIzaSyDEG4lyorD61vnJoAHG0FkQERZ-McElZyg";
const STYLES = [
  { elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "water", stylers: [{ color: "#444444" }] },
  { featureType: "landscape", stylers: [{ color: "#eeeeee" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", stylers: [{ visibility: "off" }] }
];

const VARIANTS = [
  { name: 'Roadmap', type: GOOGLE_LAYER_TYPES.ROADMAP },
  { name: 'Satellite', type: GOOGLE_LAYER_TYPES.SATELLITE },
  { name: 'Terrain', type: GOOGLE_LAYER_TYPES.TERRAIN },
  { name: 'Hybrid', type: GOOGLE_LAYER_TYPES.HYDRID },
  { name: 'Styles', type: GOOGLE_LAYER_TYPES.ROADMAP, styles: STYLES },
  { name: 'Traffic', type: GOOGLE_LAYER_TYPES.ROADMAP, additionalGoogleLayer: ADDITIONAL_GOOGLE_LAYERS.TRAFFIC_LAYER },
  { name: 'Transit', type: GOOGLE_LAYER_TYPES.ROADMAP, additionalGoogleLayer: ADDITIONAL_GOOGLE_LAYERS.TRANSIT_LAYER },
];

export default class GoogleExample extends React.Component {
  render() {
    return (
      <Map
        center={[42.09618442380296, -71.5045166015625]}
        zoom={2}
        zoomControl={true}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OSM">
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          {VARIANTS.map((item, key) => (
            <BaseLayer name={item.name} key={key}>
              <GoogleLayer googleKey={KEY} maxZoom={MAX_ZOOM} {...item} />
            </BaseLayer>
          ))}
        </LayersControl>
      </Map>
    );
  }
}
