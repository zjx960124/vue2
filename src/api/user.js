import request from '@/utils/request'

export function getInfo(query) {
  return request({
    url: '/rest/paas/user/grant',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: 'rest/paas/login/out',
    method: 'get'
  })
}
