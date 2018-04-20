import GoogleMapsLoader from 'google-maps';
import 'leaflet.gridlayer.googlemutant';

const GOOGLE_LAYER_TYPES = {
  ROADMAP: "ROADMAP",
  SATELLITE: "SATELLITE",
  TERRAIN: "TERRAIN",
  HYDRID: "HYDRIDd"
};

L.GridLayer.GoogleSubMutant = L.GridLayer.GoogleMutant.extend({
  initialize: function (options) {
    L.GridLayer.GoogleMutant.prototype.initialize.call(this, options);

    var self = this;

    if (options.asClientId) {
      GoogleMapsLoader.CLIENT = options.googleKey;
      GoogleMapsLoader.VERSION = options.version;
    } else {
      GoogleMapsLoader.KEY = options.googleKey;
    }

    if (options.language) {
      GoogleMapsLoader.LANGUAGE = options.language;
    }

    if (options.region) {
      GoogleMapsLoader.REGION = options.region;
    }

    GoogleMapsLoader.LIBRARIES = options.libraries || [];

    self._type = options.type.toUpperCase() || GOOGLE_LAYER_TYPES.SATELLITE;

    GoogleMapsLoader.load(function (google) {
      self._ready = true;
      self._initMutant();
      self._update();

      if (options.onAfterLoad) {
        options.onAfterLoad(google);
      }
    });

  },
});

L.gridLayer.googleSubMutant = function (options) {
  return new L.GridLayer.GoogleSubMutant(options);
};

