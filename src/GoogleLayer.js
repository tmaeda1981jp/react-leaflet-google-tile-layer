import PropTypes from 'prop-types'
import { GridLayer, withLeaflet } from 'react-leaflet'
import LeafletGoogleLayer from './L.GridLayer.GoogleSubMutant'

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

class GoogleLayer extends GridLayer {
  static propTypes = {
    googleKey: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(GOOGLE_LAYER_TYPES).map(key => GOOGLE_LAYER_TYPES[key])),
    additionalGoogleLayer: PropTypes.oneOf(
      Object.keys(ADDITIONAL_GOOGLE_LAYERS).map(key => ADDITIONAL_GOOGLE_LAYERS[key])
    ),
    asClientId: PropTypes.bool,
    language: PropTypes.string,
    region: PropTypes.string,
    libraries: PropTypes.array,
  }

  static defaultProps = {
    type: GOOGLE_LAYER_TYPES.TERRAIN,
  }

  static contextTypes = GridLayer.contextTypes
  static childContextTypes = GridLayer.childContextTypes

  createLeafletElement(props) {
    const { additionalGoogleLayer } = props
    const layer = LeafletGoogleLayer(props)

    if (additionalGoogleLayer) {
      layer.addGoogleLayer(additionalGoogleLayer)
    }

    return layer
  }

  componentDidUpdate(prevProps) {
    const { opacity, zIndex } = this.props
    if (opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== prevProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }
}

export default withLeaflet(GoogleLayer)
