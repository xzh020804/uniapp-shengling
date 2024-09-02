<script setup>
	import { onMounted, ref } from 'vue'
	import { getMessage } from '@/apis/message.js'

	//当前页面，每页获取信息数量,获取页面信息类型
	const query = ref({
		contentType: 201,
		page: 1,
		pageSize: 5,
	})

	//判断是否有通知
	const isEmpty = ref(true)
	//消息列表
	const notifyList = ref([])

	//获取消息
	const getMessageList = async () => {
		const res = await getMessage(query.value)
		totalPage.value = +res.data.pages
		notifyList.value.push(...res.data.items)
		//判断是否有数据
		if (notifyList.value) isEmpty.value = false
	}
	onMounted(() => {
		getMessageList()
	})

	//上拉获取消息
	//记录总页数
	const totalPage = ref()
	const onScrollToLower = () => {
		query.value.page++
		if (query.value.page <= totalPage.value) {
			getMessageList()
		}
	}

	// 下拉刷新
	const isTriggered = ref(false)
	const onScrollViewRefresh = async () => {
		isTriggered.value = true
		query.value.page = 1
		notifyList.value = []
		await getMessageList()
		isTriggered.value = false
	}
</script>
<template>
	<scroll-view
		class="scroll-view"
		refresher-enabled
		scroll-y
		@scrolltolower="onScrollToLower"
		@refresherrefresh="onScrollViewRefresh"
		:refresher-triggered="isTriggered"
	>
		<view class="scroll-view-wrapper">
			<view class="message-action">
				<text class="iconfont icon-clear"></text>
				全部已读
			</view>
			<uni-card
				v-for="notify in notifyList"
				:key="notify.id"
				:border="false"
				:is-shadow="false"
			>
				<view class="brief">{{ notify.content }}</view>
				<view class="extra">
					<text class="time">{{ notify.created }}</text>
					<navigator
						hover-class="none"
						class="link"
						:url="`/subpkg_task/detail/index?id=${notify.id}`"
						>查看详情</navigator
					>
				</view>
				<template v-slot:title>
					<view :class="{ unread: !notify.isRead }" class="title unread"
						>您有新的运输任务</view
					>
				</template>
			</uni-card>

			<view v-if="isEmpty" class="message-blank">暂无消息</view>
		</view>
	</scroll-view>
</template>

<style lang="scss" scoped>
	@import './styles.scss';
</style>
