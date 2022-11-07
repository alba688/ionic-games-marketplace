<script setup lang="ts">
import { directus } from '@/services/directus.service';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonFab, IonFabButton, onIonViewDidEnter } from '@ionic/vue';
import { ref } from 'vue';
import { logInOutline, add } from 'ionicons/icons';


  const gameAdvertisements = ref([]);

  onIonViewDidEnter(async () => {
    const response = await directus.graphql.items(`
      query {
        game_market {
          id,
          title,
          price,
          platform, 
          description,
          condition,
          image {
            id
          },
          user_created {
            first_name
          }
        }
      }
    `);
    
    if (response.status === 200 && response.data) {
      gameAdvertisements.value = [...response.data.game_market];
      console.log(gameAdvertisements.value);
    }
  });

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>+</ion-button>
        </ion-buttons>
        <ion-title>RetroTise 🎮</ion-title>
        <ion-buttons slot="end">
            <ion-button router-link="/login">
              <ion-icon :icon="logInOutline"></ion-icon>
            </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-card v-for="game in gameAdvertisements" :key="game.id" :router-link="'/detail/' + game.id">
        <ion-card-header>
          <ion-card-subtitle>{{game.price}} kr</ion-card-subtitle>
          <ion-card-title>{{ game.title}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{game.description}}
        </ion-card-content>
      </ion-card>
        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
            <ion-fab-button router-link="/add">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>
