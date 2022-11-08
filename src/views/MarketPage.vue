<script setup lang="ts">
import { directus } from '@/services/directus.service';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonFab, IonFabButton, onIonViewDidEnter, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { ref } from 'vue';
import { logInOutline, person, add } from 'ionicons/icons';


  const gameAdvertisements = ref([]);

  onIonViewDidEnter(() => {
      fetchAllGames();
  })

  const refreshGamesView = async (event: CustomEvent) => {
    await fetchAllGames();
    event.target.complete();
  }

  const fetchAllGames = async () => {
    const response = await directus.graphql.items(`
      query {
        game_market {
          id,
          title,
          platform, 
          condition,
          image {
            id,
          },
        }
      }
    `);
    
    if (response.status === 200 && response.data) {
      gameAdvertisements.value = [...response.data.game_market];
      console.log(gameAdvertisements.value);
    }
  };

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button router-link="/profile">
            <ion-icon :icon="person"></ion-icon>
          </ion-button>
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
      <ion-refresher slot="fixed" @ionRefresh="refreshGamesView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-card v-for="game in gameAdvertisements" :key="game.id" :router-link="'/detail/' + game.id">
        <ion-card-header>
          <img :src="`https://q4vuzuzc.directus.app/assets/${game.image.id}`"/>
          <ion-card-title>{{ game.title}}</ion-card-title>
          <ion-card-subtitle>
            {{game.platform}} ({{game.condition}})
          </ion-card-subtitle>
      </ion-card-header>
        
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
