<template>
    <div id='workout'>
        <h2>Workout Builder</h2>
        <WorkoutBuilder></WorkoutBuilder>
    </div>
</template>

<script>
import WorkoutBuilder from '@/components/WorkoutBuilder.vue'

export default {
    name: 'workout',
    components: {
        WorkoutBuilder
    }
}
</script>