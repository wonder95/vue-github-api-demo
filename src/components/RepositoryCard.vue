<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
  <v-card-title>
    {{ repository.name }}
    <v-avatar v-if="repository.owner.avatar_url" tile size="100">
      <img :src="repository.owner.avatar_url" />
    </v-avatar>
  </v-card-title>

  <v-card-text class="text--primary">
    <div>Description: {{ repository.description }}</div>
    <div>Owner: {{ repository.owner.login }}</div>
    <div>Language: {{ repository.language }}</div>
    <div>Watchers: {{ repository.watchers }}</div>
    <div>Forks: {{ repository.forks }}</div>
  </v-card-text>
  <v-card-actions>
    <v-btn :href="repository.html_url" target="_blank" text>Repo Page</v-btn>
    <v-btn v-if="repository.homepage" :href="repository.homepage" target="_blank" text>Home Page</v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RepositoryCard',
  props: {
    repository: {}
  }
}
</script>
