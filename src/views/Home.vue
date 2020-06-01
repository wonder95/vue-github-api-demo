<template>
  <v-container>
    <section class="top">
      <v-layout column>
        <v-form
          ref="form"
        >
          <v-text-field
            placeholder="Search GitHub"
            v-model="searchString"
          ></v-text-field>

          <v-btn
           class="mr-4"
           small
           color="primary"
           @click.stop="search"
          >
            Search
          </v-btn>
        </v-form>
        <v-radio-group v-model="searchType" label="Search Type:" row>
          <v-radio label="Users" value="users"></v-radio>
          <v-radio label="Repositories" value="repositories"></v-radio>
          <v-radio label="Issues" value="issues"></v-radio>
        </v-radio-group>

        <v-radio-group v-model="searchOrder" label="Order:" row>
          <v-radio label="Ascending" value="asc"></v-radio>
          <v-radio label="Descending" value="desc"></v-radio>
        </v-radio-group>

        <UserCard v-if="showUser"
          :user="item"
        >
        </UserCard>

        <RepositoryCard v-if="showRepository"
          :repository="item"
        >
        </RepositoryCard>

        <IssueCard v-if="showIssue"
          :issue="item"
        >
        </IssueCard>

      </v-layout>
    </section>
    <v-divider dark></v-divider>
    <section class="bottom">
      <v-data-table
        caption="Search Results"
        :headers="headers[searchType]"
        :items="items"
        item-key="id"
        :items-per-page="10"
        @click:row="rowClick"
      >
      </v-data-table>
    </section>
  </v-container>
</template>

<script>
import searchService from '@/services/searchService'

export default {
  name: 'Home',
  data: () => ({
    items: [],
    item: {},
    searchString: '',
    searchType: 'users',
    searchOrder: 'desc',
    headers: {
      users: [
        {
          text: 'Name',
          value: 'login',
          align: 'start'
        },
        {
          text: 'Type',
          value: 'type'
        }
      ],
      repositories: [
        {
          text: 'Name',
          value: 'name',
          align: 'start'
        },
        {
          text: 'Language',
          value: 'language'
        }
      ],
      issues: [
        {
          text: 'Number',
          value: 'number',
          align: 'start'
        },
        {
          text: 'ID',
          value: 'id'
        }
      ]
    }
  }),
  components: {
    UserCard: () => import('@/components/UserCard'),
    RepositoryCard: () => import('@/components/RepositoryCard'),
    IssueCard: () => import('@/components/IssueCard')
  },
  methods: {
    async search () {
      this.item = {}
      this.items = []
      const ghItems = await searchService.getEntity(this.searchType, this.searchString, this.searchOrder)
      if (ghItems.data.total_count > 0) {
        this.items = ghItems.data.items
        // Display the first item
        this.setItem(ghItems.data.items[0])
      }
    },
    async rowClick (row) {
      const ghUser = await searchService.getItem(row.url)
      this.setItem(ghUser.data)
    },
    setItem (item) {
      this.item = item
    }
  },
  computed: {
    showUser () {
      return !!(this.searchType === 'users' & Object.keys(this.item).length > 0)
    },
    showRepository () {
      return !!(this.searchType === 'repositories' & Object.keys(this.item).length > 0)
    },
    showIssue () {
      return !!(this.searchType === 'issues' & Object.keys(this.item).length > 0)
    }
  }
}
</script>
