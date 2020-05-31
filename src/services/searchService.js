import axios from 'axios'

export default {
  getEntity (entity, searchText) {
    return axios.get('https://api.github.com/search/' + entity + '?q=' + searchText)
  },
  getItem (url) {
    return axios.get(url)
  }
}
