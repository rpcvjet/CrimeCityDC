<template>
  <div>
    <l-map ref="mymap" :zoom="zoom" :center="center" id="map" :options="{zoomControl: false}">
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
         <l-icon
          v-if="crime.offense === 'ARSON'"
          :icon-size="crime.iconSize"
          :icon-url="arson"
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
  LLayerGroup,
} from "vue2-leaflet";
import robbery from "../icons/robbery.png";
import homicide from "../icons/murder.png";
import burglary from "../icons/theft.svg";
import car from "../icons/car.svg";
import theftOther from "../icons/theftOther.png";
import rape from "../icons/rape.png";
import adw from "../icons/shooting.png";
import theftfromauto from "../icons/theftFromAuto.png";
import arson from '../icons/arson.png'
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
    newZoom: ['centerOnMarker'],
  },
  data() {
    return {
      zoom: 14.25,
      center: [38.8931304, -77.0105247],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
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
      arson: arson,
    };
  },
  beforeDestroy() {
    if (this.$refs.mymap) {
      this.$refs.mymap.remove();
    }
  },
  methods: {
    centerOnMarker(){
      this.$refs.mymap.mapObject.panTo(this.newZoom);
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
  }
};
</script>
