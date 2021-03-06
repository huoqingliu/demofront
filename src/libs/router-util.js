import { getRouters } from '@/api/login'
import { getToken } from '@/libs/utils'
import Main from '@/components/main'

export const initRouter = async(vm) => {
  if (!getToken()) {
    return 
  }
  let list = []
  var res=await getRouters()
  var routers = res.data
  list = formatRouters(routers)
  localStorage.setItem('route',JSON.stringify(list))
  await vm.$store.commit('updateRouters', list)
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
    if (item.children&&item.children[0]) {
      obj.component = Main
      
      obj.children = formatRouters(item.children)
    } else {
      let component = item.component
      obj.component = () => import('@/view/' + component)
      obj.children = []
    }
    res.push(obj)
  })
  return res
}
