<template>
    <BModal
        v-if="isOpen"
        :ref="`modal_${id}`"
        :visible="true"
        hide-header
        hide-footer
        @hidden="close"
        @ok="save"
        @cancel="close"
    >
        <slot />
    </BModal>
</template>

<script>
import { v1 as uuid } from 'uuid';

export default {
    name: 'Modal',
    data() {
        return {
            isOpen: true,
            id: uuid(),
        };
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        save() {
            this.$emit('save');
        },
    },
};
</script>

<style scoped>

</style>