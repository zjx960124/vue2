import request from '@/utils/request'

/* 获取oss信息 */
export function getOssInfo(query) {
  return request({
    url: '/rest/paas/oss-key',
    method: 'get',
    params: query
  })
}

/* 获取oss文件列表 */
export function getOssList(query) {
  return request({
    url: '/rest/paas/oss-list',
    method: 'get',
    params: query
  })
}

/* 删除oss文件*/
export function deleteFile(query) {
  return request({
    url: '/rest/paas/oss',
    method: 'delete',
    params: query
  })
}

/* 提交pv统计 */
export function insertAuditLog(data) {
  return request({
    url: '/rest/paas/insert-audit-log',
    method: 'post',
    data
  })
}

/* 返回所有icon信息  */
export function getIconList(query) {
  return request({
    url: '/rest/paas/icon/list',
    method: 'get',
    params: query
  })
}

/* 删除icon */
export function deleteIcon(query) {
  return request({
    url: '/rest/paas/icon',
    method: 'delete',
    params: query
  })
}

/* 上传Icon文件，且返回文件路径  */
export function uploadIcon(data) {
  return request({
    url: '/rest/paas/icon/upload',
    method: 'post',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    data
  })
}
