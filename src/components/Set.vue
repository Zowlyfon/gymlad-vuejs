<template>
    <div class="Set">
        <b-row align-v="center"> 
            <b-col sm=1>
                Reps:
            </b-col>
            <b-col sm=1>
                <b-form-input :value="set.reps" @change="$emit('update-reps', $event)" type="number"></b-form-input>
            </b-col>
            <b-col sm=1>
                Weight:
            </b-col>
            <b-col sm=1>
                <b-form-input :value="set.weight" @change="$emit('update-weight', $event)" type="number"></b-form-input>
            </b-col>
            <b-col sm=1 v-show="set.changed">
                <b-button @click="$emit('update-set')">Update</b-button>
            </b-col>
            <b-col sm=1>
                <b-button variant="danger" @click="$emit('delete-set')">Delete</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "Set",
    data () {
        return {
        }
    },
    props: {
        set: {
            id: Number,
            exerciseId: Number,
            workoutId: Number,
            reps: Number,
            weight: Number,
            changed: Boolean
        }
    },
    methods: {
    },
    created() {
    }
}
</script>