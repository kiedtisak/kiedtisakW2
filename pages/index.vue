<template>
  <v-parallax src="/pic/bg123.png" height="649">
    <v-flex xs12 sm6 offset-sm3>
      <v-card color="transparent">
        <v-card-media
          height="593px"
          contain
          src="/pic/all.png"
        />
        <div class="text-xs-center">
          <v-btn color="orange" @click="trunIn">Continue to program</v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-parallax>
</template>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
b {
  color: darkgoldenrod;
}
</style>
<script>

export default {
      layout : 'public',

  methods: {
    async trunIn() {
      this.$router.push('/login')
    },
  }, // methods
}
</script>
