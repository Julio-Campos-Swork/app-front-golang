<template>
<v-container >
            <!-- login -->
            <v-row justify="center">
              <v-card density="compact" max-width="600px" min-width="360px" rounded>
                <v-card-title class="mt-3 purple lighten-1 text-center text-h5 white-text"
                  >Login</v-card-title
                >
                <v-card-text class="px-5">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row align="center" dense>
                      <v-col cols="12">
                        <v-text-field
                          clearable
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                          variant="underlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          clearable
                          v-model="password"
                          :rules="passwordRules"
                          :type="show1 ? 'text' : 'password'"
                          label="Password"
                          required
                          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:appendInner="show1 = !show1"
                          variant="underlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mb-4 ml-2 mr-2 white-text"
                    color="green lighten-2"
                    variant="flat"
                    rounded
                    @click="loginUser()"
                    >Iniciar Sesion</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-row>
</v-container>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useAxiosStore } from "@/stores/axiosStore";

const useAxios = useAxiosStore();

const email = ref("");
const password = ref("");
const show1 = ref(false);
const valid = ref(true);
const emailRules = reactive([
  (v) => !!v || "E-mail requerido",
  (v) => /.+@.+/.test(v) || "El formato de E-Mail es incorrecto",
]);
const passwordRules = [
  (v) => !!v || "Contraseña requerida",
  (v) => v.length <= 10 || "La contraseña debe de ser mininmo de 6 caracteres",
];
const loginUser = async () => {
  console.log("Iniciar session");

  let data = {
    email: email.value,
    password: password.value,
  };
  await useAxios.loginUser(data);
};


</script>

<style>

</style>
