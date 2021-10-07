<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Škola
              </th>
              <th class="text-left">
                Město
              </th>
              <th class="text-left">
                Geo - lat
              </th>
              <th class="text-left">
                Geo - long
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in schools"
              :key="item.id"
            >
              <td>{{ item.nazev }}</td>
              <td>{{ cities.find(city => city.id == item.mesto).nazev }}</td>
              <td>{{ item['geo-lat'] }}</td>
              <td>{{ item['geo-long'] }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  asyncData: () => {
    return {
      schools: [],
      cities: []
    }
  },
  methods: {
    
  },
  async fetch() {
    const schools = await this.$axios.$get('http://localhost:3000/api/school')
    this.schools = schools

    const cities = await this.$axios.$get('http://localhost:3000/api/city')
    this.cities = cities
  },
}
</script>