<template>
  <section class="container">
      <div class="row">
         <h2>Training Search Form</h2>
        <div class="col-md-12">
          <div class="form-group m-t5">
            <input v-model="query" type="text" classs="form-control" placeholder="Find training titles...">
          </div>
        </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="card columns list-unstyled">
          <li v-for="trainings in filteredList" :key="training_id" class="card">
          <div class="card-body">
            <h5 class="card-title">{{trainings.title_of_training }}</h5>
            <router-link :to="{ name: 'training_id', params: {id: training_id}}" tag="a" class="btn btn-primary">
              filler
            </router-link>
          </div>
          </li>
          <p v-if="!filteredList.lenght">No Results :(</p>
          </ul>
    </div>
  </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiURL = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiURL)

export default{
  data() {
    return{
      query:''
    }
  },
  computed: {
    filteredList(){
      return this.training.filter(trainings =>{
        return trainings.title_of_training.toTitleCase().includes(this.query.toTitleCase())
      })
    },
    training(){
      return this.$store.getters['trainings/list']
    }

  },
  async fetch({ store }){
    store.commit('trainings/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          trainings {
            training_id
            title_of_training
            length
            category
          }
        }`
      }
    })
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

