<template>
    <div>
  <nav class="navbar navbar-expand-md navbar-light bg-info fixed-top">
  <div class="navbar-brand title text-white">6 Ward Crime
  <b-icon-info class="h3 mb-0 icon" shift-v="-2.5"  v-b-modal.info-modal aria-label="More information Icon"> </b-icon-info>
  </div>
  <button class="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#filterDropDowns" aria-controls="filterDropDowns" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="filterDropDowns">
     <div class="container">
          <b-row cols="1" cols-sm="3" class="controls" >
            <b-col>
               <b-form-select aria-label="filter select for Crime" class="filter" v-model="selected" :options="options" @change="filterMap"></b-form-select>
            </b-col>
            <b-col>
                <b-form-select aria-label="filter select for Time of Crime" class="filter" v-model="timeofCrime" :options="timeoptions" @change="filterTime"></b-form-select>
           </b-col>
           <b-col>
                <b-form-select aria-label="filter select for filter by block" class="filter" v-model="block" :options="blockoptions" @change="filterBlock"></b-form-select>
           </b-col>
          </b-row>
        </div>
  </div>
</nav>

    <b-modal id="info-modal" class="title" title="6 Ward Crime" ok-only scrollable>
    <p class="my-4">6WardCrime.com is snapshot of crime in the 6th Ward of Washington, D.C. in the last 7 days.</p>
    <img src="../icons/shooting.png" alt="shooting icon"><span>Assault W/Dangerous Weapon</span>
    <p>Knowingly or purposely causing serious bodily injury, threatening to do so, or knowingly engaging in conduct that creates a grave risk of serious bodily injury to another person.</p>
    

    <img src="../icons/robbery.png" width="40px" alt="robbery icon"> <span>Robbery</span>
    <p>The taking of anything of value from another person by force, violence or fear.</p>
    
    <img src="../icons/rape.png" alt="rape icon"><span>Sex Abuse</span>
    <br/>
    <p>Engaging in or causing another person to submit to a sexual act by force, threat or reasonable fear, involuntary impairment of 
    the person's ability to appraise or control his or her conduct, rendering that other person unconscious or under conditions 
    wherein a reasonable person would not believe that consent was freely and knowingly given.</p>

    <img src="../icons/car.svg" width="40px" alt="car icon"> <span class="title">Motor Vehicle Theft</span>
    <br/>
    <p>The theft of any self-propelled, motor driven vehicle that is primarily intended to transport persons and property on a highway.</p>
    
    <img src="../icons/murder.png" width="40px" alt="murder icon"> <span>Homicide</span>
    <br/>
    <p>Killing of another purposely, or otherwise, with malice aforethought.</p>


    <img src="../icons/theft.svg" width="40px" alt="theft icon"> <span>Burglary</span>
    <br/>
    <p>The unlawful entry of a structure, vessel, watercraft, railroad car or yard where chattels are deposited with the intent to commit any criminal offense</p> 

    <img src="../icons/theftFromAuto.png" width="40px" alt="icon of theft from automobile"><span>Theft F/Auto</span>
    <br/>
    <p>Wrongfully obtaining or using the property of another with the intent to deprive the owner of items from within a vehicle, excluding motor vehicle parts and accessories</p>

    <img src="../icons/theftOther.png" alt="icon of theft from other" width="40px"><span>Theft/Other</span>
    <br/>
    <p>A broad inclusion of Theft offenses including embezzlement, theft of services and fraud/false pretenses. The Theft/Other category excludes theft of items from a motor vehicle or the motor vehicle itself.</p>
    
    <img src="../icons/arson.png" width="40px" alt="icon of arson"><span>Arson</span>
    <br/>
    <p>The malicious burning, or attempt to burn, any structure, vessel, vehicle, railroad car or property of another</p>
    
    <h3 class="title">SHIFT</h3>
    <p>DAY (7am - 3pm)</p>
    <p>EVENING (3pm - 11pm)</p>
    <p>MIDNIGHT (11pm - 7am)</p>
  </b-modal>

</div>
</template>

<script>
export default {
  data(){
    return {
        options: [],
        timeoptions:[],
        blockoptions: [],
        selected: null,
        timeofCrime: null,
        block: null,
        selectedMap: 'icons',
        mapOptions: [
          { text: 'Icons', value: 'icons' },
          { text: 'Heat Map', value: 'heatmap' },
        ]
    }
  },    
  props:['offense'],
  watch: {
    offense: ['getFilterOptions', 'getTimeFilter', 'getBlockFilter']
  },
  methods: {
    getFilterOptions() {
      const filteredArr = this.offense.reduce((acc, current) => {
        const duplicate = acc.find(item => item.attributes.OFFENSE === current.attributes.OFFENSE);
        if(!duplicate) {
          return acc.concat([current])
        } else {
          return acc
        }  
      }, []);
      let allCrimes = [{value: null, text: 'Select to Filter/AllCrimes'}]
      let text = filteredArr.map(item => {
        return {
          value: item.attributes.OFFENSE,
          text: item.attributes.OFFENSE
        }
      });
 
      let choices = allCrimes.concat(text)
      this.options = choices
    },
    getTimeFilter() {
        const filteredArr = this.offense.reduce((acc, current) => {
        const duplicate = acc.find(item => item.attributes.SHIFT === current.attributes.SHIFT);
        if(!duplicate) {
          return acc.concat([current])
        } else {
          return acc
        }  
      }, []);

       let allTimes = [{value: null, text: 'Filter by Time of Day/All Shifts'}]

       let timecrime = filteredArr.map(item => {
        return {
          value: item.attributes.SHIFT,
          text: item.attributes.SHIFT
        }
      })
      let timechoices = allTimes.concat(timecrime)

      this.timeoptions = timechoices
    },
    getBlockFilter() {
        const filteredArr = this.offense.reduce((acc, current) => {
        const duplicate = acc.find(item => item.attributes.BLOCK === current.attributes.BLOCK);
        if(!duplicate) {
          return acc.concat([current])
        } else {
          return acc
        }  
      }, []);

       let allBlocks = [{value: null, text: 'Filter by Block/All Blocks'}]

       let block = filteredArr.map(item => {
        return {
          value: item.attributes.BLOCK,
          text: item.attributes.BLOCK
        }
      })
      let blockchoices = allBlocks.concat(block)

      this.blockoptions = blockchoices
    },
    filterMap(crime) {
      this.selected = crime;
      this.timeofCrime = null;
      this.block = null;
      this.$emit('filteredCrime', this.selected)
    },
    filterTime(time) {
      this.timeofCrime = time;
      this.selected = null;
      this.block = null;
      this.$emit('filteredTime', this.timeofCrime)
    },
    filterBlock(block) {
      this.block = block;
      this.selected = null
      this.timeofCrime = null
      this.$emit('filteredBlock', this.block)
    },
    test(choice){
      this.$emit('toggleOverlay', choice)
    }
  }
}
</script>


<style scoped>
.filter {
  margin-top: 5px;
}

@font-face {
    font-family: 'metal';
    src: url('../icons/MetalCrime.ttf');
    font-style: normal
  
}

.title,span {
  font-family: metal
}
 
b-modal {
  font-family: metal;
}

.icon {
  cursor: pointer
}

</style>