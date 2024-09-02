<script setup>
	import { ref, onMounted } from 'vue'
	import { getTask } from '../../../apis/task'
	//定义对象
	const deliveryList = ref([])

	//判断列表是否为空
	const isEmpty = ref(true)
	//获取在途任务列表
	const query = {
		page: 1,
		pageSize: 5,
		status: 2,
	}
	const getTaskList = async () => {
		const res = await getTask(query)
		deliveryList.value = res.data.items
		if (deliveryList.value) isEmpty.value = false
	}
	onMounted(() => getTaskList())
</script>
<template>
	<scroll-view scroll-y class="scroll-view">
		<view class="scroll-view-wrapper">
			<view
				v-for="delivery in deliveryList"
				:key="delivery.id"
				class="task-card"
			>
				<navigator
					hover-class="none"
					:url="`/subpkg_task/detail/index?id=${delivery.id}`"
				>
					<view class="header">
						<text class="no">任务编号: {{ delivery.transportTaskId }}</text>
					</view>
					<view class="body">
						<view class="timeline">
							<view class="line">{{ delivery.startAddress }}</view>
							<view class="line">{{ delivery.endAddress }}</view>
						</view>
					</view>
				</navigator>
				<view class="footer">
					<view class="label">到货时间</view>
					<view class="time">{{ delivery.planArrivalTime }}</view>
					<!-- status = 2 交付 -->
					<navigator
						v-if="delivery.status === 2"
						hover-class="none"
						:url="`/subpkg_task/delivery/index?id=${delivery.id}`"
						class="action"
					>
						交付
					</navigator>
					<!-- status = 4 回车登记 -->
					<navigator
						v-if="delivery.status === 4"
						hover-class="none"
						:url="`/subpkg_task/record/index?transportTaskId=${delivery.transportTaskId}&actualDepartureTime=${delivery.actualDepartureTime}`"
						class="action"
					>
						回车登记
					</navigator>
				</view>
			</view>
			<view v-if="isEmpty" class="task-blank">无在途货物</view>
		</view>
	</scroll-view>
</template>

<style lang="scss" scoped>
	@import './styles.scss';
</style>
