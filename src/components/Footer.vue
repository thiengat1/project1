<template>
  <div class="footer">
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-footer padless>
      <v-col class="text-center" cols="6">
        <span class="btn-login" @click="handleLogin">Đăng nhập</span>
      </v-col>
      <v-col class="text-center" cols="6">
        <span class="btn-contact" @click="handleContact">Hỗ trợ 24/7</span>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import {linkApi} from '@/js/link'
export default {
  name: "Footer",
  methods: {
    handleLogin() {
      window.location.href = linkApi.zaloLink;
    },
    handleContact() {
      window.location.href = linkApi.zaloLink;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-login {
  color: #fe8837;
  cursor: pointer;
}
.btn-contact {
   cursor: pointer;
  color: #22acec;
}
</style>
