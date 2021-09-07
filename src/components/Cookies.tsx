import { Cookies } from 'react-cookie'
import { CookieSetOptions } from 'universal-cookie'

const cookies = new Cookies()

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const setCookie = (name: string, value: string, option: any) => {
  return cookies.set(name, value, { ...option })
}

export const removeCookie = (name: string, path?: CookieSetOptions) => {
  return cookies.remove(name, path)
}
