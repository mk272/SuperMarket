import {request} from "./request"

export function getHomeMultidata(){
  return request({
    url:'/home/multidata' //接口数据
  }) //request结果返回一个Promise对象
}
