/**
 * Created by leibo on 18/7/4.
 */
import {postPromise, getNewStr} from '@/assets/js/public'

export default {
  //租车城市
  initRentalCarCity({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CarRentalWebPage/GetCarRentCity', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            let arr = [
              {
                cityLetter: 'A',
                cityName: data.ABCD.filter(item => {
                  if (item.CityFirst == 'A') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'B',
                cityName: data.ABCD.filter(item => {
                  if (item.CityFirst == 'B') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'C',
                cityName: data.ABCD.filter(item => {
                  if (item.CityFirst == 'C') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'D',
                cityName: data.ABCD.filter(item => {
                  if (item.CityFirst == 'D') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'E',
                cityName: data.EFGHI.filter(item => {
                  if (item.CityFirst == 'E') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'F',
                cityName: data.EFGHI.filter(item => {
                  if (item.CityFirst == 'F') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'G',
                cityName: data.EFGHI.filter(item => {
                  if (item.CityFirst == 'G') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'H',
                cityName: data.EFGHI.filter(item => {
                  if (item.CityFirst == 'H') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'I',
                cityName: data.EFGHI.filter(item => {
                  if (item.CityFirst == 'I') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'J',
                cityName: data.JKLM.filter(item => {
                  if (item.CityFirst == 'J') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'K',
                cityName: data.JKLM.filter(item => {
                  if (item.CityFirst == 'K') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'L',
                cityName: data.JKLM.filter(item => {
                  if (item.CityFirst == 'L') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'M',
                cityName: data.JKLM.filter(item => {
                  if (item.CityFirst == 'M') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'N',
                cityName: data.NOPQRS.filter(item => {
                  if (item.CityFirst == 'N') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'O',
                cityName: data.NOPQRS.filter(item => {
                  if (item.CityFirst == 'O') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'P',
                cityName: data.NOPQRS.filter(item => {
                  if (item.CityFirst == 'P') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'Q',
                cityName: data.NOPQRS.filter(item => {
                  if (item.CityFirst == 'Q') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'R',
                cityName: data.NOPQRS.filter(item => {
                  if (item.CityFirst == 'R') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'S',
                cityName: data.NOPQRS.filter(item => {
                  if (item.CityFirst == 'S') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'T',
                cityName: data.TUVWX.filter(item => {
                  if (item.CityFirst == 'T') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'U',
                cityName: data.TUVWX.filter(item => {
                  if (item.CityFirst == 'U') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'V',
                cityName: data.TUVWX.filter(item => {
                  if (item.CityFirst == 'V') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'W',
                cityName: data.TUVWX.filter(item => {
                  if (item.CityFirst == 'W') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'X',
                cityName: data.TUVWX.filter(item => {
                  if (item.CityFirst == 'X') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'Y',
                cityName: data.YZ.filter(item => {
                  if (item.CityFirst == 'Y') {
                    return true
                  }
                  return false
                })
              },
              {
                cityLetter: 'Z',
                cityName: data.YZ.filter(item => {
                  if (item.CityFirst == 'Z') {
                    return true
                  }
                  return false
                })
              }
            ];
            commit('initRentalCarCity', arr)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //租车地标
  initCarLandmark({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CarRentalWebPage/GetCityLandmark', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            commit('initCarLandmark', data)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //租车还车地标
  initReturnLandmark({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CarRentalWebPage/GetCityLandmark', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            commit('initReturnLandmark', data)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
}
