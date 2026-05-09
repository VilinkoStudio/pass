<template>
  <div class="page-container">
    <div class="form-card vilinko-card">
      <h1 class="form-title">注册账号</h1>

      <div v-if="errorMsg" class="form-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMsg }}
      </div>

      <div v-if="successMsg" class="form-success">
        <i class="fas fa-check-circle"></i>
        {{ successMsg }}
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label class="form-label" for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="form-input vilinko-input"
            placeholder="请输入用户名"
            required
            :disabled="loading"
            minlength="3"
            maxlength="50"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="email">邮箱</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input vilinko-input"
            placeholder="请输入邮箱地址"
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
              minlength="6"
            />
            <i
              :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye', 'password-toggle-icon']"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="confirmPassword">确认密码</label>
          <div class="password-toggle">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-input vilinko-input"
              placeholder="请再次输入密码"
              required
              :disabled="loading"
            />
            <i
              :class="['fas', showConfirmPassword ? 'fa-eye-slash' : 'fa-eye', 'password-toggle-icon']"
              @click="showConfirmPassword = !showConfirmPassword"
            ></i>
          </div>
        </div>

        <button
          type="submit"
          class="form-button vilinko-button vilinko-button-primary"
          :disabled="loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>

      <div class="form-footer">
        已有账号?
        <router-link to="/login" class="form-link">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '@/services/auth.js'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleRegister = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!form.username || form.username.length < 3) {
    errorMsg.value = '用户名至少需要3个字符'
    return
  }

  if (!validateEmail(form.email)) {
    errorMsg.value = '请输入有效的邮箱地址'
    return
  }

  if (!form.password || form.password.length < 6) {
    errorMsg.value = '密码至少需要6个字符'
    return
  }

  if (form.password !== form.confirmPassword) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }

  loading.value = true

  try {
    await signup({
      username: form.username,
      email: form.email,
      password: form.password
    })

    successMsg.value = '注册成功！正在跳转到登录页...'
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    errorMsg.value = error.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
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
