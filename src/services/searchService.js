import axios from 'axios'

export default {
  getEntity (entity, searchText, order) {
    const params = new URLSearchParams()
    params.append('q', searchText)
    params.append('sort:', order)
    return axios.get('https://api.github.com/search/' + entity, {
      params: params
    })
  },
  getItem (url) {
    return axios.get(url)
  }
}
