import VueCookies from 'vue-cookies'

const TokenKey = 'Admin-Token'
const LanguageKey = 'language'

export function getToken () {
  return VueCookies.get(TokenKey)
}

export function setToken (token) {
  if (token !== undefined && token !== null && token !== '') {
    return VueCookies.set(TokenKey, token)
  }
}

export function removeToken () {
  return VueCookies.remove(TokenKey)
}

export function setLanguage (lang) {
  if (lang === undefined || lang === null || lang === '') {
    lang = getLanguage() ? getLanguage() : 'zh'
  }
  return VueCookies.set(LanguageKey, lang)
}

export function getLanguage () {
  return VueCookies.get(LanguageKey)
}
