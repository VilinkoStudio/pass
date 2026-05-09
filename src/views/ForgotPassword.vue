<template>
  <div class="page-container">
    <div class="form-card vilinko-card">
      <h1 class="form-title">重置密码</h1>
      <p style="text-align: center; color: #6b7280; margin-bottom: 24px;">
        输入您的注册邮箱，我们将发送密码重置链接
      </p>

      <div v-if="errorMsg" class="form-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMsg }}
      </div>

      <div v-if="successMsg" class="form-success">
        <i class="fas fa-check-circle"></i>
        {{ successMsg }}
      </div>

      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label class="form-label" for="email">邮箱地址</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input vilinko-input"
            placeholder="请输入注册邮箱"
            required
            :disabled="loading || successMsg"
          />
        </div>

        <button
          type="submit"
          class="form-button vilinko-button vilinko-button-primary"
          :disabled="loading || successMsg"
        >
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? '发送中...' : '发送重置链接' }}
        </button>
      </form>

      <div class="form-footer">
        想起密码了?
        <router-link to="/login" class="form-link">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { forgotPassword } from '@/services/auth.js'

const form = reactive({
  email: ''
})

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleForgotPassword = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!validateEmail(form.email)) {
    errorMsg.value = '请输入有效的邮箱地址'
    return
  }

  loading.value = true

  try {
    await forgotPassword(form.email)
    successMsg.value = '密码重置链接已发送到您的邮箱，请查收'
    form.email = ''
  } catch (error) {
    errorMsg.value = error.message || '发送失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
