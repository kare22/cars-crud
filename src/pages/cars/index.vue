<template>
    <Main>
        cars
        {{ cars }}
    </Main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Cars',
    computed: {
        ...mapGetters({
            cars: 'cars/data',
        }),
    },
    created() {
        this.$store.dispatch('cars/get');
    },
};
</script>

<style scoped>

</style>