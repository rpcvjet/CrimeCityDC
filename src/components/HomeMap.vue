<template>
  <div>
    <!-- <div class="load" v-if="isLoading">
        <b-notification class="load" :closeable="false" >
      <b-loading  :is-full-page="false"  :active.sync="isLoading"></b-loading>

        </b-notification>
    </div>
    <div v-else> -->
    <div id="map">
        </div>    
    <!-- </div> -->
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import moment from "moment";

export default {
  props: ["mapdata"],
  data() {
    return {
      map: null,
      timeTwoWeeksAgo: null,
      points: null,
      isLoading: false
    };
  },
  watch: {
     mapdata: 'getPoints'
  },
  mounted() {
    this.getTime();
    this.initMap();
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
    initMap() {
      this.isLoading = true
      this.map = L.map("map").setView([38.9072, -77.0369], 13);

      //attribution tile
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },
    getPoints() {
        console.log('calling function')
        this.points = this.mapdata.map(x => {
        let points = {
            latlng: [x.attributes.LATITUDE, x.attributes.LONGITUDE],
            offense: x.attributes.OFFENSE,
            report_date: x.attributes.REPORT_DAT
        };
        L.marker(points.latlng)
            .addTo(this.map)
            .bindPopup(points.offense);
        });
    }
  }
};
</script>

<style scoped>
#map{
  /* width: 100%; */
  height: 100%;
}

.load {
    height: 100%
}
</style>