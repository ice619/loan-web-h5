import FetchDog from 'fetch-dog'
import {getToken, getLanguage} from '@/utils/VueCookies'

FetchDog.prototype.put = function (url, data, options) {
  return this.create({
    method: 'PUT',
    url: url,
    data: data,
    options: options
  })
}

FetchDog.prototype.delete = function (url, data, options) {
  return this.create({
    method: 'DELETE',
    url: url,
    data: data,
    options: options
  })
}

const fd = new FetchDog({fetch, Headers})

fd.interceptors.request.push(req => {
  req.headers.set('xxl_sso_sessionid', getToken())
  req.headers.set('language', getLanguage())
  req.url = req.url.indexOf('http') >= 0 ? req.url : process.env.API_ROOT + req.url
  return req
})
fd.interceptors.response.push(async response => {
  await checkStatus(response)
  let res = parseJSON(await response.text())
  switch (res.code) {
    case '00001':
      break
    default:
      return res
  }
})
export default fd

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (text) {
  let res = text.replace(/("[^"]*"\s*:\s*)(\d{16,})/g, '$1"$2"')
  return JSON.parse(res)
}
