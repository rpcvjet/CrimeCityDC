<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">6 Ward Crime</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    <b-form-select class="filter" v-model="selected" :options="options" @change="filterMap">
        <!-- <b-form-select :value="null">-- Filter by Crime --</b-form-select> -->
        <!-- <b-form-select v-model="selected"  options="example"></b-form-select> -->
    </b-form-select>

   
    </b-collapse>
  </b-navbar>
      selected : {{this.selected}}
</div>
</template>

<script>
export default {
  data(){
    return {
        options: [],
        selected: null,
    }
  },    
  props:['offense'],
  watch: {
    offense: ['getFilterOptions']
  },
  methods: {
    getFilterOptions() {
      const filteredArr = this.offense.reduce((acc, current) => {
        // console.log('el', el)
        const duplicate = acc.find(item => item.attributes.OFFENSE === current.attributes.OFFENSE);
        if(!duplicate) {
          return acc.concat([current])
        } else {
          return acc
        }  
      }, []);
      let text = filteredArr.map(item => {
        return {
          value: item.attributes.OFFENSE,
          text: item.attributes.OFFENSE
        }
      });
      this.options = text
    },
    filterMap(crime) {
      this.selected = crime;
      this.$emit('filteredCrime', this.selected)

    }
  }
}
</script>


<style scoped>
.filter {
  width: 20%;
}

</style>