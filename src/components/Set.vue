<template>
    <div class="Set">
        <b-list-group-item v-show="exists">
            <b-row align-v="center"> 
                <b-col sm=1>
                    Reps:
                </b-col>
                <b-col sm=1>
                    <b-form-input v-model="set.reps" @change="onChange" type="number"></b-form-input>
                </b-col>
                <b-col sm=1>
                    Weight:
                </b-col>
                <b-col sm=1>
                    <b-form-input v-model="set.weight" @change="onChange" type="number"></b-form-input>
                </b-col>
                <b-col sm=1 v-show="changed">
                    <b-button @click="putSet">Update</b-button>
                </b-col>
                <b-col sm=1>
                    <b-button variant="danger" @click="deleteSet">Delete</b-button>
                </b-col>
            </b-row>
        </b-list-group-item>
        
    </div>
</template>

<script>
import API from '@/mixins/API.vue';

export default {
    name: "Set",
    mixins: [API],
    data () {
        return {
            set: {
                id: null,
                exerciseId: null,
                workoutId: null,
                reps: 0,
                weight: 0.0
            },
            changed: false,
            exists: true
        }
    },
    props: {
        exerciseId: Number,
        workoutId: Number
    },
    methods: {
        onChange: function () {
            this.changed = true;
        },
        postSet: function() {
            this.api.post('/set', {
                exerciseId: this.set.id,
                workoutId: this.set.workoutId,
                reps: this.set.reps,
                weight: this.set.weight
            })
            .then(response => (this.set.id = response.data.id))
            .catch(error => (this.console.error(error)));
        },
        putSet: function() {
            this.api.put('/set/' + this.set.id, {
                exerciseId: this.set.id,
                workoutId: this.set.workoutId,
                reps: this.set.reps,
                weight: this.set.weight
            })
            .then(this.changed = false)
            .catch(error => (this.console.error(error)));
        },
        deleteSet: function() {
            this.api.delete('/set/' + this.set.id)
                .then(this.exists = false)
                .catch(error => (this.console.error(error)));
        }
    },
    created() {
        this.set.exerciseId = this.exerciseId;
        this.set.workoutId = this.workoutId;
        this.postSet();
    }
}
</script>