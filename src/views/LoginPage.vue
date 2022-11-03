<script setup lang="ts">
import { IonContent, IonButton, IonImg, IonToggle, IonInput, IonList, IonListHeader, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle} from '@ionic/vue';
import { ref } from 'vue';

    
    /* State */

    // The user can toggle between login and register mode in the form to show/hide additional fields
    const inRegisterMode = ref(false);

    // Provides two-way data binding between Vue and the input fields in the form
    const userDetails = ref({
        firstName: '',
        email: '',
        password: ''
    });
</script>

<template>
    <ion-page>
  
      <ion-content :fullscreen="true">
        <ion-header :translucent="true">
          <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
            </ion-buttons>
            <ion-title>Login Page</ion-title>
          </ion-toolbar>
        </ion-header>
            <ion-img
              src="https://illlustrations.co/static/a8bffeb0395117a5c2d54c770d50e80e/ee604/day2-gaming-console.png"/>

              <h1
              class="ion-text-center ion-padding-bottom"
              color="primary">Login to RetroTise</h1>

        <ion-item lines="none">
          <ion-label class="label-mild">New user?</ion-label>
          <ion-toggle color="secondary" @ion-change="inRegisterMode = !inRegisterMode"></ion-toggle>
        </ion-item>

        <ion-item v-if="inRegisterMode">
          <ion-label class="label-mild" position="floating">Fornavn</ion-label>
          <ion-input v-model="userDetails.firstName"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label class="label-mild" position="floating">Email</ion-label>
          <ion-input type="email" v-model="userDetails.email"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label class="label-mild" position="floating">Passord</ion-label>
            <ion-input type="password" v-model="userDetails.password"></ion-input>
        </ion-item>

        <ion-button v-if="inRegisterMode" class="button-auth" expand="block" fill="solid" color="primary" size="default">
          Register
        </ion-button>

        <ion-button v-else class="button-auth" expand="block" fill="solid" color="primary" size="default">
          Login
        </ion-button>

      </ion-content>
    </ion-page>
</template>