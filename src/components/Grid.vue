<template>
<div class="mytable">
      <b-table
      no-select-on-click
      @row-hovered="mouseOver"
      @row-unhovered="mouseLeave"
      hover
      :items="data"
      :fields="fields"
      head-variant="light"
      @row-clicked="zoomOnIcon"   
      fixed
    ></b-table>  
</div>
</template>

<script>
export default {
  props: ["griddata"],
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      selected: null,
      data: this.content,
      content: null,
      fields: [
        {
          key: "OFFENSE",
          label: "CRIME",
          sortable: true,
          class: 'text-center'
        },
        {
          key: "SHIFT",
          label: "SHIFT",
          sortable: true,
          class: 'text-center',
        },
        {
          key: "BLOCK",
          label: "BLOCK",
          sortable: true,
          class: 'text-center'
        }
      ]
    };
  },
  watch: {
    griddata: ["getData"],
  },
  computed: {
   
  },
  methods: {
    getData() {
      this.data = this.griddata.map(x => {
        return x.attributes;
      });
    },
    zoomOnIcon(item){
        item = [item.LATITUDE, item.LONGITUDE]
      this.$emit('zoomtoicon', item)
    },
    mouseOver(item,index){
      this.$emit('mouse-over-crime', item.arrayIndex)
    },
    mouseLeave(item,index){
      this.$emit('mouse-leave-crime', item.arrayIndex)
    }
    
  }
};
</script>

<style scoped>


</style>