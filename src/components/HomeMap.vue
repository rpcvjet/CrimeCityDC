<template>
  <div id="map" class="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import theft from "../icons/theft.svg";
import robbery from "../icons/robbery2.svg";
import homicide from "../icons/murder.png";
import burglary from "../icons/burglary2.svg";
import motorVehicleTheft from "../icons/cartheft.svg";
import theftOther from "../icons/theftOther.png";
import rape from "../icons/rape.png";
import adw from "../icons/shooting.png";
import theftfromauto from "../icons/theftFromAuto.png";
import arson from "../icons/arson.png";
// grouped layer import
import "leaflet-groupedlayercontrol";
import "leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css";
import "heatmap.js";
import "leaflet.heat";
let customIcon = L.Icon.extend({
  iconSize: [30, 30],
});

export default {
  props: ["mapdata", "filteredCrime", "newZoom"],
  computed: {
    points() {
      return this.mapdata.map((x) => {
        let data = {
          lat: x.attributes.LATITUDE,
          lng: x.attributes.LONGITUDE,
          offense: x.attributes.OFFENSE,
          method: x.attributes.METHOD,
          iconSize: x.iconSize,
        };
        return data;
      });
    },
  },
  watch: {
    newZoom: ["centerOnMarker"],
    mapdata: ["filterIcons"],
  },
  data() {
    return {
      map: null,
      zoom: 14.25,
      gotham:
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      gotham_attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      center: [38.8931304, -77.0105247],
      timeTwoWeeksAgo: null,
      isLoading: false,
      groups: {
        Icons: new L.LayerGroup(),
        HeatMap: new L.LayerGroup(),
      },
      markers: [],
      icons: {
        arson: new customIcon({ iconUrl: arson }),
        assualtWeapon: new customIcon({ iconUrl: adw }),
        burglary: new customIcon({ iconUrl: burglary }),
        homicide: new customIcon({ iconUrl: homicide }),
        motorTheft: new customIcon({ iconUrl: motorVehicleTheft }),
        robbery: new customIcon({ iconUrl: robbery }),
        sexAbuse: new customIcon({ iconUrl: rape }),
        theftOther: new customIcon({ iconUrl: theftOther }),
        theftFromAuto: new customIcon({ iconUrl: theftfromauto }),
      },
    };
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    filterIcons() {
      let vm = this;
      this.groups.Icons.eachLayer(function(layer) {
        vm.groups.Icons.removeLayer(layer)
      });
      this.createIcons();
    },
    getIcon(crime) {
      let icon;
      switch (crime) {
        case "ROBBERY":
          icon = this.icons.robbery;
          break;
        case "THEFT/OTHER":
          icon = this.icons.theftOther;
          break;
        case "MOTOR VEHICLE THEFT":
          icon = this.icons.motorTheft;
          break;
        case "ASSAULT W/DANGEROUS WEAPON":
          icon = this.icons.assualtWeapon;
          break;
        case "THEFT F/AUTO":
          icon = this.icons.theftFromAuto;
          break;
        case "BURGLARY":
          icon = this.icons.burglary;
          break;
        case "ARSON":
          icon = this.icons.arson;
          break;
        case "SEX ABUSE":
          icon = this.icons.sexAbuse;
          break;
        case "HOMICIDE":
          icon = this.icons.homicide;
          break;
        default:
          break;
      }
      return icon;
    },
    createIcons() {
      // Cleaned up to reduce code and improve clarity.
      this.points.forEach((element) => {
        L.marker([element.lat, element.lng], {
          icon: this.getIcon(element.offense),
        }).bindPopup(element.offense).addTo(this.groups.Icons);
      });
    },
    centerOnMarker() {
      this.map.panTo(this.newZoom);
    },
    initMap: function() {
      const basemaps = {
        Streets: L.tileLayer(this.url, {
          maxZoom: 19,
          attribution: this.attribution,
        }),
        Gotham: L.tileLayer(this.gotham, {
          maxZoom: 18,
          attribution: this.gotham_attribution,
        }),
      };

      this.map = L.map("map", {
        zoomControl: false,
        center: this.center,
        zoom: this.zoom,
        layers: [basemaps.Streets, this.groups.Icons],
      });

      var groupedOverlays = {
        Maps: {
          Icons: this.groups.Icons,
          "Heat Map": this.groups.HeatMap,
        },
      };

      var options = {
        position: "bottomleft",
        collapsed: false,
        exclusiveGroups: ["Maps"],
      };

      L.control
        .groupedLayers(basemaps, groupedOverlays, options)
        .addTo(this.map);
    },
    initHeatLayer() {
      L.heatLayer(this.points, {
        radius: 10,
        minOpacity: 1,
        gradient: { 0.4: "blue", 0.65: "lime", 1: "red" },
      }).addTo(this.groups.HeatMap);
    },
  },
  mounted() {
    this.initMap();
    this.createIcons();
    this.initHeatLayer();
  },
};
</script>

<style scoped>
.map {
  height: 50vh;
}
</style>
