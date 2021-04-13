<template>
  <div class="pa-3">
    <div class="login-header">
      <div>
        <v-btn @click="handleExport" depressed color="primary">
          <v-icon dark>
            mdi-database-export
          </v-icon>
          Export Excel</v-btn
        >
        <v-btn class="change-link" @click="handleChangeLink(1)" color="warning">
          Change Ku Link</v-btn
        >
        <v-btn class="change-link" @click="handleChangeLink(2)" color="warning">
          Change Zalo Link</v-btn
        >
      </div>

      <v-btn @click="handleLogout" depressed color="warning">
        <v-icon dark>
          mdi-logout
        </v-icon>
        Logout</v-btn
      >
    </div>

    <v-data-table
      :headers="headers"
      :items="listItems"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Bạn Chắc Chắn Xóa Dữ Liệu Này?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <ChangeForm ref="ChangeForm" :type="linkType" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { db } from "../firebase/db";
import ChangeForm from "./ChangeForm";
export default {
  name: "DataTable",
  components: {
    ChangeForm,
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Phone", value: "phone" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      listItems: [],
      dialogDelete: false,
      deleteData: {},
      linkType: null,
    };
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    ...mapGetters(["checkLogin"]),
  },
  created() {
    this.handleGetDataList();
  },
  methods: {
    ...mapActions(["setCheckLogin"]),
    handleGetDataList() {
      if (this.checkLogin === "false") {
        this.$router.push({
          path: "/",
        });
      }
    },
    handleExport() {
      import("@/vendor/Export2Excel").then((excel) => {
        let tHeader = ["Name", "Phone", "Date"];
        let filterVal = ["name", "phone", "date"];
        let dt = this.listItems;
        let file_name = "data";
        const data = this.formatJson(filterVal, dt);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: file_name,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      var x = jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );

      return x;
    },
    handleLogout() {
      this.setCheckLogin(false);
      this.$router.push({
        path: "/admin",
      });
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.deleteData = item;
    },

    deleteItemConfirm() {
      db.collection("singUpList")
        .doc(this.deleteData.id)
        .delete();
      this.deleteData = {};
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    handleChangeLink(type) {
      this.linkType = type;
      this.$refs.ChangeForm.dialog = true;
      
    },
  },
  firestore: {
    listItems: db.collection("singUpList").orderBy("date", "desc"),
    kuLink: db.collection("kuLink").orderBy("date", "desc"),
    zaloLink: db.collection("zaloLink").orderBy("date", "desc"),
  },
};
</script>

<style lang="scss" scoped>
.login-header {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.change-link {
  margin-left: 15px;
}
</style>
