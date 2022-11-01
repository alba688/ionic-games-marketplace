<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButtons, IonBackButton} from '@ionic/vue';
    const route = useRoute();
    const { id } = route.params;
</script>

<template>
    <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Retro Game Market 🎮</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        Game Details {{ id }}
    </ion-content>
    </ion-page>
</template>