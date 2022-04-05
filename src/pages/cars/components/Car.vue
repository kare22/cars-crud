<template>
    <div class="text-left text-info">
        <div>
            <div class="ml-2 d-flex justify-content-between">
                <div class="mt-auto">
                    Car title:
                </div>
                <div>
                    <a
                        v-if="!isNew"
                        class="btn btn-link text-info"
                        @click="remove"
                    >
                        <BIconX class="icon" />
                    </a>
                </div>
            </div>
            <input
                v-model="carData.title"
                type="text"
                class="form-control"
            >
        </div>
        <div class="my-4">
            <div class="ml-2">
                Car description:
            </div>
            <textarea
                v-model="carData.description"
                type="text"
                class="form-control"
            />
        </div>
        <div class="row my-md-4">
            <div class="col-6 col-md-4">
                <BFormSelect
                    v-model="carData.probability"
                    value-field="id"
                    text-field="title"
                    :options="probabilities"
                />
            </div>
            <div class="col-6 col-md-4">
                <BFormSelect
                    v-model="carData.impact"
                    value-field="id"
                    text-field="title"
                    :options="impacts"
                />
            </div>
            <div class="col-12 col-md-4 my-3 my-md-0">
                TODO
            </div>
        </div>
        <div class="mb-4">
            <div class="ml-2">
                Car response:
            </div>
            <textarea
                v-model="carData.response"
                type="text"
                class="form-control"
            />
        </div>
        <div class="mb-3 text-right">
            <button
                v-if="isNew"
                class="btn btn-outline-info mr-3"
                @click="cancel"
            >
                Cancel
            </button>
            <button
                class="btn btn-info"
                @click="save"
            >
                Save
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

const model = {
    id: null,
    title: '',
    description: '',
    response: '',
    category: null,
    probability: null,
    impact: null,
};

export default {
    name: 'Car',
    props: {
        car: {
            type: Object,
            required: true,
            validator(value) {
                return value.id && value.description && value.title && value.category && value.impact && value.probability;
            },
        },
    },
    data() {
        return {
            carData: model,
        };
    },
    computed: {
        ...mapGetters({
            probabilities: 'probabilities/data',
            impacts: 'impacts/data',
        }),
        isNew() {
            return !this.car.id;
        },
    },
    created() {
        Object.keys(this.carData).forEach(key => {
            this.carData[key] = this.car[key];
        });
    },
    methods: {
        async save() {
            if (this.isNew) {
                await this.$store.dispatch('cars/create', this.carData);
                this.$toastr.s(`Car ${this.carData.title} added successfully!`);
                this.reset();
            } else {
                await this.$store.dispatch('cars/update', this.carData);
                this.$toastr.s(`Car ${this.carData.title} updated successfully!`);
            }
            this.$emit('save');
        },
        cancel() {
            this.$emit('cancel');
        },
        remove() {
            this.$confirm({
                title: 'Are you sure?',
                message: `Are you sure you want to remove ${this.car.title}?`,
                button: {
                    yes: 'Yes',
                    no: 'Cancel'
                },
                callback: async(confirm) => {
                    if (confirm) {
                        await this.$store.dispatch('cars/remove', { id: this.car.id });
                        this.$toastr.e(`${this.car.title} was deleted!`);
                    }
                }
            });
        },
        reset() {
            this.carData = model;
        },
    }
};
</script>

<style scoped>

</style>