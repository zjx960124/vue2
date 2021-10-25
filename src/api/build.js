import request from '@/utils/request';

// 首页
export function getHomeData(query) {
  return request({
    url: '/rest/report/allSchool/get',
    method: 'get',
    params: query
  })
}

export function getMapData(query) {
  return request({
    url: '/rest/report/allSchool/syqk',
    method: 'get',
    params: query
  })
}

export function getProvinceMapData(query) {
  return request({
    url: '/rest/report/allSchool/syqksn',
    method: 'get',
    params: query
  })
}



// 校园管理
export function getCampusGet(query) {
  return request({
    url: '/rest/report/schoolAdmin/get',
    method: 'get',
    params: query
  })
}

export function getCampusYear(query) {
  return request({
    url: '/rest/report/schoolAdmin/yearMonthList',
    method: 'get',
    params: query
  })
}

export function getCampusJxzl(query) {
  return request({
    url: '/rest/report/schoolAdmin/jxzl',
    method: 'get',
    params: query
  })
}

export function getCampusTop(query) {
  return request({
    url: '/rest/report/schoolAdmin/bjpfTop5',
    method: 'get',
    params: query
  })
}

// 师资力量
export function getTeacherData(query) {
  return request({
    url: '/rest/report/teacherPower/get',
    method: 'get',
    params: query
  })
}

// 学生发展
export function getStudentData(query) {
  return request({
    url: '/rest/report/studentDev/get',
    method: 'get',
    params: query
  })
}

export function getStudentGrade(query) {
  return request({
    url: '/rest/report/studentDev/gradeAndCourse',
    method: 'get',
    params: query
  })
}

export function getStudentXsxycj(query) {
  return request({
    url: '/rest/report/studentDev/xsxycj',
    method: 'get',
    params: query
  })
}

// OA流程
export function getOAData(query) {
  return request({
    url: '/rest/report/OAprocess/get',
    method: 'get',
    params: query
  })
}
