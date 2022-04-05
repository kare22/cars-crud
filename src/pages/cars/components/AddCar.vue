<template>
    <CarForm
        @cancel="$emit('close')"
    />
</template>

<script>
import CarForm from '@/pages/cars/components/CarForm';
export default {
    name: 'AddCar',
    components: { CarForm },
};
</script>

<style scoped>

</style>