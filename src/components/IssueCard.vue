<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
  <v-card-title>
    {{ issue.title }}
  </v-card-title>

  <v-card-text class="text--primary">
    <div>Description: {{ issue.description }}</div>
    <div>Number: {{ issue.number }}</div>
    <div>Num Comments: {{ issue.comments }}</div>
  </v-card-text>
  <v-card-actions>
    <v-btn :href="issue.html_url" target="_blank" text>Issue Page</v-btn>
    <v-btn v-if="issue.homepage" :href="issue.repository_url" target="_blank" text>Repo Page</v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RepositoryCard',
  props: {
    issue: {}
  }
}
</script>
