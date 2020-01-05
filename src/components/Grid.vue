<template>
  <div>
    <b-field label="Filter by Crime"></b-field>
    <b-select>
      <option value="''">Default sort direction: ASC</option>
      <option value="desc">Default sort direction: DESC</option>
    </b-select>
    <div class="table">
    <b-table :data="data" :columns="columns" ></b-table>

    </div>
  </div>
</template>

<script>
export default {
  props: ["griddata"],
  data() {
    return {
      data: this.content,
      content: null,
      columns: [
        {
          field: "OFFENSE",
          label: "Crime",
          width: "40",
          numeric: false
        },
        {
          field: "SHIFT",
          label: "SHIFT",
          width: "40",
          numeric: false
        },
        {
          field: "BLOCK",
          label: "BLOCK",
          width: "40",
          numeric: false
        }
      ]
    };
  },
  watch: {
    griddata: "getData"
  },
  methods: {
    getData() {
      this.content = this.griddata.map(x => {
        return x.attributes;
      });
      this.data = this.content;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.table {
    // overflow:
}
</style>