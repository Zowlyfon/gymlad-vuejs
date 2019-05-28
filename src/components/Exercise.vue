<template>
    <div class="Exercise"><b-form-input v-model="exercise.name" @change="onChange"></b-form-input> <b-button v-show="isNew" @click="postExercise">Add</b-button> <b-button v-show="!isNew && changed" @click="putExercise">Update</b-button></div>
</template>

<script>
import API from '@/mixins/API';

export default {
    name: 'Exercise',
    mixins: [API],
    data() {
        return {
            exercise: {
                id: null,
                name: ''
            },
            changed: false
        }
    },
    props: {
        exerciseId: String,
        exerciseName: String,
    },
    computed: {
        isNew: function() {
            if(this.exercise.id) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        onChange: function () {
            this.changed = true;
            this.exerciseName = this.exercise.name;
        },
        getExercise: function () {
            this.api.get('/exercise/' + this.exercise.id)
                .then(response => (this.exercise.name = response.data.name))
                .catch(error => (this.console.error(error)));
        },
        postExercise: function() {
            this.api.post('/exercise', {
                name: this.exercise.name
            })
            .then(response => (this.exercise.id = response.data.id))
            .catch(error => (this.console.error(error)));

        },
        putExercise: function() {
            this.api.put('/exercise/' + this.exercise.id, {
                id: this.exercise.id,
                name: this.exercise.name
            })
            .then(this.changed = false)
            .catch(error => (this.console.error(error)));
        }
    },
    created() {
        this.exercise.id = this.exerciseId;
        this.exercise.name = this.exerciseName;
    }
}
</script>

