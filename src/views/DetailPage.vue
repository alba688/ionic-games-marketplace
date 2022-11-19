<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { IonContent, IonPage, IonHeader, IonTitle, IonCardTitle, IonCardSubtitle, IonCardContent, IonToolbar, IonButtons, IonButton, IonBackButton, IonCard, IonCardHeader, IonIcon, IonModal, IonTextarea, IonList, IonListHeader, IonLabel, IonItem, IonAvatar, IonText, onIonViewDidEnter, IonSpinner} from '@ionic/vue';
  import { ref } from 'vue';
  import { chatboxOutline, person, chatboxEllipsesOutline } from 'ionicons/icons';
  import { directus } from '@/services/directus.service';
  import { IGameAd, IGameAdResponse } from '@/models/GameAdvertisementModels';

    /* Routing */
    const route = useRoute();
    const { id } = route.params;
    
    const userAccessToken = localStorage.getItem('auth_token');

    /* States */
    const isLoadingDetail = ref(true);

    /* Dummy data */
    const gameDetail = ref<IGameAd | null>(null);

    onIonViewDidEnter(() => {
      fetchGameById();
    })

    const fetchGameById = async () => {
      const response = await directus.graphql.items<IGameAdResponse>(`
      query {
        game_market_by_id(id:${id}) {
          id,
          title,
          price,
          platform, 
          description,
          condition,
          address,
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
        gameDetail.value = response.data.game_market_by_id;
        isLoadingDetail.value = false;
      }
    }
</script>

<template>
    <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button default-href="/market"></ion-back-button>
        </ion-buttons>
        <ion-title v-if="isLoadingDetail"><ion-spinner></ion-spinner></ion-title>
        <ion-title v-if="gameDetail">{{gameDetail.title}}</ion-title>
        <ion-buttons slot="end">
            <ion-button>
              <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
            </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="gameDetail && !isLoadingDetail">
        <ion-card>
            <img :src="`https://q4vuzuzc.directus.app/assets/${gameDetail.image.id}?access_token=${userAccessToken}`" />
            <ion-card-header>
                 <ion-card-title>{{gameDetail.price}} kr</ion-card-title>
                <ion-card-subtitle>{{gameDetail.platform}}</ion-card-subtitle>
                Condition: {{gameDetail.condition}}
            </ion-card-header>
            <ion-card-content>
                <div>{{gameDetail.description}}</div>
            </ion-card-content>
            <ion-card-content>
                <strong>Sold by: {{gameDetail.user_created.first_name}}</strong>
                <h3>Address: {{gameDetail.address}}</h3>
            </ion-card-content>
        </ion-card>
    </ion-content>
    </ion-page>
</template>