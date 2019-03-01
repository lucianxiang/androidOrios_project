/**
 * Created by leibo on 18/7/4.
 */
import {postPromise,getNewStr} from '@/assets/js/public'

export default {

//微电影视频查询
  mobileMovieDetails({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/Film/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('mobileMovieDetails', data.data)
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
}
