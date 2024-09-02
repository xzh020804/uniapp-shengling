<script setup>
	import { computed, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { pickupTask } from '../../apis/task'

	//获取Id
	const id = ref('')
	onLoad((query) => {
		id.value = query.id
		console.log(id.value)
	})

	// 提货凭证图片
	const receiptPictrues = ref([])
	//处理数据保留url
	const cargoPickUpPictureList = computed(() => {
		return receiptPictrues.value.map(({ url }) => {
			return { url }
		})
	})

	// 货品图片
	const goodsPictrues = ref([])
	// 数据二次处理，只保留 url 属性
	const cargoPictureList = computed(() => {
		return goodsPictrues.value.map(({ url }) => {
			return { url }
		})
	})

	//提交按钮控制
	const enableSubmit = computed(
		() => receiptPictrues.value.length > 0 && goodsPictrues.value.length > 0
	)
	//提交

	const onSubmit = async () => {
		const formData = {
			id: id.value,
			cargoPickUpPictureList: cargoPickUpPictureList.value,
			cargoPictureList: cargoPictureList.value,
		}
		await pickupTask(formData)
		// 去到任务列表
		uni.reLaunch({ url: '/subpkg_task/detail/index?id=' + id.value })
	}
</script>
<template>
	<view class="page-container">
		<view class="receipt-info">
			<uni-file-picker
				limit="3"
				title="请拍照上传回单凭证"
				v-model="receiptPictrues"
			></uni-file-picker>
			<uni-file-picker
				limit="3"
				title="请拍照上传货品照片"
				v-model="goodsPictrues"
			></uni-file-picker>
		</view>
		<button :disabled="!enableSubmit" class="button" @click="onSubmit">
			提交
		</button>
	</view>
</template>

<style lang="scss" scoped>
	.page-container {
		padding: 30rpx;
	}

	.receipt-info {
		min-height: 600rpx;
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 16rpx;

		::v-deep .uni-file-picker {
			margin-bottom: 30rpx;
		}
	}

	.button {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		/* #ifdef APP */
		padding-top: 4rpx;
		/* #endif */
		border-radius: 100rpx;
		margin-top: 60rpx;
		color: #fff;
		font-size: $uni-font-size-big;
		background-color: $uni-primary;

		&[disabled],
		&.disabled {
			color: #fff;
			background-color: #fadcd9;
		}
	}
</style>
