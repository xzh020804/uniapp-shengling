<script setup>
	import { ref, onMounted } from 'vue'
	import { getTask } from '../../../apis/task'

	//任务列表
	const pickUpList = ref([])

	//参数
	const query = ref({
		page: 1,
		pageSize: 5,
		status: 1,
	})

	// 判断任务是否为空
	const isEmpty = ref(false)

	//获取代提货列表
	const getTaskList = async () => {
		const res = await getTask(query.value)
		pickUpList.value.push(...res.data.items)
		totalPage.value = res.data.pages
		if (!pickUpList.value) isEmpty.value = true
	}
	onMounted(() => {
		getTaskList()
	})

	//上拉获取
	const totalPage = ref()
	const onScrollToLower = () => {
		query.value.page++
		if (query.value.page <= totalPage.value) getTaskList()
	}

	//下拉刷新
	const isTriggered = ref(false)
	const onScrollViewRefresh = async () => {
		//清空信息重置数据
		isTriggered.value = true
		pickUpList.value = []
		query.value.page = 1
		await getTaskList()
		isTriggered.value = false
	}
</script>

<template>
	<scroll-view
		scroll-y
		refresher-enabled
		class="scroll-view"
		@scrolltolower="onScrollToLower"
		@refresherrefresh="onScrollViewRefresh"
		:refresher-triggered="isTriggered"
	>
		<view class="scroll-view-wrapper">
			<view v-for="pickup in pickUpList" :key="pickup.id" class="task-card">
				<navigator
					hover-class="none"
					:url="`/subpkg_task/detail/index?id=${pickup.id}`"
				>
					<view class="header">
						<text class="no">任务编号: {{ pickup.transportTaskId }}</text>
						<!-- <text class="status">已延迟</text> -->
					</view>
					<view class="body">
						<view class="timeline">
							<view class="line">{{ pickup.startAddress }}</view>
							<view class="line">{{ pickup.endAddress }}</view>
						</view>
					</view>
				</navigator>
				<view class="footer">
					<view class="label">提货时间</view>
					<view class="time">{{ pickup.planDepartureTime }}</view>
					<navigator
						v-if="pickup.enablePickUp"
						hover-class="none"
						:url="`/subpkg_task/pickup/index?id=${pickup.id}`"
						class="action"
					>
						提货
					</navigator>
					<navigator
						v-else
						disabled
						hover-class="none"
						url=" "
						class="action disabled"
					>
						提货
					</navigator>
				</view>
			</view>
			<view v-if="isEmpty" class="task-blank">无待提货物</view>
		</view>
	</scroll-view>
</template>

<style lang="scss" scoped>
	@import './styles.scss';
</style>
