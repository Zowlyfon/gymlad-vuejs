<template>
    <div id='workout'>
        <Workout></Workout>
    </div>
</template>

<script>
import Workout from '@components/Workout.vue'

export default {
    name: 'workout',
    components: {
        Exercise
    }
}
</script>