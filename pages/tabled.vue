<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.s_code }}</td>
        <td class="text-xs-left">{{ props.item.s_name }}</td>
        <td class="text-xs-left">{{ props.item.s_class }}</td>
        <td class="text-xs-left">{{ props.item.s_group }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'ลำดับ',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'ประเทศ', value: 'ประเทศ' },
        { text: 'ลำดับที่เข้าร่วม', value: 'ลำดับที่เข้าร่วม' },
        { text: 'ปีที่เข้าร่วม', value: 'ปีที่เข้าร่วม' },
        
      ],
      desserts: [],
    }
  },
async created() {
  // เรียกใช้งาน
    this.getstudent()
  }, 
methods: {
    async getstudent() {
      let res = await this.$http.get('http://127.0.0.1/php-api/list-student.php')
      this.desserts = res.data.student 
      // ตัวแปล
    },
}
}
</script>