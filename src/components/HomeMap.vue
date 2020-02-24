<template>
  <div>
    <l-map :zoom="zoom" :center="center" id="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="[crime.lat, crime.lng]" v-for="(crime, index) in points" :key="index">
              <l-popup>{{crime.offense}}</l-popup>   
        <l-icon v-if="crime.offense === 'ROBBERY' " :icon-size="crime.iconSize" :icon-url="robbery"></l-icon>
        <l-icon v-if="crime.offense === 'BURGLARY' " :icon-size="crime.iconSize" :icon-url="burglary"></l-icon>
        <l-icon v-if="crime.offense === 'MOTOR VEHICLE THEFT'" :icon-size="crime.iconSize" :icon-url="car"></l-icon>
        <l-icon v-if="crime.offense === 'THEFT/OTHER'" :icon-size="crime.iconSize" :icon-url="theftOther"></l-icon>
        <l-icon v-if="crime.offense === 'SEX ABUSE'" :icon-size="crime.iconSize" :icon-url="rape"></l-icon>
        <l-icon v-if="crime.offense === 'ASSAULT W/DANGEROUS WEAPON'" :icon-size="crime.iconSize" :icon-url="adw"></l-icon>
        <l-icon v-if="crime.offense === 'THEFT F/AUTO'" :icon-size="crime.iconSize" :icon-url="theftAuto"></l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { L, LMap, LTileLayer, LMarker, LIcon, LPopup, LLayerGroup } from "vue2-leaflet";
import robbery from "../assets/robbery.png";
import burglary from "../assets/theft.svg";
import car from "../assets/car.svg";
import theftOther from "../assets/theftOther.png";
import rape from "../assets/rape.png"
import adw from '../assets/shooting.png';
import theftfromauto from '../assets/theftFromAuto.png'
import moment from "moment";

export default {
  props: ["mapdata", "filteredCrime"],
  data() {
    return {
      zoom: 14.25,
      center: [38.8931304, -77.0105247],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      map: null,
      timeTwoWeeksAgo: null,
      points: null,
      isLoading: false,
      robbery: robbery,
      burglary: burglary,
      car: car,
      theftOther: theftOther,
      rape: rape,
      adw: adw,
      theftAuto: theftfromauto,
    };
  },
  watch: {
    mapdata: ["getPoints"],
    // filteredCrime: ["getPoints"]
  },
  mounted() {
    this.getTime();
    // this.getPoints();
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    getTime() {
      let twoWeeksAgo = moment()
        .subtract(14, "days")
        .valueOf();
      this.timeTwoWeeksAgo = twoWeeksAgo;
    },
    getPoints() {
      // console.log('something has happend')
      this.points = this.mapdata.map(x => {
        let data = {
          lat: x.attributes.LATITUDE,
          lng: x.attributes.LONGITUDE,
          offense: x.attributes.OFFENSE,
          iconSize: x.iconSize
        };
        // console.log(data.iconSize)
        return data;
      });
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    // LLayerGroup
  }
};
</script>

<style scoped>
#map {
  width: 100px;
  min-height: 480px;
  /* min-height: 100%; */
  min-width: 100%;
  display: block;
}

.load {
  height: 100%;
}
</style>