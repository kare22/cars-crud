<template>
    <BModal
        v-if="isOpen"
        :size="size"
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
    props: {
        size: {
            type: String,
            default: 'lg',
        },
    },
    data() {
        return {
            isOpen: false,
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