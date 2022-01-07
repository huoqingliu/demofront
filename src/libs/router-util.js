import { getRouters } from '@/api/login'
import { getToken } from '@/libs/utils'
import Main from '@/components/main'

export const initRouter = (vm) => {
  console.log('initRouter');
  if (!getToken()) {
    return 
  }
  let list = []
  getRouters().then((res) => {
    var routers = res.data
    list = formatRouters(routers)
    localStorage.setItem('route',JSON.stringify(list))
    vm.$store.commit('updateRouters',list)
  })
  return list

}


export const loadMenu = () => {

  let list = []
  let data = localStorage.getItem('route')
  if (!data||data==undefined||data=='undefined') {
    return list
  }
  list = formatRouters(JSON.parse(data))
  return list
 }

export const formatRouters = (list) => {
  let res = []
  list.forEach((item)=>{
    let obj = {
      path :item.path,
      name :item.name,
    }
    obj.meta = item.meta
    obj.icon = (item.meta&&item.meta.icon)||''
    if (item.hasChildren) {
      let component = item.component
      obj.component = () => import('@/view/' + component)
      if (item.children[0]) {
        obj.children = formatRouters(item.children)
      }
    } else {
      obj.component = Main
    }
    res.push(obj)
  })
  return res
}
