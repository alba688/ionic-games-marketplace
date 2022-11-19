<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar, IonImg, toastController, IonSelect, IonSelectOption, IonSpinner } from '@ionic/vue';
import { directus } from '@/services/directus.service';
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { trashOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { INewGameAd } from '@/models/GameAdvertisementModels';

    const router = useRouter();


    // For feedback on upload
    const isUploadingGame = ref(false);
    
    // Keeps track of all data input from the user towards adding a new camp spot
    const newGame = ref<INewGameAd>({
        title: "",
        description: "",
        price: "",
        platform: "",
        condition: "",
        address: "",
        image: ""
    });

    // Run Camera

    const triggerCamera = async () => {
        const photo = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });

        if (photo.webPath) {
            newGame.value.image = photo.webPath;
        }
    }

    // Handle condition select
    const handleChange = (e: CustomEvent) => {
        newGame.value.condition = e.detail.value;
        console.log(newGame.value.condition)
    }
    
    // Handle data POSTing

    const postNewGame = async () => {
        // TODO Logic to post the camp spot to the backend/Directus
        console.log(newGame.value);

        if(!newGame.value.image) {
            alert("Image required.");
            return;
        }

        try {
            isUploadingGame.value = true;
            const response = await fetch(newGame.value.image);
            const imageBlob = await response.blob();

            const formData = new FormData();
            formData.append('file', imageBlob);

            const fileUpload = await directus.files.createOne(formData);

            if (fileUpload) {
                await directus.items('game_market').createOne({
                    title: newGame.value.title,
                    description: newGame.value.description,
                    price: newGame.value.price,
                    platform: newGame.value.platform,
                    condition: newGame.value.condition,
                    address: newGame.value.address,
                    image: fileUpload.id
                });

                const successToast = await toastController.create({
                    message: 'Your game was posted!',
                    duration: 1500,
                    position: 'bottom',
                    color: 'success'
                });

                await successToast.present();
            }

            isUploadingGame.value = false;
            router.replace('/market');

        } catch (error) {
            const errorToast = await toastController.create({
            message: 'Something went wrong while posting your game.',
            duration: 2500,
            position: 'bottom',
            color: 'danger'
            });

            await errorToast.present();
            console.error(error);
            isUploadingGame.value = false;
        }
    }

    // Handle (preview) image removal
    const removeImagePreview = () => {
        newGame.value.image = '';
    }
    
    </script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Post your game</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <ion-list>

                <!-- Logic for file picking / using camera will be added later -->
                <ion-button v-if="!newGame.image" @click="triggerCamera" fill="clear" class="image-picker">
                    Choose file or take a picture 📸
                </ion-button>

                <section v-if="newGame.image">
                    <ion-button @click="removeImagePreview" fill="default" class="remove-image-preview">
                            <ion-icon slot="icon-only" :icon="trashOutline" color="danger"></ion-icon>
                    </ion-button>
                    <ion-img :src="newGame.image" class="image-preview"/>
                </section>

                <ion-list>
                    <ion-item>
                        <ion-select @ionChange="handleChange($event)" interface="popover" placeholder="Select condition">
                            <ion-select-option value="New">New</ion-select-option>
                            <ion-select-option value="Used">Used</ion-select-option>
                        </ion-select>
                    </ion-item>
                </ion-list>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Title</ion-label>
                    <ion-textarea type="text" v-model="newGame.title"></ion-textarea>
                </ion-item>
                
                <ion-item>
                    <ion-label class="label-mild" position="floating">Description</ion-label>
                    <ion-textarea type="text" v-model="newGame.description"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Price</ion-label>
                    <ion-textarea type="text" v-model="newGame.price"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-label class="label-mild" position="floating">Platform</ion-label>
                    <ion-textarea type="text" v-model="newGame.platform"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-label class="label-mild" position="floating">Address</ion-label>
                    <ion-textarea type="text" v-model="newGame.address"></ion-textarea>
                </ion-item>

                <ion-button @click="postNewGame" class="button-add" :disabled="isUploadingGame" fill="solid" color="secondary" size="default">
                    <ion-spinner v-if="isUploadingGame" name="dots"></ion-spinner>
                    <span>Send in 🎮</span>
                </ion-button>

            </ion-list>

        </ion-content>
    </ion-page>
</template>

<style scoped>
ion-content {
    --ion-background-color: #f4f4f4;
    display: flex;
}

ion-list {
    display: flex;
    flex-direction: column;
}

.label-mild {
    --color: #8a8a8a !important;
}

.image-picker {
    height: 20vh;
    margin: 10px;
    border: 2px #8a8a8a dashed;
    border-radius: 8px;
    font-size: medium;
}

.image-preview {
        height: 30vh;
        margin: 10px;
        border: none;
        border-radius: 8px;
}

.remove-image-preview {
    position: absolute;
    right: 0;
    }

.button-add {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>