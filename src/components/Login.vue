<template>
  <div class="login-page">
    <div class="form-login">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          prepend-inner-icon="mdi-account"
          v-model="name"
          :rules="nameRules"
          label="Tên Đăng Nhập"
          required
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="mdi-lock"
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Mật Khẩu"
          counter
          @click:append="show1 = !show1"
          @keyup.enter="handleSignin"
        ></v-text-field>
        <div class="button-area">
          <v-btn
            color="primary"
            class="mr-4 button-class"
            @click="handleSignin"
          >
            Login
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/db";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Mời Nhập Tên Đăng Nhập"],
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Mời Nhập Mật Khẩu.",
      },
    };
  },
  computed: {
    ...mapGetters(["checkLogin"]),
  },
  created() {
    if (this.checkLogin==='true') {
      this.$router.push({
        path: "/data",
      });
    }
  },
  methods: {
    ...mapActions(["setCheckLogin"]),
    async handleSignin() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let name = "";
      let password = "";
      await db
        .collection("user")
        .where("name", "==", "admin")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            name = doc.data().name;
            password = doc.data().password;
          });
        });
      if (this.name !== name) {
        alert("Tên Không Chính Xác");
        return;
      }
      if (this.password !== password) {
        alert("Mật Khẩu Không Chính Xác");
        return;
      }
      this.setCheckLogin(true);
      this.$router.push({
        path: "/data",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  padding: 20% 30%;
  .button-area {
    margin-top: 30px;
    .button-class {
      display: block;
      width: 100%;
      margin-bottom: 10px;
      height: 52px;
    }
  }
}
</style>
