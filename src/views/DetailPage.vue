<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/vue';
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
        <ion-card>
            <img  src="https://obriens.no/40316-large_default/crash-bandicoot-the-wrath-of-cortex-playstation-2.jpg" />
            <ion-card-header>
                <ion-grid>
                    <ion-row>
                        <ion-col size="12">
                            <ion-card-title>Test Game {{id}}</ion-card-title>
                        </ion-col>
                        <ion-col size="6">
                            <ion-card-subtitle>Playstation</ion-card-subtitle>
                        </ion-col >
                        <ion-col size="6">
                            <ion-card-subtitle>100 kr</ion-card-subtitle>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card-header>
            <ion-card-content>This is the card content area for content of the game</ion-card-content>
        </ion-card>
    </ion-content>
    </ion-page>
</template>