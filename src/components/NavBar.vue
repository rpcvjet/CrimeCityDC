<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info" sticky>
    <b-navbar-brand href="#">6 Ward Crime</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
        <b-container>
          <b-row cols="1" cols-sm="3" class="controls" >
            <b-col>
               <b-form-select class="filter" v-model="selected" :options="options" @change="filterMap"></b-form-select>
            </b-col>
            <b-col>
                <b-form-select class="filter" v-model="timeofCrime" :options="timeoptions" @change="filterTime"></b-form-select>
           </b-col>
           <b-col>
                <b-form-select class="filter" v-model="block" :options="blockoptions" @change="filterBlock"></b-form-select>
           </b-col>
          </b-row>
        </b-container>
    </b-collapse>

  </b-navbar>
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
    }
  }
}
</script>


<style scoped>
.filter {
  margin-top: 5px;
}

.controls {
  /* margin-left: 12em; */
}

</style>