<script setup>
	import { ref } from 'vue'
	import { loginByPassword } from '../../../apis/user'
	import { useUserStore } from '@/stores/users'
	import { onLoad } from '@dcloudio/uni-app'
	//表单对象
	const form = ref()

	//定义表单数据
	const formData = ref({
		account: '',
		password: '',
	})

	//定义表单规则
	const accountRules = ref({
		account: {
			rules: [
				{ required: true, errorMessage: '请输入登录账号' },
				{ pattern: '^[a-zA-Z0-9]{6,8}$', errorMessage: '登录账号格式不正确' },
			],
		},
		password: {
			rules: [
				{ required: true, errorMessage: '请输入登录密码' },
				{ pattern: '^\\d{6}$', errorMessage: '登录密码格式不正确' },
			],
		},
	})

	const userStore = useUserStore()

	//登录
	const redirectURL = ref('')
	const routeType = ref('')
	onLoad((query) => {
		redirectURL.value = query.redirectURL
		routeType.value = query.routeType
	})
	const onSubmit = async () => {
		try {
			//表单验证通过
			const formData = await form.value.validate()
			const { data } = await loginByPassword(formData)
			userStore.token = data
			//判断是否有回跳地址
			if (redirectURL.value) {
				uni[routeType.value]({ url: redirectURL.value })
			} else {
				uni.switchTab({
					url: '/pages/my/index',
				})
			}
		} catch (e) {
			console.log(e)
		}
	}
</script>

<template>
	<uni-forms
		class="login-form"
		ref="form"
		:model="formData"
		:rules="accountRules"
	>
		<uni-forms-item name="account">
			<input
				v-model="formData.account"
				type="text"
				placeholder="请输入账号"
				class="uni-input-input"
				placeholder-style="color: #818181"
			/>
		</uni-forms-item>
		<uni-forms-item name="password">
			<input
				v-model="formData.password"
				type="text"
				placeholder="请输入密码"
				class="uni-input-input"
				placeholder-style="color: #818181"
			/>
		</uni-forms-item>
		<button class="submit-button" @click="onSubmit">登录</button>
	</uni-forms>
</template>

<style lang="scss" scoped>
	@import './styles.scss';
</style>
