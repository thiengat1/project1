<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{type===1?'Change Ku Link':'Change Zalo Link'}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="link"
                    :rules="[(v) => !!v || 'link is required']"
                    label="Link"
                    required
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleSubmit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../firebase/db";
export default {
  name: "ChangeForm",
  props: {
    type: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
      valid: false,
      link: null,
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.handleAddLink();
        this.dialog = false;
      }
    },
    async handleAddLink() {
      let ref = null;
      if (this.type === 1) {
        ref = "kuLink";
      } else {
        ref = "zaloLink";
      }
      await db.collection(ref).add({
        link: this.link,
        date: this.handleGetDate(),
      });
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
    listItems: db.collection("singUpList").orderBy("date", "desc"),
    kuLink: db.collection("kuLink").orderBy("date", "desc"),
    zaloLink: db.collection("zaloLink").orderBy("date", "desc"),
  },
};
</script>

<style lang="scss" scoped></style>
