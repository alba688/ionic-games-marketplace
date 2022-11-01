<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { IonContent, IonPage, IonHeader, IonTitle, IonCardTitle, IonCardSubtitle, IonCardContent, IonToolbar, IonButtons, IonButton, IonBackButton, IonCard, IonCardHeader, IonIcon, IonModal, IonTextarea, IonList, IonListHeader, IonLabel, IonItem, IonAvatar, IonText} from '@ionic/vue';
    import { ref } from 'vue';
    import { chatboxOutline, person, chatboxEllipsesOutline } from 'ionicons/icons';

    /* Routing */
    const route = useRoute();
    const { id } = route.params;

    /* States */
    const isModalOpen = ref(false);
    const newMessageText = ref("");

    /* Dummy data */
    const gameDetail = ref({
        id: 3,
        title: "Frogger",
        description: "Hop through nine gaming worlds and dozens of levels based on themes from the original game.",
        platform: "Playstation",
        price: 175,
        condition: "Used",
        address: "Lillaveien 50",
        imageURL: "https://i.ytimg.com/vi/mzLAZoOUMso/hqdefault.jpg",
        messages: [
            {
                id: 1,
                username: "gameLover123",
                text: "Let me know if you have any questions!"
            }
        ]
    });

    /* New message */
    const addNewMessage = () => {
        gameDetail.value.messages.unshift({
            id: 3,
            username: "want2Buy",
            text: newMessageText.value
        });

        isModalOpen.value = false;
        newMessageText.value = "";
    }
</script>

<template>
    <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{gameDetail.title}} ({{ id }})</ion-title>
        <ion-buttons slot="end">
            <ion-button @click="isModalOpen = true">
              <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
            </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-card>
            <img :src="gameDetail.imageURL" :alt="gameDetail.title" />
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
              Messages <ion-icon :icon="chatboxOutline"></ion-icon>
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
        :initial-breakpoint="0.25" 
        :breakpoints="[0, 0.25, 0.5, 0.75]"
        @did-dismiss="isModalOpen = false">
            <ion-content>
                <ion-item lines="none">
                <ion-label position="floating">New message to seller</ion-label>
                <ion-textarea v-model="newMessageText"></ion-textarea>
                <ion-button @click="addNewMessage">Send message</ion-button>
                </ion-item>
            </ion-content>
        </ion-modal>
    </ion-content>
    </ion-page>
</template>