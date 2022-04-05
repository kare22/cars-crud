<template>
    <Main>
        <div class="row">
            <div class="col-4 text-left">
                <button class="btn btn-info" @click="openAddCarModal">
                    New Car
                </button>
            </div>
            <div class="col-4">
                <h1 class="text-info font-weight-bold">
                    Car details
                </h1>
            </div>
            <div class="col-4" />
        </div>
        <Category
            v-for="{id, title} in categories"
            :id="id"
            :key="id"
            :title="title"
        />
        <Modal ref="addCarModal">
           asadf
        </Modal>
    </Main>
</template>

<script>
import { mapGetters } from 'vuex';
import Category from '@/pages/cars/components/Category';
import Main from '@/layouts/Main';
import Modal from '@/components/Modal';

export default {
    name: 'Cars',
    components: { Category, Main, Modal, },
    computed: {
        ...mapGetters({
            cars: 'cars/categorized',
            categories: 'categories/data',
            probabilities: 'probabilities/data',
            impacts: 'impacts/data',
        }),
    },
    created() {
        this.$store.dispatch('cars/get');
        this.$store.dispatch('categories/get');
        this.$store.dispatch('probabilities/get');
        this.$store.dispatch('impacts/get');
    },
    methods: {
        openAddCarModal() {
            console.log(this.$refs?.addCarModal);
            this.$refs?.addCarModal?.open();
        },
    },
};
</script>

<style scoped>

</style>