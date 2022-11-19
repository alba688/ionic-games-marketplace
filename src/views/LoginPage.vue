<script setup lang="ts">
import { authService } from '@/services/directus.service';
import { IonContent, IonButton, IonToggle, IonInput, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


  const router = useRouter();
    
  /* State */

  // The user can toggle between login and register mode in the form to show/hide additional fields
  const inRegisterMode = ref(false);

  // Provides two-way data binding between Vue and the input fields in the form
  const userDetails = ref({
      firstName: '',
      email: '',
      password: ''
  });

  const login = async () => {
    try {
      await authService.login(userDetails.value.email, userDetails.value.password);
      router.replace('/market');

    } catch (error) {
      console.error(error);
    }
  }

  const register = async () => {
    try {
      await authService.register(userDetails.value.firstName, userDetails.value.email, userDetails.value.password);
      await login()
    } catch (error) {
      console.error(error);
    }
  }

</script>

<template>
    <ion-page>
  
      <ion-content :fullscreen="true" color="light">
        <ion-header :translucent="true">
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
            </ion-buttons>
            <ion-title>Login Page</ion-title>
          </ion-toolbar>
        </ion-header>
          <img src="../../public/assets/gaming-illustration2.svg" class="ion-padding ion-margin-top"/>
              <h1
              class="ion-text-center ion-padding-bottom"
              color="primary">Login to RetroTise</h1>

        <ion-item lines="none" color="light">
          <ion-label class=" label-mild"><h2>New user?</h2></ion-label>
          <ion-toggle color="secondary" @ion-change="inRegisterMode = !inRegisterMode"></ion-toggle>
        </ion-item>

        <ion-item v-if="inRegisterMode" color="light">
          <ion-label class="label-mild" position="floating">First Name</ion-label>
          <ion-input v-model="userDetails.firstName"></ion-input>
        </ion-item>

        <ion-item color="light">
          <ion-label class="label-mild" position="floating">Email</ion-label>
          <ion-input type="email" v-model="userDetails.email"></ion-input>
        </ion-item>

        <ion-item color="light" class="ion-padding-bottom">
            <ion-label class="label-mild" position="floating">Password</ion-label>
            <ion-input type="password" v-model="userDetails.password"></ion-input>
        </ion-item>

        <ion-button @click="register" v-if="inRegisterMode" class="button-auth" expand="block" fill="solid" color="secondary" size="default">
          Register
        </ion-button>

        <ion-button @click="login" v-else class="button-auth" expand="block" fill="solid" color="secondary" size="default">
          Login
        </ion-button>

      </ion-content>
    </ion-page>
</template>