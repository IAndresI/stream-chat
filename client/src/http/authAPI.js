import $host from './index'

export const signUp = async (userData) => {
  const {data} = await $host.post('/auth/signup', userData)
  return data;
} 

export const login = async (userData) => {
  const {data} = await $host.post('/auth/login', userData)
  return data;
}