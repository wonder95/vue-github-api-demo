<template>
  <v-card v-if="Object.keys(user).length > 0"
    max-width="500"
    class="mx-auto"
  >
  <v-card-title>
    {{ user.name ? user.name : user.login }}
    <v-avatar tile size="100">
      <img :src="user.avatar_url" />
    </v-avatar>
  </v-card-title>

  <v-card-text class="text--primary">
    <div>Location: {{ user.location }}</div>
    <div>Bio: {{ user.bio }}</div>
    <div>Followers: {{ user.followers }}</div>
    <div>Following: {{ user.following }}</div>
    <div>Public Repos: {{ user.public_repos }}</div>
  </v-card-text>
  <v-card-actions>
    <v-btn :href="user.html_url" target="_blank" text>Profile</v-btn>
    <v-btn v-if="user.blog" :href="user.blog" target="_blank" text>Blog</v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {}
  }
}
</script>
