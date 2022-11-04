<script setup lang="ts">
    import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar, } from '@ionic/vue';
    import { ref } from 'vue';


    // For feedback on upload
    //const isUploadingGame = ref(false);
    
    // Keeps track of all data input from the user towards adding a new camp spot
    const newGame = ref({
        title: "",
        description: "",
        price: "",
        platform: "",
        condition: [],
        image: ""
    });

    // Run Camera
    /* 
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
    */
    
    // Handle data POSTing
    /*
    const postNewGame = async () => {
        // TODO Logic to post the camp spot to the backend/Directus
        console.log(newGame.value);

        if(!newGame.value.image) {
            alert("Image upload required.");
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
                await directus.items('camping_spots').createOne({
                    title: newGame.value.title,
                    description: newGame.value.description,
                    price: newGame.value.price,
                    platform: newGame.value.platform,
                    condition: [],
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
    */


    // Handle (preview) image removal
    /*
    const removeImagePreview = () => {
        newGame.value.image = '';
    }
    */
    
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
                <button class="image-picker">
                    Choose file or take a picture 📸
                </button>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Title</ion-label>
                    <ion-input type="text" v-model="newGame.title"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Description</ion-label>
                    <ion-textarea type="password" v-model="newGame.description"></ion-textarea>
                </ion-item>

                <ion-button class="button-add" fill="solid" color="secondary" size="default">
                    Send in 🎮
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
    height: 30vh;
    margin: 10px;
    border: 2px #8a8a8a dashed;
    border-radius: 8px;
    font-size: medium;
}

.button-add {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>