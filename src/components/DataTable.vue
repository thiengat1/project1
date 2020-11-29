<template>
  <div class="pa-3">
    <div class="login-header">
      <v-btn @click="handleExport" depressed color="primary">
        <v-icon dark>
          mdi-database-export
        </v-icon>
        Export Excel</v-btn
      >
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
            <v-card-title class="headline">Bạn Chắc Chắn Xóa Dữ Liệu Này?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem (item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { db } from "../firebase/db";
export default {
  name: "DataTable",
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
      deleteData:{}
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
      console.log("this.checkLogin", typeof this.checkLogin);
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

    deleteItem (item) {
      this.dialogDelete = true
      this.deleteData=item
   
    },

    deleteItemConfirm() {
      db.collection('singUpList').doc(this.deleteData.id).delete()
      this.deleteData={}
      this.closeDelete();
    },
     closeDelete () {
        this.dialogDelete = false
      },
  },
  firestore: {
    listItems: db.collection("singUpList").orderBy("date", "desc"),
  },
};
</script>

<style lang="scss" scoped>
.login-header {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
