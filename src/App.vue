<template>
  <v-app>
    <v-main>
    <v-app-bar
    class="px-3 header"
      color="green"

      density="compact">
      <v-row justify="center">

      <v-tabs
      grow
        bg-color="transparent"
        centered
        color="green"
        fixed-tabs
        height="40"
        slider-color="light-blue lighten-5"
        density="compact"
      >
      <v-tab ><RouterLink to="/" class="header">Home</RouterLink></v-tab>
      <v-tab ><RouterLink to="/users" class="header">Users</RouterLink></v-tab>
      <v-tab><RouterLink to="/login" class="header">Login</RouterLink></v-tab>
      <v-tab><RouterLink to="/register" class="header">Register</RouterLink></v-tab>


      </v-tabs>
      </v-row>
    </v-app-bar>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from '@vue/reactivity';

const tab = ref(null)
</script>

<style scoped>
.header{
text-align: center;
color: white;
}
</style>
