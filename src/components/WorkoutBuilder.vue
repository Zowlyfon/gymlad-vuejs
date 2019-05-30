<template>

</template>

<script>
import API from '@/mixins/API.vue'

export default {
    name: 'WorkoutBuilder',
    mixins: [API],
    data() {
        return {
            workout: {
                id,
                personId,
                time
            },
            sets: [],
            exercises: []
        }
    },
    methods: {
        getExercises() {
            this.api.get('/exercise')
                .then(response => (this.exercises = response.data))
                .catch(error => (this.console.error(error)));
        }
    }
}
</script>