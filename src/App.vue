<template>
  <div id="app">
    <b-container fluid>
      <b-row align-v="start">
      <b-col sm=2>
        <h1>GymLad</h1>
        <div id="nav">
          <router-link to="/exercises">Exercises</router-link> |
          <router-link to="/workouts">Workouts</router-link>
        </div>
      </b-col>
      <b-col sm="10">
        <router-view/>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
