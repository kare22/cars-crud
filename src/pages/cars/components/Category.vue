<template>
    <div>
        <div>
            <b-card-header
                header-tag="header"
                class="p-1"
                role="tab"
            >
                <b-button
                    v-b-toggle="`collapse-${id}`"
                    block
                    variant="info"
                    @click="toggleOpen"
                >
                    <div class="d-flex justify-content-between">
                        <div>
                            {{ title }} ({{ cars && cars.length || 0 }})
                        </div>
                        <div>
                            <BIconChevronUp v-if="open" />
                            <BIconChevronDown v-else />
                        </div>
                    </div>
                </b-button>
            </b-card-header>
            <b-collapse :id="`collapse-${id}`">
                <b-card>
                    <div
                        v-for="car in cars"
                        :key="car.id"
                    >
                        <Car :car="car" />
                        <div class="separator border-info" />
                    </div>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Car from '@/pages/cars/components/Car';

export default {
    name: 'Category',
    components: {
        Car,
    },
    props: {
        id: {
            type: [String, Number],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            open: false,
        };
    },
    computed: {
        ...mapGetters({
            carTypes: 'cars/categorized',
        }),
        cars() {
            return this.carTypes[this.id];
        },
    },
    methods: {
        toggleOpen() {
            this.open = !this.open;
        },
    },
};
</script>

<style scoped>
.separator {
    border-top: 3px solid black;
}
</style>