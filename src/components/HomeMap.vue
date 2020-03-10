<template>
  <div class="holder">
    <l-map :zoom="zoom" :center="center" id="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        :lat-lng="[crime.lat, crime.lng]"
        v-for="(crime, index) in points"
        :key="index"
      >
        <l-popup>{{crime.offense}}</l-popup>
        <l-icon
          v-if="crime.offense === 'ROBBERY'"
          :icon-size="crime.iconSize"
          :icon-url="robbery"
        ></l-icon>
        <l-icon
          v-if="crime.offense === 'BURGLARY'"
          :icon-size="crime.iconSize"
          :icon-url="burglary"
        ></l-icon>
        <l-icon
          v-if="crime.offense === 'MOTOR VEHICLE THEFT'"
          :icon-size="crime.iconSize"
          :icon-url="car"
        ></l-icon>
        <l-icon
          v-if="crime.offense === 'THEFT/OTHER'"
          :icon-size="crime.iconSize"
          :icon-url="theftOther"
        ></l-icon>
        <l-icon
          v-if="crime.offense === 'SEX ABUSE'"
          :icon-size="crime.iconSize"
          :icon-url="rape"
        ></l-icon>
        <l-icon
          v-if="crime.offense === 'ASSAULT W/DANGEROUS WEAPON'"
          :icon-size="crime.iconSize"
          :icon-url="adw"
        ></l-icon>
        <l-icon
          v-if="crime.offense === 'THEFT F/AUTO'"
          :icon-size="crime.iconSize"
          :icon-url="theftAuto"
        ></l-icon>
         <l-icon
          v-if="crime.offense === 'HOMICIDE'"
          :icon-size="crime.iconSize"
          :icon-url="homicide"
        ></l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  L,
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LLayerGroup
} from "vue2-leaflet";
import robbery from "../assets/robbery.png";
import homicide from "../assets/murder.png";
import burglary from "../assets/theft.svg";
import car from "../assets/car.svg";
import theftOther from "../assets/theftOther.png";
import rape from "../assets/rape.png";
import adw from "../assets/shooting.png";
import theftfromauto from "../assets/theftFromAuto.png";
import moment from "moment";

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
          iconSize: x.iconSize
        };
        return data;
      });
    },
  },
  watch: {
    newZoom: ['centerOnMarker']
  },
  data() {
    return {
      zoom: 14.25,
      center: [38.8931304, -77.0105247],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      map: null,
      timeTwoWeeksAgo: null,
      isLoading: false,
      robbery: robbery,
      burglary: burglary,
      car: car,
      theftOther: theftOther,
      rape: rape,
      adw: adw,
      theftAuto: theftfromauto,
      homicide: homicide,
      zoomSelected:null
    };
  },
 
  mounted() {
    this.getTime();
  },

  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    centerOnMarker(){
      this.center = this.newZoom
      this.zoom = 15.75
    },
    getTime() {
      let twoWeeksAgo = moment()
        .subtract(14, "days")
        .valueOf();
      this.timeTwoWeeksAgo = twoWeeksAgo;
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup
  }
};
</script>

<style scoped>
@media all and (max-width:400px) {

  #map {
  width: 110px;
  min-height: 1000px;
  /* min-height: 100%; */
  min-width: 100%;
  display: block;
  }
}

@media all and (min-width: 401px) {

#map {
  width: 110px;
  min-height: 510px;
  min-width: 100%;
  display: block;
}




}

.load {
  height: 100%;
}
</style>
