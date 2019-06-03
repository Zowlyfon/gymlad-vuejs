<template>
    <div class="Set">
        <b-row>
            <b-col sm=3>
                <b-form-input v-model="set.reps" @change="onChange"></b-form-input>
            </b-col>
            <b-col sm=3>
                <b-form-input v-model="set.weight" @change="onChange"></b-form-input>
            </b-col>
        </b-row>
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
        setId: Int,
        exerciseId: Int,
        workoutId: Int
    },
    methods: {
        onChange: function () {
            this.changed = true;
        },
        postSet: function() {
            this.api.post('/set', {
                exerciseId: this.set.id,
                workoutId: this.set,workoutId,
                reps: this.set.reps,
                weight: this.set.weight
            })
            .then(reponse => (this.set.id = response.data.id))
            .catch(error => (this.console.error(error)));
        },
        putSet: function() {
            this.api.put('/set/' + this.set.id, {
                exerciseId: this.set.id,
                workoutId: this.set,workoutId,
                reps: this.set.reps,
                weight: this.set.weight
            })
            .then(this.changed = false)
            .catch(error => (this.console.error(error)));
        }
    }
}
</script>