<template>
    <CarForm :car="car" />
</template>

<script>
import CarForm from '@/pages/cars/components/CarForm';

export default {
    name: 'Car',
    components: { CarForm },
    props: {
        car: {
            type: Object,
            required: true,
            validator(value) {
                return value.id && value.description && value.title && value.category;
            },
        },
    },
};
</script>

<style scoped>

</style>