<script setup lang="ts">
import { directus } from '@/services/directus.service';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, onIonViewDidEnter, IonRefresher, IonRefresherContent, IonList, IonItem, IonSelect, IonSelectOption} from '@ionic/vue';
import { ref } from 'vue';
import { logInOutline, person, add, gameController } from 'ionicons/icons';
import GameCard from '@/components/GameCard.vue';
import { IGameAd, IGameAdsResponse } from '@/models/GameAdvertisementModels';


  const gameAdvertisements = ref<IGameAd[]>([]);

  /* pulls in platforms for user selection */
  const uniquePlatforms = new Set();

  const selectPlatform = (event: CustomEvent) => {
    gameAdvertisements.value.filter
      let platform = event.detail.value
      console.log(platform);
      fetchSelectedGames(platform);
  }

  onIonViewDidEnter(() => {
      fetchAllGames();
  })

  const refreshGamesView = async (event: CustomEvent) => {
    await fetchAllGames();
    event.target.complete();
  }

  const fetchAllGames = async () => {
    const response = await directus.graphql.items<IGameAdsResponse>(`
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
      gameAdvertisements.value.forEach(element => {
        uniquePlatforms.add(element.platform)
      });
    }
  };

  const fetchSelectedGames = async (platform: string) => {
    const response = await directus.graphql.items<IGameAdsResponse>(`
      query {
        game_market(filter: { platform: { _contains: "${platform}" } }) {
          id,
          title,
          platform,
          condition,
          image {
            id,
          }
        }
      }
    `);

    if (response.status === 200 && response.data) {
      gameAdvertisements.value = [...response.data.game_market];
      console.log(gameAdvertisements.value);
    }
  }

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button router-link="/profile">
            <ion-icon :icon="person"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-buttons slot="end">
            <ion-button router-link="/login">
              <ion-icon :icon="logInOutline"></ion-icon>
            </ion-button>
        </ion-buttons>
      <ion-title>RetroTise 🎮</ion-title>
    </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" color="light">
      <!--Refresh for new listing-->
      <ion-refresher slot="fixed" @ionRefresh="refreshGamesView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <!--Filter game listings-->
      <ion-list>
        <ion-item>
          <ion-select 
            placeholder="Select platform"
            @ionChange="selectPlatform($event)"
          >
            <ion-select-option v-for="platform in uniquePlatforms" :value="platform" :key="platform"> {{platform}} </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <!--Component for game listings-->
      <game-card v-for="game in gameAdvertisements" :key="game.id" :game="game"/>
      <!-- Add button-->
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
