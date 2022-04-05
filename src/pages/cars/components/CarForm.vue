<template>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <BForm class="text-left text-info" @submit.stop.prevent="save">
        <div>
            <div class="my-3" v-if="isNew">
                <div class="ml-2">
                    Car category:
                </div>
                <div>
                    <ValidationProvider name="Category" :rules="{ required: true}" v-slot="validationContext">
                        <BFormSelect
                            v-model="carData.category"
                            value-field="id"
                            text-field="title"
                            :options="categories"
                            :state="getValidationState(validationContext)"
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Please select a category --</b-form-select-option>
                            </template>
                        </BFormSelect>
                        <BFormInvalidFeedback>{{ validationContext.errors[0] }}</BFormInvalidFeedback>
                    </ValidationProvider>
                </div>
            </div>
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
            <ValidationProvider name="Title" :rules="{ required: true, min: 4 }" v-slot="validationContext">
                <BFormInput
                    v-model="carData.title"
                    :state="getValidationState(validationContext)"
                ></BFormInput>
                <BFormInvalidFeedback>{{ validationContext.errors[0] }}</BFormInvalidFeedback>
            </ValidationProvider>
        </div>
        <div class="my-4">
            <div class="ml-2">
                Car description:
            </div>
            <ValidationProvider name="Description" :rules="{ required: true}" v-slot="validationContext">
                <BFormTextarea
                    v-model="carData.description"
                    :state="getValidationState(validationContext)"
                ></BFormTextarea>
                <BFormInvalidFeedback>{{ validationContext.errors[0] }}</BFormInvalidFeedback>
            </ValidationProvider>
        </div>
        <div class="row my-md-4">
            <div class="col-6 col-md-4">
                Probability
                <BFormSelect
                    v-model="carData.probability"
                    value-field="id"
                    text-field="title"
                    :options="probabilities"
                />
            </div>
            <div class="col-6 col-md-4">
                Impact
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
                type="submit"
            >
                Save
            </button>
        </div>
    </BForm>
    </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CarForm',
    props: {
        car: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            carData: {
                id: null,
                title: '',
                description: '',
                response: '',
                category: null,
                probability: null,
                impact: null,
            },
        };
    },
    computed: {
        ...mapGetters({
            probabilities: 'probabilities/data',
            impacts: 'impacts/data',
            categories: 'categories/data',
        }),
        isNew() {
            return !this.car?.id;
        },
    },
    created() {
        if(!this.isNew) {
            Object.keys(this.carData).forEach(key => {
                this.carData[key] = this.car[key];
            });
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async save() {
            if (!(await this.$refs?.observer?.validate())) {
                return;
            }
            if (this.isNew) {
                await this.$store.dispatch('cars/create', {car: this.carData});
            } else {
                await this.$store.dispatch('cars/update', {car: this.carData});
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
    },
};
</script>

<style scoped>

</style>