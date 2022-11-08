<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { IonContent, IonPage, IonHeader, IonTitle, IonCardTitle, IonCardSubtitle, IonCardContent, IonToolbar, IonButtons, IonButton, IonBackButton, IonCard, IonCardHeader, IonIcon, IonModal, IonTextarea, IonList, IonListHeader, IonLabel, IonItem, IonAvatar, IonText, onIonViewDidEnter, IonSpinner} from '@ionic/vue';
    import { ref } from 'vue';
    import { chatboxOutline, person, chatboxEllipsesOutline } from 'ionicons/icons';
    import { directus } from '@/services/directus.service';

    /* Routing */
    const route = useRoute();
    const { id } = route.params;
    
    const userAccessToken = localStorage.getItem('auth_token');

    /* States */
    const isModalOpen = ref(false);
    const newMessageText = ref("");
    const isLoadingDetail = ref(true);

    /* Dummy data */
    const gameDetail = ref(null);

    onIonViewDidEnter(() => {
      fetchGameById();
    })

    const fetchGameById = async () => {
      const response = await directus.graphql.items(`
      query {
        game_market_by_id(id:${id}) {
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
        gameDetail.value = response.data.game_market_by_id;
        isLoadingDetail.value = false;
      }
    }

    /* New message 
    const addNewMessage = () => {
        gameDetail.value.messages.unshift({
            id: 3,
            username: "want2Buy",
            text: newMessageText.value
        });

        isModalOpen.value = false;
        newMessageText.value = "";
    }*/
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
            <ion-button @click="isModalOpen = true">
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
        </ion-card>

        <!-- Comment section -->
      <ion-card>
        <ion-list>
          <ion-list-header>
            <ion-label>
              Message {{gameDetail.user_created.first_name}} <ion-icon :icon="chatboxOutline"></ion-icon>
            </ion-label>
          </ion-list-header>
          <ion-item v-for="message in gameDetail.messages" :key="message.id" lines="none">
            <ion-avatar slot="start">
                <ion-icon :icon="person"></ion-icon>
            </ion-avatar>
            <ion-label class="ion-text-wrap">
              <ion-text>
                <b>{{message.username}} </b>
              </ion-text>
              <ion-text>
                <p>{{message.text}}</p>
              </ion-text>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card>

       <!-- Modal -->
       <ion-modal 
        :is-open="isModalOpen" 
        :initial-breakpoint="0.5" 
        :breakpoints="[0, 0.25, 0.5, 0.75]"
        @did-dismiss="isModalOpen = false">
            <ion-content>
                <ion-item lines="none">
                <ion-label position="floating">Message to seller</ion-label>
                <ion-textarea class="ion-padding-bottom" placeholder="Write message here" v-model="newMessageText"></ion-textarea>
                <ion-button>Send message</ion-button>
                </ion-item>
            </ion-content>
        </ion-modal>
    </ion-content>
    </ion-page>
</template>