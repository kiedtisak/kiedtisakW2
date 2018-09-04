<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required 
    ></v-text-field>
    <v-text-field
        v-model="password"
        :append-icon="show1 ? 'visibility_off' : 'visibility'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
    ></v-text-field>
     <v-btn color="success" dark @click="Dologin">เข้าสู่ระบบ
        <v-icon dark right>label</v-icon>
      </v-btn>
      <v-btn color="error" dark @click="Dosave">ล้างข้อมูล
        <v-icon dark right>label</v-icon>
      </v-btn>
  </v-form>
</template>
<script>
  export default {
    layout : 'public',
    data: () => ({
      valid: false,
      show1: false,
       password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),
    methods:{
      async Dologin(){
        console.log (this.email)
        console.log (this.password)
        let res = await this.$http.post('http://127.0.0.1/php-api/login.php', {
          user : this.email,
          pass : this.password
        })
        if (res.data.ok){
          this.$router.push('/tabled')
        }
      },
      Dosave(){
        this.email='',
        this.password=''
      }
    }
  }
</script>