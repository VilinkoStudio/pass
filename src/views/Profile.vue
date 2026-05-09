<template>
  <div class="page-container">
    <div class="profile-container vilinko-card">
      <div v-if="loading" style="text-align: center; padding: 40px;">
        <span class="loading-spinner" style="border-top-color: var(--vilinko-primary-color);"></span>
        <p style="margin-top: 16px; color: #6b7280;">加载中...</p>
      </div>

      <template v-else>
        <div class="profile-header">
          <div class="profile-avatar">
            <i class="fas fa-user"></i>
          </div>
          <h2 class="profile-name">{{ user.name || '未设置' }}</h2>
          <span class="profile-role">{{ user.role || '普通用户' }}</span>
        </div>

        <div v-if="errorMsg" class="form-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMsg }}
        </div>

        <div v-if="successMsg" class="form-success">
          <i class="fas fa-check-circle"></i>
          {{ successMsg }}
        </div>

        <div class="profile-section">
          <h3 class="profile-section-title">基本信息</h3>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span class="profile-info-label">用户名</span>
              <span class="profile-info-value">{{ user.name || '未设置' }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">邮箱</span>
              <span class="profile-info-value">{{ user.email || '未设置' }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">组织</span>
              <span class="profile-info-value">{{ user.owner || '未设置' }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h3 class="profile-section-title">修改密码</h3>
          <form @submit.prevent="handleChangePassword">
            <div class="form-group">
              <label class="form-label" for="oldPassword">当前密码</label>
              <div class="password-toggle">
                <input
                  id="oldPassword"
                  v-model="passwordForm.oldPassword"
                  :type="showOldPassword ? 'text' : 'password'"
                  class="form-input vilinko-input"
                  placeholder="请输入当前密码"
                  required
                  :disabled="passwordLoading"
                />
                <i
                  :class="['fas', showOldPassword ? 'fa-eye-slash' : 'fa-eye', 'password-toggle-icon']"
                  @click="showOldPassword = !showOldPassword"
                ></i>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="newPassword">新密码</label>
              <div class="password-toggle">
                <input
                  id="newPassword"
                  v-model="passwordForm.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  class="form-input vilinko-input"
                  placeholder="请输入新密码"
                  required
                  minlength="6"
                  :disabled="passwordLoading"
                />
                <i
                  :class="['fas', showNewPassword ? 'fa-eye-slash' : 'fa-eye', 'password-toggle-icon']"
                  @click="showNewPassword = !showNewPassword"
                ></i>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="confirmPassword">确认新密码</label>
              <div class="password-toggle">
                <input
                  id="confirmPassword"
                  v-model="passwordForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-input vilinko-input"
                  placeholder="请再次输入新密码"
                  required
                  :disabled="passwordLoading"
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
              :disabled="passwordLoading"
            >
              <span v-if="passwordLoading" class="loading-spinner"></span>
              {{ passwordLoading ? '修改中...' : '修改密码' }}
            </button>
          </form>
        </div>

        <div class="profile-actions">
          <button
            type="button"
            class="form-button btn-secondary"
            @click="handleLogout"
          >
            <i class="fas fa-sign-out-alt"></i>
            退出登录
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAccount, changePassword, logout } from '@/services/auth.js'

const router = useRouter()

const user = ref({})
const loading = ref(true)
const errorMsg = ref('')
const successMsg = ref('')
const passwordLoading = ref(false)

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const fetchUserInfo = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const userData = await getAccount()
    user.value = userData || {}
  } catch (error) {
    errorMsg.value = error.message || '获取用户信息失败'
    if (error.message === '未登录') {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

const handleChangePassword = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (passwordForm.newPassword.length < 6) {
    errorMsg.value = '新密码至少需要6个字符'
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errorMsg.value = '两次输入的新密码不一致'
    return
  }

  passwordLoading.value = true

  try {
    await changePassword(passwordForm.oldPassword, passwordForm.newPassword)
    successMsg.value = '密码修改成功！'
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error) {
    errorMsg.value = error.message || '密码修改失败'
  } finally {
    passwordLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('退出登录失败:', error)
  } finally {
    router.push('/login')
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.profile-container {
  width: 100%;
  max-width: 600px;
  padding: 40px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--vilinko-border-color);
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #fff;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--vilinko-text-main);
  margin-bottom: 4px;
}

.profile-role {
  font-size: 14px;
  color: #6b7280;
  background: var(--vilinko-bg-gray);
  padding: 4px 12px;
  border-radius: 12px;
}

.profile-section {
  margin-bottom: 32px;
}

.profile-section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vilinko-text-main);
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid var(--vilinko-primary-color);
}

.profile-info-grid {
  display: grid;
  gap: 16px;
}

.profile-info-item {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: var(--vilinko-bg-gray);
  border-radius: var(--vilinko-btn-radius);
}

.profile-info-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-info-value {
  font-size: 15px;
  font-weight: 500;
  color: var(--vilinko-text-main);
}

.profile-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--vilinko-border-color);
}

.btn-secondary {
  background-color: #6b7280;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

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

@media (max-width: 640px) {
  .profile-container {
    padding: 24px 20px;
  }

  .profile-actions {
    flex-direction: column;
  }
}
</style>
