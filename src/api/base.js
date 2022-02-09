import request from '@/utils/request'

/**
 * 登录
 */
export function login(params) {
  return request({
    url: 'rest/enroll/login',
    method: 'post',
    params
  })
}

/**
 * 登出
 */
export function logout(params) {
  return request({
    url: 'rest/enroll/logout',
    method: 'post',
    params
  })
}

/**
 * 用户管理
 * @param {*} params 
 * @returns 
 */
export function getUserList(params) {
  return request({
    url: 'rest/enroll/user/page',
    method: 'get',
    params
  })
}

/**
 * 角色管理
 * @param {*} params 
 * @returns 
 */
export function getRoleList(params) {
  return request({
    url: 'rest/enroll/rolePage',
    method: 'get',
    params
  })
}

/**
 * 操作日志
 */
export function getOperateLogList(params) {
  return request({
    url: 'rest/enroll/operationLogPage',
    method: 'get',
    params
  })
}

/**
 * 日志删除
 */
export function operateLogDelete(params) {
  return request({
    url: 'rest/enroll/operationLog',
    method: 'delete',
    params
  })
}

/**
 * 字典查询
 */
export function getDictionaryList(params) {
  return request({
    url: 'rest/enroll/dictionaryPage',
    method: 'get',
    params
  })
}

/**
 * 信息公告
 */
export function getInformationList(params) {
  return request({
    url: 'rest/enroll/informationPage',
    method: 'get',
    params
  })
}

/**
 * type获取信息公告
 */
export function getInformationByType(params) {
  return request({
    url: 'rest/enroll/informationByType',
    method: 'get',
    params
  })
}

/**
 * 操作信息公告
 */
export function operateInformation(methods, params) {
  return request({
    url: 'rest/enroll/information',
    method: methods,
    params
  })
}

/**
 * 缴费计划
 */
export function getPlanList(params) {
  return request({
    url: 'rest/enroll/plan/page',
    method: 'get',
    params
  })
}

/**
 * 操作缴费计划
 */
export function operatePlan(method, params) {
  return request({
    url: 'rest/enroll/plan',
    method: method,
    params
  })
}

/**
 * 新增缴费计划
 */
export function newPlan(params) {
  return request({
    url: 'rest/enroll/plan',
    method: 'post',
    data: params
  })
}


/**
 * 关闭缴费计划
 */
export function closePlan(params) {
  console.log(params);
  return request({
    url: 'rest/enroll/plan/close',
    method: 'delete',
    params
  })
}

/**
 * 开启缴费计划
 */
 export function startPlan(params) {
  return request({
    url: 'rest/enroll/plan/start',
    method: 'delete',
    params
  })
}

/**
 * 所有字典目录大类
 */
export function getCatalogueList(params) {
  return request({
    url: 'rest/enroll/catalogue',
    method: 'get',
    params
  })
}

/**
 * 操作字典
 */
 export function operateDictionary(methods, params) {
  return request({
    url: 'rest/enroll/dictionary',
    method: methods,
    params
  })
}

/**
 * 部门
 */
export function getDeptList(params) {
  return request({
    url: 'rest/enroll/dept',
    method: 'get',
    params
  })
}

/**
 * 获取角色
 */
export function getAllRole(params) {
  return request({
    url: 'rest/enroll/enabledRole',
    method: 'get',
    params
  })
}

/**
 * 用户绑定角色
 */
export function UserRelevanceRole(params) {
  return request({
    url: 'rest/enroll/user/role',
    method: 'put',
    params
  })
}

/**
 * 获取角色关联菜单权限
 */
export function getRoleResource(params) {
  return request({
    url: 'rest/enroll/resource/roleCode',
    method: 'get',
    params
  })
}

/**
 * 操作用户管理列表
 */
export function operateUser(method, params) {
  return request({
    url: 'rest/enroll/user',
    method: method,
    params
  })
}

/**
 * 删除用户
 */
export function deleteUser(params) {
  return request({
    url: 'rest/enroll/user',
    method: 'delete',
    query: params
  })
}

/**
 * 查看全部权限
 */
export function getAllResource(params) {
  return request({
    url: 'rest/enroll/resource/appCode',
    method: 'get',
    params
  })
}

/**
 * 操作角色
 */
export function operateRole(method, params) {
  return request({
    url: 'rest/enroll/role',
    method: method,
    params
  })
}

/**
 * 角色启用
 */
export function enabledRole(params) {
  return request({
    url: 'rest/enroll/roleEnabled',
    method: 'put',
    params
  })
}

/**
 * 角色关联菜单权限
 */
export function roleRelevanceResource(params) {
  return request({
    url: 'rest/enroll/role/resource',
    method: 'put',
    params
  })
}



// 新生管理

/**
 * 导入学生计划
 */
export function importStudent(params) {
  return request({
    headers: {
      'Content-type': 'multipart/form-data'
    },
    url: 'rest/enroll/bill/student',
    method: 'post',
    data: params
  })
}

/**
 * 支付账单记录
 */
export function billingPageList(params) {
  return request({
    url: 'rest/enroll/pay-log/pageList',
    method: 'get',
    params 
  })
}

/**
 * 缴费名单记录
 */
 export function billPageList(params) {
  return request({
    url: 'rest/enroll/bill/page',
    method: 'get',
    params 
  })
}