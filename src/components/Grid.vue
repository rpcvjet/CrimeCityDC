<template>
  <div class="">
    <!-- <b-field label="Filter by Crime"></b-field> -->
    <b-form-select v-model="selected" :options="options">
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>-- Filter by Crime --</b-form-select-option>
        <b-form-select-option value="options">ALL</b-form-select-option>
      </template>
      <!-- These options will appear after the ones from 'options' prop -->
      <!-- <b-form-select-option value="D">Option D</b-form-select-option> -->
    </b-form-select>
    <b-table
      :items="data"
      :fields="fields"
      head-variant="light"
      class="text-center"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
    <b-pagination
    v-if="this.griddata"
      align='center'
      v-model="currentPage"
      :total-rows=this.griddata.length
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
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
      options: [],
      fields: [
        {
          key: "OFFENSE",
          label: "Crime",
          width: "33",
          sortable: true
        },
        {
          key: "SHIFT",
          label: "SHIFT",
          width: "33",
          sortable: true

        },
        {
          key: "BLOCK",
          label: "BLOCK",
          width: "33",
          sortable: true

        }
      ]
    };
  },
  watch: {
    griddata: ["getData", "getFilterOptions"],
  },
  computed: {
   
  },
  methods: {
    getData() {
      this.data = this.griddata.map(x => {
        return x.attributes;
      });
    },
    getFilterOptions() {
      let text = this.griddata.map(item => {
        return item.attributes.OFFENSE;
      });
      this.options = [...new Set(text)];
    }
  }
};
</script>

<style scoped>
</style>