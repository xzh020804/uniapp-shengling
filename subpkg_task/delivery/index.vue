<script setup>
	import { computed, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { postTask } from '../../apis/task'
	// 提货凭证照片
	const receiptPictrues = ref([])
	const certificatePictureList = computed(() => {
		return receiptPictrues.value.map(({ url }) => {
			return { url }
		})
	})
	// 提货商品照片
	const goodsPictrues = ref([])
	const deliverPictureList = computed(() => {
		return goodsPictrues.value.map(({ url }) => {
			return { url }
		})
	})
	// 任务ID
	const id = ref('')
	onLoad((query) => {
		id.value = query.id
	})

	//判断是否可以提交
	const enableSubmit = computed(
		() => goodsPictrues.value.length > 0 && receiptPictrues.value.length > 0
	)
	//提交操作
	const onSubmit = async () => {
		const formData = {
			id: id.value,
			deliverPictureList: deliverPictureList.value,
			certificatePictureList: certificatePictureList.value,
		}
		await postTask(formData)
		uni.reLaunch({
			url: '/pages/task/index',
		})
	}
</script>

<template>
	<view class="page-container">
		<view class="receipt-info">
			<uni-file-picker
				limit="3"
				file-extname="jpg,webp,gif,png"
				title="请拍照上传回单凭证"
				v-model="receiptPictrues"
			></uni-file-picker>
			<uni-file-picker
				limit="3"
				file-extname="jpg,webp,gif,png"
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

		&[disabled] {
			color: #fff;
			background-color: #fadcd9;
		}
	}
</style>
