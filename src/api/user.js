import request from '@/utils/request'

export function getInfo(query) {
  return request({
    url: 'rest/enroll/user/grant',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: 'rest/enroll/login/out',
    method: 'get'
  })
}

export function logint(data) {
  return request({
    url: 'rest/enroll/login',
    method: 'POST',
    params: data
  })
}
