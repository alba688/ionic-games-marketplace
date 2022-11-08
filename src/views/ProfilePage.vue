<script setup lang="ts">
import { IonContent, IonPage, IonCard, IonButton, IonToolbar, IonButtons, IonBackButton, IonTitle} from '@ionic/vue';

</script>

<template>
  <ion-page>
  
  <ion-content :fullscreen="true">
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button default-href="/market"></ion-back-button>
        </ion-buttons>
        <ion-title>Your profile</ion-title>
    </ion-toolbar>
    <ion-card>
        <ion-button router-link="/add" expand="block" fill="solid" color="primary" class="ion-padding">
      Add game to marketplace
        </ion-button>
        <ion-button expand="block" fill="outline" color="primary" class="ion-padding">
      Log out of RetroTise
        </ion-button>
    </ion-card>


  </ion-content>
</ion-page>
</template>

<style scoped>

</style>