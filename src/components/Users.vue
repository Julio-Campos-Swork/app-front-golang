<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="text-center"
        >A simple CRUD with Vue js 3 Composition API and GoLang in backend</v-card-title
      >
      <v-card-text>
        <v-table hover fixed-header height="500">
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">firstName</th>
              <th class="text-center">lastName</th>
              <th class="text-center">email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items.users" :key="item.id">
              <td>
                {{ item.id }}
              </td>
              <td>
                <v-text-field variant="plain" v-model="item.firstName"></v-text-field>
              </td>
              <td>
                <v-text-field variant="plain" v-model="item.lastName"></v-text-field>
              </td>
              <td>
                <v-text-field variant="plain" v-model="item.email"></v-text-field>
              </td>
              <td>
                <v-btn
                  size="small"
                  color="yellow"
                  @click="updateUser(item.id, item.firstName, item.lastName, item.email)"
                  >Edit</v-btn
                >
              </td>
              <td>
                <v-btn size="small" color="red" @click="deleteUser(item.id)"
                  >Delete</v-btn
                >
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>

            <td>
              <v-btn color="green" size="large" @click="dialogCreate = true">Add</v-btn>
            </td>
            </tr>
          </tfoot>
        </v-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogCreate" persistent>
      <v-row justify="center">
        <v-card width="300">
          <v-card-text>
            <v-form>
              <v-col cols="12">
                <v-text-field
                  v-model="newUser.firstName"
                  label="Add User First Name"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newUser.lastName"
                  label="Add User Last Name"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newUser.email"
                  label="Add User Email"
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="text"
              color="green"
              @click="createUser(newUser.firstName, newUser.lastName, newUser.email)"
            >
              Create
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="text" color="red" @click="dialogCreate = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-dialog>
    <v-snackbar position="fixed" location="top" rounded="pill" timeout="3000" color="green" v-model="snackbarCreate">
      <p class="text-center">User Created Sucessfull</p>
    </v-snackbar>
    <v-snackbar  location="top" position="fixed" rounded="pill" timeout="3000" color="red" v-model="snackbarDelete">

      <p class="text-center">User Deleted Sucessfull</p>

    </v-snackbar>
    <v-snackbar location="top" position="fixed" rounded="pill" timeout="3000" color="green" v-model="snackbarUpdate">

      <p class="text-center">User Updated Sucessfull</p>

    </v-snackbar>
  </v-container>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useAxiosStore } from "@/stores/axiosStore";

const dialogCreate = ref(false);
const snackbarUpdate = ref(false);
const snackbarCreate = ref(false);
const snackbarDelete = ref(false);
const newUser = reactive({
  firstName: "",
  lastName: "",
  email: "",
});
const useAxios = useAxiosStore();
const items = reactive({ users: "" });
const init = async () => {
  await useAxios.retrieveAllUsers();
  items.users = useAxios.dataUsers.data;
  console.log(items);
};
init();
const updateUser = async (id, firstName, lastName, email) => {
  let data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  console.log("data update", data);
  const resp = await useAxios.updateUser(id, data);
  snackbarUpdate.value = true;
  // console.log("respues",resp)
  init();
};

const createUser = async (firstName, lastName, email) => {
  let data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  console.log("data create", data);
  const resp = await useAxios.createUser(data);
  dialogCreate.value = false;
  init();
  snackbarCreate.value = true;
  newUser.firstName = "";
  newUser.lastName = "";
  newUser.email = "";
};
const deleteUser = async (id) => {
  const resp = await useAxios.deleteUser(id);
  snackbarDelete.value = true;
  console.log("resp delete", resp);
  init();
};
</script>

<style></style>
