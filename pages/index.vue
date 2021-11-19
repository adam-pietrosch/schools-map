<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-feature v-for="school in schools" :key="school.id">
          <vl-geom-point :coordinates="[school['geo-long'],school['geo-lat']]"></vl-geom-point>
        </vl-feature>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
    </vl-map>

    <br>
    <v-card>
      <v-card-title>
        Školy
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Hledat"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :search="search"
      ></v-data-table>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  asyncData: () => {
    return {
      tableData: [],
      schools: [],
      cities: [],
      accepted: [],
      field: [],
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      search: '',
      headers: [
          { text: 'Obor', align: 'start', sortable: true, value: 'field' },
          { text: 'Počet přijatých', value: 'acceptedCount' },
          { text: 'Rok', value: 'year' },
          { text: 'Škola', value: 'school' },
          { text: 'Město', value: 'city' },
      ],
    }
  },

  mounted() {
    
  },
  methods: {
    
  },
  async fetch() {
    const schools = await this.$axios.$get('http://localhost:3000/api/school')
    this.schools = schools

    console.log(schools)

    const cities = await this.$axios.$get('http://localhost:3000/api/city')
    this.cities = cities

    const accepted = await this.$axios.$get('http://localhost:3000/api/accepted')
    this.accepted = accepted

    const field = await this.$axios.$get('http://localhost:3000/api/field')
    this.field = field

    /*
    var tableModel = {
      field: '',
      acceptedCount: 0,
      year: 0,
      school: '',
      city: '',
    } */

    accepted.forEach(item => {
      var fieldName = field.find(field => field.id == item.obor).nazev
      var acceptedCount = item.pocet
      var year = item.rok
      var school = schools.find(school => school.id == item.skola)
      var schoolName = school.nazev
      var city = cities.find(city => city.id == school.mesto).nazev

      var tableModel = {
        field: fieldName,
        acceptedCount: acceptedCount,
        year: year,
        school: schoolName,
        city: city,
      }

      this.tableData.push(tableModel)
    })

  },
}
</script>