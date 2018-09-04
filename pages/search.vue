<template>
<v-app>
   <v-form v-model="valid"   > 
    <center><H1>Search Asean</H1></center>
     <center><v-flex xs12 sm6>
          <v-text-field
            v-model="member"
            label="Search"
            single-line
            solo
          ></v-text-field>
        </v-flex></center>
  </v-form>
    <div class="text-xs-center">
    <v-btn color="amber darken-3" dark @click="Dosearch">ค้นหา
        <v-icon dark right>search</v-icon>
      </v-btn> 
  </div>

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
  </v-app>
  
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
methods:{
      async Dosearch(){
        let res = await this.$http.post('http://127.0.0.1/php-api/search.php', {
          member : this.member,
        })
        if (res.data.ok){
          this.desserts = res.data.admin 
        }
      },
}
}
</script>
