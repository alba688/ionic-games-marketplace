<script setup lang="ts">
import { IonContent, IonPage, IonCard, IonButton} from '@ionic/vue';

</script>

<template>
  <ion-page>
  
  <ion-content :fullscreen="true" color="medium">
    <div color="secondary">
      <img src="../../public/assets/gaming-illustration.svg" class="ion-padding ion-margin-top"/>
      <h1 class="ion-text-center ion-padding">Welcome to RetroTise</h1>
      <h4 class="ion-text-center ion-padding">The best place to buy and sell all your favorite retro games.</h4>
    </div>
    <ion-card class="ion-padding">
      <ion-button router-link="/login" expand="block" fill="solid" color="secondary" class="ion-padding">
        Login to RetroTise
      </ion-button>
      <ion-button router-link="/market" expand="block" fill="outline" color="secondary" class="ion-padding ion-margin-bottom">
        View Marketplace
      </ion-button>
    </ion-card>

  </ion-content>
</ion-page>
</template>

<style scoped>

.example {
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
