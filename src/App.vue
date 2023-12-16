<template>
  <div class="wrapper">
    <NavBar class="mynav item" :offense="this.data" @filteredCrime="selectedCrime" @filteredTime="selectedTime" @filteredBlock="selectedBlock" ></NavBar>
    <HomeMap
      v-if="this.filteredData.length > 0"
      class="leafmap item"
      :mapdata="this.filteredData"
      :filteredCrime="this.filteredCrime"
      :newZoom="this.newZoom"
    ></HomeMap> 
  
    <Grid
      class="grid item"
      :griddata="this.filteredData"
      @mouse-over-crime="mouseOverCrime"
      @mouse-leave-crime="mouseLeaveCrime"
      @zoomtoicon="getZoom"
    >
    </Grid> 
    <cookie-law theme="dark-lime"></cookie-law>
    <Footer class="item footer"></Footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HomeMap from "./components/HomeMap.vue";
import Footer from "./components/Footer.vue";
import Grid from "./components/Grid.vue";
import CookieLaw from 'vue-cookie-law'
const url =
  "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/5/query?where=WARD='6' AND REPORT_DAT > CURRENT_TIMESTAMP - INTERVAL '14' DAY&outFields=REPORT_DAT,SHIFT,METHOD,WARD,OFFENSE,BLOCK,DISTRICT,NEIGHBORHOOD_CLUSTER,BLOCK_GROUP,CENSUS_TRACT,LATITUDE,LONGITUDE,BID,START_DATE,END_DATE,OBJECTID,VOTING_PRECINCT&outSR=4326&f=json";
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      filteredData:[],
      normalIcon: [30, 30],
      largeIcon: [60, 60],
      filteredCrime: null,
      filteredTime:null,
      filteredBlock: null,
      newZoom: null,
    };
  },
  methods: {
    getData() {
      axios
        .get(url)
        .then(res => {
          this.data = res.data.features.map((r, idx) => {
            r.iconSize = this.normalIcon;
            r.attributes.arrayIndex = idx;
            return r;
          });
          this.filteredData = this.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    mouseOverCrime(index) {
      this.data[index].iconSize = this.largeIcon;
    },
    mouseLeaveCrime(index) {
      this.data[index].iconSize = this.normalIcon;
    },
    getZoom(zoom){
      this.newZoom = zoom
    },
    selectedCrime(event) {
      if(event === 'DAY' || event === 'EVENING' || event === 'MIDNIGHT') {
        this.filteredTime = event
      } else  {
        this.filteredCrime = event;
      }
           
      if(event === null) {
        this.filteredData = this.data
      } 
      else {
        this.filteredData = this.data.filter( crime => {
          let offense = crime.attributes.OFFENSE !== "" || null ? crime.attributes.OFFENSE === this.filteredCrime: true;      
          return offense
        })
      }
    },
    selectedTime(event){
      this.filteredTime = event
       if(event === null) {
        this.filteredData = this.data
      }
      else {
        this.filteredData = this.data.filter( crime => {
            let timeofCrime =  crime.attributes.SHIFT !== "" || null ? crime.attributes.SHIFT === this.filteredTime: true;
            this.filteredCrime = null
            return timeofCrime
        })
      }

    },
      selectedBlock(event){
      this.filteredBlock = event
       if(event === null) {
        this.filteredData = this.data
      }
      else {
        this.filteredData = this.data.filter( crime => {
            let block =  crime.attributes.BLOCK !== "" || null ? crime.attributes.BLOCK === this.filteredBlock: true;
            this.filteredCrime = null;
            return block
        })
      }
    },
    selectedOverlay(mapchoice) {
      this.overlay = mapchoice
    }

  },
  created() {
    this.getData();
  },
  components: {
    HomeMap,
    Footer,
    NavBar,
    Grid,
    CookieLaw
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

html {
  box-sizing: border-box;

}

*,
*:before,
*:after {
  box-sizing: inherit;
}


.wrapper {
  display: flex;
  flex-direction: column;
}

.mynav {
  height: 80%;
}

/* .leafmap {
  height: 50vh
} */

.grid {
  height: calc(100vh - 150px);
  overflow-y: auto;
  margin-top:0px;

}

/* Mobile Iphone Pro 14 */
@media all and (max-width: 430px) { 

.grid {
 display:none
  }

.leafmap {
  height: 92.5vh !important;
  }

}

/* Mobile Iphone Pro 12 */
@media all and (max-width: 390px) { 

.grid {
 display:none
  }

.leafmap {
  height: 91.5vh !important;
  }

}



/* IPad/Ipad Pro */
@media all and (min-width: 768px) { 

.grid {
  /* border: 1px solid blue; */
  height: calc(54vh - 136px);
  overflow-y: auto;

}

}

/* Xrtra large screens */
@media all and (min-width: 1441px) { 

.grid {
  height: calc(54vh - 136px);
  overflow-y: auto;

}

}


</style>
