import axios from 'axios'
import { casdoorConfig } from './casdoor.js'

const api = axios.create({
  baseURL: casdoorConfig.serverUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.msg || error.message || '请求失败'
    return Promise.reject(new Error(message))
  }
)

export async function login(username, password) {
  try {
    const response = await api.post('/api/login', {
      username,
      password,
      responseType: 'login'
    })
    
    if (response.data?.msg) {
      throw new Error(response.data.msg)
    }
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', username)
    }
    
    return response.data
  } catch (error) {
    throw error
  }
}

export async function signup(userData) {
  try {
    const response = await api.post('/api/signup', {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      organization: casdoorConfig.organizationName,
      app: casdoorConfig.appName
    })
    
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getAccount() {
  try {
    const username = localStorage.getItem('username')
    if (!username) {
      throw new Error('未登录')
    }
    
    const response = await api.get('/api/get-account', {
      params: {
        owner: casdoorConfig.organizationName,
        name: username
      }
    })
    
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateAccount(userData) {
  try {
    const response = await api.post('/api/update-account', {
      owner: casdoorConfig.organizationName,
      name: userData.name,
      updatedUser: userData
    })
    
    return response.data
  } catch (error) {
    throw error
  }
}

export async function changePassword(oldPassword, newPassword) {
  try {
    const username = localStorage.getItem('username')
    if (!username) {
      throw new Error('未登录')
    }
    
    const response = await api.post('/api/update-account', {
      owner: casdoorConfig.organizationName,
      name: username,
      oldPassword,
      newPassword
    })
    
    return response.data
  } catch (error) {
    throw error
  }
}

export async function logout() {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user')
    
    await api.post('/api/signout')
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user')
  }
}

export async function forgotPassword(email) {
  try {
    const response = await api.post('/api/reset-password', {
      email,
      organization: casdoorConfig.organizationName
    })
    
    return response.data
  } catch (error) {
    throw error
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export default {
  login,
  signup,
  getAccount,
  updateAccount,
  changePassword,
  logout,
  forgotPassword,
  isLoggedIn,
  getCurrentUser,
  setCurrentUser
}
