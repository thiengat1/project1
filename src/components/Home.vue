<template>
  <div class="home-page">
    <div class="header-area">
      <div class="logo">
        <img src="@/assets/logo_KUyo.svg" />
      </div>
      <div class="title">
        <p>"Khuyến cáo nên dùng số điện thoại làm tài khoản đăng nhập"</p>
      </div>
    </div>
    <div class="form-registry">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          prepend-inner-icon="mdi-account"
          v-model="name"
          :rules="nameRules"
          label="Họ Tên"
          required
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="mdi-phone"
          v-model="phone"
          :rules="phoneRules"
          label="Số Điện Thoại"
          required
        ></v-text-field>
        <div class="button-area">
          <v-btn
            color="primary"
            class="mr-4 button-class"
            @click="handleSignup"
          >
            Đăng Ký
          </v-btn>
          <v-btn class="button-class" color="warning" @click="handleGetBonus">
            Nhận Khuyến Mãi
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/db";
//import {linkApi} from '@/js/link'
export default {
  name: "Home",
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Mời Nhập Tên"],
      phone: "",
      phoneRules: [
        (v) => !!v || "Mời Nhập Số Điện Thoại",
         v => /^(09|03)+([0-9]{8})+$/.test(v) || 'Số Điện Thoại Không Đúng',

        ],
      singUpList: [],
    };
  },
  methods: {
    async handleSignup() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let checkPhone = false;
      await db
        .collection("singUpList")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            if (this.phone === doc.data().phone) {
              checkPhone = true;
            }
          });
        });
      if (checkPhone) {
        alert('Số Điện Thoại Đã Tồn Tại')
        return
      }
      await db.collection("singUpList").add({
        name: this.name,
        phone: this.phone,
        date: this.handleGetDate(),
      });
      window.location.href = this.kuLink[0].link;
      this.name = "";
      this.phone = "";
    },
    handleGetBonus() {
      window.location.href = this.zaloLink[0].link;
    },
    handleGetDate() {
      var now = new Date();
      var year = now.getFullYear(); // 得到年份
      var month = now.getMonth(); // 得到月份
      var date = now.getDate(); // 得到日期
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      hour = hour.toString().padStart(2, "0");
      minute = minute.toString().padStart(2, "0");
      second = second.toString().padStart(2, "0");
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    },
  },
  firestore: {
    singUpList: db.collection("singUpList"),
    kuLink: db.collection("kuLink").orderBy("date", "desc"),
    zaloLink: db.collection("zaloLink").orderBy("date", "desc"),
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  padding: 150px 100px 0 100px;
  .header-area {
    text-align: center;
    .logo {
      img {
        width: 160px;
        height: 160px;
      }
    }
    .title {
      color: #797979;
      font-weight: normal;
      font-style: italic;
      font-size: 14px;
    }
  }
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
