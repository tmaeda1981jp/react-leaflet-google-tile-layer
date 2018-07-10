import L from 'leaflet'
import GoogleMapsLoader from 'google-maps'
import 'leaflet.gridlayer.googlemutant'

const GOOGLE_LAYER_TYPES = {
  ROADMAP: 'ROADMAP',
  SATELLITE: 'SATELLITE',
  TERRAIN: 'TERRAIN',
  HYDRID: 'HYDRIDd',
}

const fadeDuration = 200
const gridProto = L.GridLayer.prototype
const onRemoveProto = gridProto.onRemove
const onAddProto = gridProto.onAdd
const originalInitTile = gridProto._initTile

L.GridLayer.include({
  _initTile: function(tile) {
    originalInitTile.call(this, tile)
    tile.style.transform = 'scale(1)'
  },

  onAdd: function(map) {
    if (this._fadeOutTime) {
      var now = performance.now() || +new Date()
      L.Util.cancelAnimFrame(this._fadeOutFrame)
      this._fadeOutTime = now + fadeDuration - this._fadeOutTime + now
      L.Util.requestAnimFrame(this._fadeIn, this)
    } else {
      onAddProto.call(this, map)
    }
  },

  onRemove: function() {
    if (this._fadeOutTime) {
      var now = performance.now() || +new Date()
      this._fadeOutTime = now + fadeDuration - this._fadeOutTime + now
    }
    this._fadeOutTime = (performance.now() || +new Date()) + fadeDuration * 2
    this._fadeOutMap = this._map
    L.Util.requestAnimFrame(this._fadeOut, this)
  },

  _fadeOut: function() {
    if (!this._fadeOutTime || !this._container) {
      return
    }
    var now = performance.now() || +new Date()
    var opacity = Math.min((this._fadeOutTime - now) / fadeDuration, 1)
    if (opacity < 0) {
      this._fadeOutTime = false
      onRemoveProto.call(this, this._fadeOutMap)
      return
    }

    L.DomUtil.setOpacity(this._container, opacity * this.options.opacity)
    this._fadeOutFrame = L.Util.requestAnimFrame(this._fadeOut, this)
  },

  _fadeIn: function _fadeIn() {
    if (!this._fadeOutTime || !this._container) {
      return
    }

    var now = performance.now() || +new Date()
    var opacity = (now - this._fadeOutTime) / fadeDuration

    if (opacity > 1) {
      this._fadeOutTime = false
      return
    }

    L.DomUtil.setOpacity(this._container, opacity * this.options.opacity)

    L.Util.requestAnimFrame(this._fadeIn, this)
  },
})

L.GridLayer.GoogleSubMutant = L.GridLayer.GoogleMutant.extend({
  initialize: function(options) {
    L.GridLayer.GoogleMutant.prototype.initialize.call(this, options)

    var self = this

    if (options.asClientId) {
      GoogleMapsLoader.CLIENT = options.googleKey
      GoogleMapsLoader.VERSION = options.version
    } else {
      GoogleMapsLoader.KEY = options.googleKey
    }

    if (options.language) {
      GoogleMapsLoader.LANGUAGE = options.language
    }

    if (options.region) {
      GoogleMapsLoader.REGION = options.region
    }

    GoogleMapsLoader.LIBRARIES = options.libraries || []

    self._type = options.type.toUpperCase() || GOOGLE_LAYER_TYPES.SATELLITE

    GoogleMapsLoader.load(function(google) {
      self._ready = true
      self._initMutant()
      self._update()

      if (options.onAfterLoad) {
        options.onAfterLoad(google)
      }
    })
  },
})

L.gridLayer.googleSubMutant = function(options) {
  return new L.GridLayer.GoogleSubMutant(options)
}

export default L.gridLayer.googleSubMutant
