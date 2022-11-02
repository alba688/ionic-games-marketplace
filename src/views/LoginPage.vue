<script setup lang="ts">
import { IonContent, IonButton, IonImg, IonToggle, IonInput, IonList, IonListHeader, IonItem, IonLabel, IonPage} from '@ionic/vue';
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
        <ion-list>
            <ion-img
              src="https://illlustrations.co/static/a8bffeb0395117a5c2d54c770d50e80e/ee604/day2-gaming-console.png"/>
              <ion-list-header>
              <ion-label
              class="ion-text-center ion-padding-bottom"
              color="primary">Welcome to RetroSpill</ion-label>
            </ion-list-header>
            
        </ion-list>

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
          Registrer
        </ion-button>

        <ion-button v-else class="button-auth" expand="block" fill="solid" color="primary" size="default">
          Log in
        </ion-button>

      </ion-content>
    </ion-page>
</template>