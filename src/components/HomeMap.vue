<template>
    <div  id="map" class="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import  L from 'leaflet'
import theft from '../icons/theft.svg'
import robbery from "../icons/robbery2.svg";
import homicide from "../icons/murder.png";
import burglary from "../icons/burglary2.svg";
import motorVehicleTheft from "../icons/cartheft.svg";
import theftOther from "../icons/theftOther.png";
import rape from "../icons/rape.png";
import adw from "../icons/shooting.png";
import theftfromauto from "../icons/theftFromAuto.png";
import arson from '../icons/arson.png'
// grouped layer import
import 'leaflet-groupedlayercontrol';
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css';
import 'heatmap.js'
import "leaflet.heat";
 let customIcon = L.Icon.extend({
        iconSize: [30,30]
      })
var robberyIcon 
export default {
  props: ["mapdata", "filteredCrime", "newZoom"],
  computed: {
    points() {
      return this.mapdata.map(x => {
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
    newZoom: ['centerOnMarker'],
    filteredCrime: ['filterIcons']
  },
  data() {
    return {
      map: null,
      zoom: 14.25,
      gotham: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      gotham_attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      center: [38.8931304, -77.0105247],                    
      timeTwoWeeksAgo: null,
      isLoading: false,
      robbery: robbery,
      burglary: burglary,
      car: motorVehicleTheft,
      theftOther: theftOther,
      rape: rape,
      adw: adw,
      theftAuto: theftfromauto,
      homicide: homicide,
      arson: arson,
      groups : {
        Icons: new L.LayerGroup,
        HeatMap : new L.LayerGroup
      }
    };
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    filterIcons(){
      console.log('filtering')
      this.points.forEach(el => {
        el.offense === 'ROBBERY'
         this.map.removeLayer(robberyIcon)
      })
    },
    createIcons() {
      this.points.forEach(element => {
        let crime = element.offense
          switch (crime) {
            case 'ROBBERY':
              robberyIcon = new customIcon({iconUrl:robbery})

                L.marker([element.lat, element.lng], {
                icon: robberyIcon,
              }).bindPopup(element.offense).addTo(this.groups.Icons)
              break;
            case 'THEFT/OTHER':
              var theftOtherIcon = new customIcon({iconUrl:this.theftOther})
              L.marker([element.lat, element.lng], {
              icon: theftOtherIcon
              }).addTo(this.groups.Icons).bindPopup(element.offense)
                break;
            case 'MOTOR VEHICLE THEFT':
              var moterTheftIcon = new customIcon({iconUrl:motorVehicleTheft})
              L.marker([element.lat, element.lng], {
              icon: moterTheftIcon,
              iconSize:[30,30]
              }).addTo(this.groups.Icons).bindPopup(element.offense)
                break;
            case 'ASSAULT W/DANGEROUS WEAPON':
              var assaultWeapon = new customIcon({iconUrl:adw})
              L.marker([element.lat, element.lng], {
              icon: assaultWeapon
              }).addTo(this.groups.Icons).bindPopup(element.offense)
               break;
            case 'THEFT F/AUTO':
              var theftFromAuto = new customIcon({iconUrl:theftfromauto})
              L.marker([element.lat, element.lng], {
              icon: theftFromAuto
              }).addTo(this.groups.Icons).bindPopup(element.offense)
                break;
            case 'BURGLARY':
              var burglaryIcon = new customIcon({iconUrl:burglary})
              L.marker([element.lat, element.lng], {
              icon: burglaryIcon
            }).addTo(this.groups.Icons).bindPopup(element.offense)
              break;
            case 'ARSON':
            var arsonIcon = new customIcon({iconUrl:arson})
            L.marker([element.lat, element.lng], {
            icon: arsonIcon
          }).addTo(this.groups.Icons).bindPopup(element.offense)
            break;
            case 'SEX ABUSE':
            var sexabuseIcon = new customIcon({iconUrl:rape})
            L.marker([element.lat, element.lng], {
            icon: sexabuseIcon
          }).addTo(this.groups.Icons).bindPopup(element.offense)
            break;
            case 'HOMICIDE':
            var homicideIcon = new customIcon({iconUrl:homicide})
            L.marker([element.lat, element.lng], {
            icon: homicideIcon
          }).addTo(this.groups.Icons).bindPopup(element.offense)
            break;
            default:
              break;
        }          
      });
    },
    centerOnMarker(){
      this.map.panTo(this.newZoom);
    },
    initMap: function () {
      console.log('L', L)
      console.log('points', this.points)

      const basemaps = {
          Streets: L.tileLayer(this.url, {
          maxZoom: 19,
          attribution: this.attribution
        }),
          Gotham: L.tileLayer(this.gotham, {
          maxZoom: 18,
          attribution: this.gotham_attribution
        }),
      }
    
     this.map = L.map('map', {
       zoomControl: false,
          center: this.center,
          zoom : this.zoom,
          layers: [basemaps.Streets, this.groups.Icons],
      })
      this.createIcons()
      
      var groupedOverlays = {
        "Maps": {
          "Icons": this.groups.Icons,
          "Heat Map": this.groups.HeatMap
        },
      };

      var options = {
        position: 'bottomleft',
        collapsed: false,
        exclusiveGroups: ["Maps"], 
      };
      
      L.control.groupedLayers(basemaps, groupedOverlays, options).addTo(this.map);


    },
    initHeatLayer() {
        L.heatLayer(this.points, {
          radius: 10,
          minOpacity: 1 ,
          gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
          
        }).addTo(this.groups.HeatMap)
    }
  },
  mounted() {
      this.initMap();
      this.initHeatLayer()
  },
};

</script>

<style scoped>
.map {
  height: 50vh
}

</style>