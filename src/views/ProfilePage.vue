<script setup lang="ts">
import { IonContent, IonPage, IonCard, IonButton, IonToolbar, IonButtons, IonBackButton, IonTitle, onIonViewDidEnter, IonSpinner} from '@ionic/vue';
import { authService } from '@/services/directus.service';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


  const router = useRouter();

  /* State */
  const currentUserName = ref("");
  const isLoadingProfile = ref(true);



  onIonViewDidEnter(() => {
    fetchUser();
  })

  const fetchUser = async () => {
    const user = await authService.currentUser();

    if (user.first_name) {
      currentUserName.value = user.first_name;
      console.log(currentUserName.value);
      isLoadingProfile.value = false;
    }
  }


  const logout = async () => {
    await authService.logout();
    router.replace('/home');
      
  }

  
</script>

<template>
  <ion-page>
  
  <ion-content :fullscreen="true" v-if="currentUserName && !isLoadingProfile">
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button default-href="/market"></ion-back-button>
        </ion-buttons>
        <ion-title v-if="isLoadingProfile"><ion-spinner></ion-spinner></ion-title>
        <ion-title v-if="currentUserName">Profile for {{currentUserName}}</ion-title>
    </ion-toolbar>
    <ion-card class="ion-padding">
        <ion-button router-link="/add" expand="block" fill="solid" color="primary" class="ion-padding">
      Add game to marketplace
        </ion-button>
        <ion-button @click="logout" expand="block" fill="outline" color="primary" class="ion-padding">
      Log out of {{currentUserName}}'s account
        </ion-button>
    </ion-card>


  </ion-content>
</ion-page>
</template>

<style scoped>

</style>