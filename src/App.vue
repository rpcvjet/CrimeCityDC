<template>
  <div>

        <NavBar ></NavBar>
        <HomeMap class="leafmap" :mapdata="this.data"></HomeMap>
        <Grid class="aggrid-area" :griddata="this.data"> </Grid>
        <Footer class="foot"></Footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HomeMap from "./components/HomeMap.vue";
import Footer from "./components/Footer.vue";
import Grid from './components/Grid.vue';
const url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/2/query?where=WARD='6' AND REPORT_DAT > CURRENT_TIMESTAMP - INTERVAL '7' DAY&outFields=REPORT_DAT,SHIFT,METHOD,WARD,OFFENSE,BLOCK,DISTRICT,NEIGHBORHOOD_CLUSTER,BLOCK_GROUP,CENSUS_TRACT,LATITUDE,LONGITUDE,BID,START_DATE,END_DATE,OBJECTID,VOTING_PRECINCT&outSR=4326&f=json"
import axios from 'axios';

export default {
  data() {
    return {
      data: null,
      griddata: null
    }
  },
  methods: {
    getData() {
    axios.get(url).then(res => {
            this.data = res.data.features;
            
        }).catch(err => {
            console.log('err', err)
        })
    }
  },
created(){
    this.getData()
  },
  components: {
    HomeMap,
    Footer,
    NavBar,
    Grid
  }
};
</script>


<style>
html, body {
  height: 100%
}

.leafmap {
}

</style>


