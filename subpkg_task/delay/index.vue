<script setup>
	import { computed, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { delayTask } from '@/apis/task'

	// 原计划提货时间
	const planDepartureTime = ref('')
	// 延迟提货任务的ID
	const id = ref('')

	//获取时间和id
	onLoad((query) => {
		planDepartureTime.value = query.planDepartureTime
		id.value = query.id
	})

	// 延迟时间
	const delayTime = ref('')
	const onChange = (e) => {
		//拼接日期
		const [date] = planDepartureTime.value.split(' ')
		delayTime.value = `${date} ${e.detail.value}`
	}
	//延迟时间验证
	const delayTimeValid = computed(() => {
		const star = new Date(planDepartureTime.value)
		const end = new Date(delayTime.value)
		return end - star > 0 && end - star < 7200 * 1000
	})

	//延迟内容
	const delayReason = ref('')
	//延迟内容字数
	const wordsCount = computed(() => delayReason.value.length)
	//延迟内容字数验证
	const delayReasonValid = computed(
		() => wordsCount.value <= 50 && wordsCount.value > 0
	)

	const isDisabled = computed(
		() => !delayReasonValid.value || !delayTimeValid.value
	)

	//提交延迟提货
	const onSubmit = async () => {
		const formData = {
			id: id.value,
			delayTime: delayTime.value,
			delayReason: delayReason.value,
		}
		await delayTask(formData)
		// 跳转到任务列表
		uni.reLaunch({ url: '/pages/task/index' })
	}
</script>

<template>
	<view class="page-container">
		<uni-list :border="false">
			<uni-list-item
				title="原定时间 "
				showArrow
				:rightText="planDepartureTime"
			/>
			<uni-list-item title="延迟时间" showArrow>
				<template v-slot:footer>
					<picker class="time-picker" mode="time" @change="onChange">
						<text v-if="!delayTime">不可超过2个小时</text>
						<text v-else :class="{ error: !delayTimeValid }">
							{{ delayTime + ':00' }}
						</text>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item direction="column">
				<template v-slot:body>
					<view class="textarea-wrapper">
						<textarea
							class="textarea"
							placeholder-style="color: #818181"
							placeholder="请输入延迟提货原因"
							v-model="delayReason"
						></textarea>
						<text class="words-count" :class="{ error: !delayReasonValid }"
							>{{ wordsCount }}/50</text
						>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :border="false">
				<template v-slot:body>
					<button :disabled="isDisabled" class="button" @click="onSubmit">
						提交
					</button>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
