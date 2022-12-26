<template>
<v-container >

      <v-row justify="center">
              <v-card density="compact" max-width="600px" min-width="360px" rounded>
                <v-card-title class="purple mt-3 lighten-1 text-center text-h5 white-text"
                  >Register</v-card-title
                >
                <v-card-text class="px-4">
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
                          :type="show2 ? 'text' : 'password'"
                          label="Password"
                          required
                          :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:appendInner="show2 = !show2"
                          variant="underlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          clearable
                          v-model="passwordCheck"
                          :rules="passwordRules"
                          :type="show3 ? 'text' : 'password'"
                          label="Re-Password"
                          required
                          :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:appendInner="show3 = !show3"
                          variant="underlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mb-2 ml-2 mr-2 white-text"
                    color="blue darken-3"
                    variant="flat"
                    rounded
                    @click="registrar()"
                    >Registrarse</v-btn
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
const passwordCheck = ref("");
const show2 = ref(false);
const show3 = ref(false);
const valid = ref(true);
const emailRules = reactive([
  (v) => !!v || "E-mail requerido",
  (v) => /.+@.+/.test(v) || "El formato de E-Mail es incorrecto",
]);
const passwordRules = [
  (v) => !!v || "Contraseña requerida",
  (v) => v.length <= 10 || "La contraseña debe de ser mininmo de 6 caracteres",
];

const registrar = async () => {
  console.log("Registrar");

  let data = {
    email: email.value,
    password: password.value,
  };
  if (password.value == passwordCheck.value) {
    try {
      await useAxios.registerUser(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("los passwords no coinciden");
  }
};
</script>

<style>

</style>
