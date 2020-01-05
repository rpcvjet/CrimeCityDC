<template>
  <div class="content">

        <NavBar class="mynav"></NavBar>
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
const url = "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/1/query?where=WARD='6' AND REPORT_DAT > CURRENT_TIMESTAMP - INTERVAL '7' DAY&outFields=REPORT_DAT,SHIFT,METHOD,WARD,OFFENSE,BLOCK,DISTRICT,NEIGHBORHOOD_CLUSTER,BLOCK_GROUP,CENSUS_TRACT,LATITUDE,LONGITUDE,BID,START_DATE,END_DATE,OBJECTID,VOTING_PRECINCT&outSR=4326&f=json"
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
body{
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

html {
  height: 100%
}
/* DEFAULT/MOBILE */
.content {
  display: grid;
  height:100%;
/* 1 column grid */
  grid-template-columns: repeat(1, 1fr); 
  /* predifne row area */
  grid-auto-rows: 10% 40% 40% 10%;
 grid-template-areas:
 "navbar"
 "leafmap"
 "aggrid-area"
 "foot"
}

/* DESKTOP */
@media screen and (min-width: 760px) {
.content {
  margin: 0;
  padding: 0;
  display: grid;
  height:100%;
/* 2 columns grid */
  grid-template-columns: repeat(2, 1fr); 
  /* predifne row area */
  grid-auto-rows: 10% 80% 10%;
 grid-template-areas:
 "navbar navbar"
 "leafmap aggrid-area"
 "foot foot"

}
  
}

.mynav {
  background-color: red;
  grid-area: navbar;
}

.leafmap {
  /* background-color: blue; */
  grid-area: leafmap;
}

.aggrid-area {
  /* background-color: purple; */
  grid-area: aggrid-area;
  overflow: auto;
}

.foot {
   background-color: orange;
   grid-area: foot;
}





</style>


