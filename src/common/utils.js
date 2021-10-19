export function debouce(func,delay = 50){
  let timerId = null;
  return function (){
    if(timerId !==null) clearTimeout(timerId)
    timerId = setTimeout(func,delay)
  }
}
/*
  防抖函数
*/
export function debounce(func, wait = 1000, immediate = false) {
  let time
  let debounced = function() {
    let context = this
    if(time) clearTimeout(time)

    if(immediate) {
      let callNow = !time
      if(callNow) func.apply(context, arguments)
      time = setTimeout(
        ()=>{time = null} //见注解
        , wait)
    } else {
      time = setTimeout(
        ()=>{func.apply(context, arguments)}
        , wait)
    }
  }
  debounced.cancel = function() {
    clearTimeout(time)
    time = null
  }
  return debounced
}

export function setStorage(key,value){
  if(!key) return
  if((typeof value) !== 'string'){
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key,value)
}

export function getStorage(key){
  if(!key)return
  return window.localStorage.getItem(key);
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

