<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Tamu Natal SPRP Murutuwu</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="success"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data Tamu
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-data-table :headers="headers" :items="params" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key='item["Nama"]'>
                                <td class="title">{{ index + 1 }}</td>
                                <td class="title">{{ item["Nama"] }}</td>
                                <td class="title">{{ item["Alamat"] }}</td>
                                <td class="title">{{ item["No HP"] }}</td>
                                <td>
                                    <v-btn icon color="indigo" light @click="editHandler(item)" title="Edit">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click='deleteData(item["id"])' title="Delete">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    
                </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Tambah Data Tamu</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="4">
                                <h2 class="mt-2">Nama</h2>
                            </v-col>
                            <v-col class="ml-4" cols="7">
                                <v-text-field dense single-line outlined label="Nama" class="title mr-4" v-model="form.nama" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h2 class="mt-2">Alamat</h2>
                            </v-col>
                            <v-col class="ml-4" cols="7">
                                <v-text-field dense single-line outlined label="Alamat" class="title mr-4" v-model="form.alamat" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h2 class="mt-2">No HP</h2>
                            </v-col>
                            <v-col class="ml-4" cols="7">
                                <v-text-field dense single-line outlined label="No HP" class="title mr-4" v-model="form.noHP" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red white--text" dense rounded @click="close">Close</v-btn>
                    <v-btn class="ml-4 white--text" color="blue darken-1" rounded @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                statusUpdate: true,
                dialog: false,
                keyword: '',
                headers: [{
                        text: 'No',
                        value: 'no',
                        class: 'title',
                    },
                    {
                        text: 'Nama',
                        value: 'Nama',
                        class: 'title',
                    },
                    {
                        text: 'Asal SPP/R',
                        value: 'Alamat',
                        class: 'title',
                    },
                    {
                        text: 'No HP',
                        value: 'No HP',
                        class: 'title',
                    },
                    {
                        text: 'Aksi',
                        value: '',
                        class: 'title',
                    },
                ],
                params: [],
                snackbar: false,
                color: null,
                text: '',
                load: false,
                form: {
                    nama: '',
                    alamat: '',
                    noHP: '',
                },
                param: new FormData,
                typeInput: 'new',
                errors: '',
                updatedId: '',
            }
        },
        methods: {
            getData() {
                var uri = this.$apiUrl + 'tamus'
                this.$http.get(uri).then(response => {
                    this.params = response.data
                })
            },
           
            sendData() {
                this.param.append('nama', this.form.nama);
                this.param.append('alamat', this.form.alamat);
                this.param.append('noHP', this.form.noHP);
                var uri = this.$apiUrl + 'tamus'
                this.load = true
                this.$http.post(uri, this.param).then(response => {
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = response.data; //memasukkan pesan ke snackbar
                    this.load = false;
                    this.dialog = false
                    this.getData(); //mengambil data user
                    this.resetForm();
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            },
            updateData() {
                this.param.append('nama', this.form.nama);
                this.param.append('alamat', this.form.alamat);
                this.param.append('noHP', this.form.noHP);
                var uri = this.$apiUrl + 'tamus/' + this.updatedId;
                this.load = true
                this.$http.post(uri, this.param).then(response => {
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = response.data; //memasukkan pesan ke snackba
                    this.load = false;
                    this.dialog = false
                    this.statusUpdate = true
                    this.getData(); //mengambil data user
                    this.resetForm();
                    this.typeInput = 'new';
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                    this.typeInput = 'new';
                })
            },
            
            editHandler(item) {
                this.typeInput = 'edit';
                this.statusUpdate = false
                this.dialog = true;
                this.form.nama = item["Nama"];
                this.form.alamat = item["Alamat"];
                this.form.noHP = item["No HP"];
                this.updatedId = item["id"];
            },
            deleteData(deleteId) { //mengahapus data
                var uri = this.$apiUrl + 'tamus/' + deleteId; //data dihapus berdasarkan id
                this.$http.delete(uri).then(response => {
                    this.snackbar = true;
                    this.text = response.data;
                    this.color = 'green'
                    this.deleteDialog = false;
                    this.getData();
                }).catch(error => {
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                })
            },
            setForm() {
                if (this.typeInput === 'new') {
                    this.sendData()
                    
                } else {
                    this.updateData()
                }
            },
            close() {
                this.dialog = false
                this.resetForm()
            },
            resetForm() {
                this.form = {
                    nama: '',
                    alamat: '',
                    noHP: '',
                },
                this.statusUpdate = true
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>