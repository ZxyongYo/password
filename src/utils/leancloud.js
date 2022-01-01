// @ts-nocheck
// https://leancloud.cn/docs/leanstorage_guide-js.html#hash668169761
const AV = require('leancloud-storage')

AV.init({
  appId: 'KPVLgMgYWD0PwYqsMzQRs5hI-MdYXbMMI',
  appKey: 'YJWsS81h89jbzqex54peI84M'
})

/**
 * 查询
 */
export const fetchList = async () => {
  const query = new AV.Query('password')
  try {
    const res = await query.find()
    const list = res.map(item => ({
      id: item.id,
      createTime: item.createdAt,
      updateTime: item.updatedAt,
      account: item.attributes.account,
      password: item.attributes.password,
      title: item.attributes.title,
      website: item.attributes.website
    }))
    return Promise.resolve(list)
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * 新增
 * @param {{title: string, website: string, account: string, password: string}} data 
 */
export const insertOne = async (data) => {
  const {title, website, account, password} = data
  if(!title || !website || !account || !password) {
    throw new Error(`expect {title, website, account, password} but got ${JSON.stringify(data)}`)
  }
  try {
    // 声明 class
    const Container = AV.Object.extend('password')
    // 构建对象
    const pwd = new Container()
    // 为属性赋值
    pwd.set('title', title)
    pwd.set('website', website)
    pwd.set('account', account)
    pwd.set('password', password)
    // 将对象保存到云端
    const res = await pwd.save()
    return Promise.resolve(res)
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * 删除
 * @param {string} id 删除项的id
 */
export const deleteOne = async (id) => {
  try {
    const pwd = AV.Object.createWithoutData('password', id)
    const res = await pwd.destroy()
    return Promise.resolve(res)
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * 更新
 * @param {{id: string, title?: string, website?: string, account?: string, password?: string}} data 更新内容
 */
 export const updateOne = async (data) => {
  const {id, title, website, account, password} = data
  if(!id) {
    throw new Error(`params 'id' is required`)
  }
  try {
    const pwd = AV.Object.createWithoutData('password', id)
    title && pwd.set('title', title)
    website && pwd.set('website', website)
    account && pwd.set('account', account)
    password && pwd.set('password', password)
    const res = await pwd.save()
    return Promise.resolve(res)
  } catch (e) {
    return Promise.reject(e)
  }
}

export default AV
