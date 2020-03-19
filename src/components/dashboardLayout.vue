<template>
    <div>
        <v-navigation-drawer v-model="drawer" class="grey darken-3" dark app clipped fixed temporary>
            <v-list-item >
                <v-list-item-content>
                    <v-list-item-title class="title">
                        ADMIN
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        SPRP GKE MURUTUWU
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            
            <v-list>
                <v-list-item to="/" link>
                    <v-list-item-content>
                        <v-list-item-title>Data Tamu</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar dark app fixed clipped-left height="70px" color="grey darken-3">
            <v-app-bar-nav-icon  @click.stop="drawer = !drawer">
                </v-app-bar-nav-icon>
                <VSpacer />


                <img src="../assets/logo.png" style="height:45px;width:45px">

                <v-toolbar-title style="font-size: 21px;" class="white--text ml-2">
                    SPRP GKE MURUTUWU
                </v-toolbar-title>
        </v-app-bar>
        <VContent>
            <!-- <v-alert v-if="warningText" close-text="Close Alert" dismissible type="warning">
                I'm a warning alert.
            </v-alert> -->
            <router-view />
        </VContent>
    </div>
</template>
<script>
export default {
    data() {
        return {
            drawer: null,
        }
    },
}
</script>
