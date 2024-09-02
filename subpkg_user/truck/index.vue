<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getTruckInfo } from '../../apis/user'
	// 车辆信息
	const truchInfo = ref({})
	//获取车辆信息
	onLoad(async () => {
		const res = await getTruckInfo()
		truchInfo.value = res.data
	})
</script>

<template>
	<view class="page-container">
		<swiper
			class="truck-pictures"
			indicator-active-color="#fff"
			circular
			indicator-dots
		>
			<swiper-item v-for="picture in truchInfo.pictureList" :key="picture.url">
				<image class="picture" mode="aspectFill" :src="picture.url"></image>
			</swiper-item>
		</swiper>
		<view class="truck-meta">
			<uni-list :border="false">
				<uni-list-item
					:border="false"
					title="车辆编号"
					:right-text="truchInfo.id"
				/>
				<uni-list-item
					:border="false"
					title="车辆号牌"
					:right-text="truchInfo.licensePlate"
				/>
				<uni-list-item
					:border="false"
					title="车型"
					:right-text="truchInfo.truckType"
				/>
				<uni-list-item
					:border="false"
					title="所属机构"
					:right-text="truchInfo.currentOrganName"
				/>
				<uni-list-item
					:border="false"
					title="载重"
					:right-text="truchInfo.allowableLoad"
				/>
			</uni-list>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
