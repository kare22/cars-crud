<template>
    <Main>
        cars
        {{ cars }}
        <br>
        ------------------------------------------------
        <br>
        {{ categories }}
        <br>
        ------------------------------------------------
        <br>
        {{ probabilities }}
        <br>
        ------------------------------------------------
        <br>
        {{ impacts }}
    </Main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Cars',
    computed: {
        ...mapGetters({
            cars: 'cars/data',
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
};
</script>

<style scoped>

</style>