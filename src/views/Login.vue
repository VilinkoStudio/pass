<template>
  <div class="page-container">
    <div class="form-card vilinko-card">
      <h1 class="form-title">登录</h1>

      <div v-if="errorMsg" class="form-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label" for="username">用户名 / 邮箱</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="form-input vilinko-input"
            placeholder="请输入用户名或邮箱"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">密码</label>
          <div class="password-toggle">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input vilinko-input"
              placeholder="请输入密码"
              required
              :disabled="loading"
            />
            <i
              :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye', 'password-toggle-icon']"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>

        <div class="form-checkbox-group">
          <label class="form-checkbox-label">
            <input
              v-model="form.remember"
              type="checkbox"
              :disabled="loading"
            />
            记住我
          </label>
          <router-link to="/forgot-password" class="form-link">
            忘记密码?
          </router-link>
        </div>

        <button
          type="submit"
          class="form-button vilinko-button vilinko-button-primary"
          :disabled="loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="form-footer">
        还没有账号?
        <router-link to="/register" class="form-link">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth.js'

const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const loading = ref(false)
const errorMsg = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!form.username || !form.password) {
    errorMsg.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    await login(form.username, form.password)

    if (form.remember) {
      localStorage.setItem('remember', 'true')
      localStorage.setItem('savedUsername', form.username)
    } else {
      localStorage.removeItem('remember')
      localStorage.removeItem('savedUsername')
    }

    router.push('/profile')
  } catch (error) {
    errorMsg.value = error.message || '登录失败，请检查用户名和密码'
  } finally {
    loading.value = false
  }
}

const savedUsername = localStorage.getItem('savedUsername')
if (savedUsername) {
  form.username = savedUsername
  form.remember = true
}
</script>

<style scoped>
.password-toggle {
  position: relative;
}

.password-toggle .form-input {
  padding-right: 44px;
}

.password-toggle-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s ease;
}

.password-toggle-icon:hover {
  color: var(--vilinko-primary-color);
}
</style>
