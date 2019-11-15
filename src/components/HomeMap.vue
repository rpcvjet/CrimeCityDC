<template>
    <div>
    <NavBar v-bind:points="offense"></NavBar>
    <div id="map"></div>
    </div>
</template>

<script>
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
const url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/1/query?where=WARD='6' AND REPORT_DAT > CURRENT_TIMESTAMP - INTERVAL '7' DAY&outFields=REPORT_DAT,SHIFT,METHOD,WARD,OFFENSE,BLOCK,DISTRICT,NEIGHBORHOOD_CLUSTER,BLOCK_GROUP,CENSUS_TRACT,LATITUDE,LONGITUDE,BID,START_DATE,END_DATE,OBJECTID,VOTING_PRECINCT&outSR=4326&f=json"
import axios from 'axios';
import moment from 'moment';
import NavBar from './NavBar.vue'

export default {
    data() {
        return {
            map: null,
            data: null,
            timeTwoWeeksAgo : null,
            points: null
        }
    },
    mounted() {
        this.getTime()
        this.map = L.map('map').setView([38.9072, -77.0369], 13);
        //attribution tile
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
         attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
       
     
    },
    created() {
        axios.get(url).then(res => {
            this.data = res.data.features;
            this.points = this.data.map(x => {
                let points = {
                    latlng: [x.attributes.LATITUDE,x.attributes.LONGITUDE],
                    offense: x.attributes.OFFENSE, 
                    report_date: x.attributes.REPORT_DAT,
                }
                L.marker(points.latlng).addTo(this.map).bindPopup(points.offense)
            })
        }).catch(err => {
            console.log('err', err)
        })

    },
    methods: {
        getTime(){
            let twoWeeksAgo = moment().subtract(14, 'days').valueOf()
            this.timeTwoWeeksAgo = twoWeeksAgo
        }
    },
    components:{
        NavBar
    }
}
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>