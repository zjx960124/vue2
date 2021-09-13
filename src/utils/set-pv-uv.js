import {
  insertAuditLog
} from '@/api/common'

export function setPv(username = '', roleCodes = '', roleNames = '', routerPath = '', routerName = '') {
  const params = {
    appcode: 'lapp-paas',
    username: username,
    rolecodes: roleCodes,
    rolenames: roleNames,
    routerpath: routerPath,
    routername: routerName
  }
  // insertAuditLog(params).then(res => {

  // }).catch(err => {
  //     console.log(err)
  // })
}
