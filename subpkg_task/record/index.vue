<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import slVehicleViolation from './components/vehicle-violation'
	import slVehicleBreakdown from './components/vehicle-breakdown'
	import slVehicleAccident from './components/vehicle-accident'
	import { storeToRefs } from 'pinia'
	import { useTaskStore } from '../../stores/task'
	import { taskRecord } from '../../apis/task'

	//回车记录数据
	const { recordData } = storeToRefs(useTaskStore())
	//出车时间 id
	onLoad((query) => {
		recordData.value.startTime = query.actualDepartureTime
		recordData.value.id = query.transportTaskId
	})
	//提交登记
	const onSubmit = async () => {
		// 过滤掉图片多余的数据，只保留 url
		const { accidentImagesList, faultImagesList } = recordData.value
		// 事故照片
		recordData.value.accidentImagesList = accidentImagesList.map(({ url }) => {
			return { url }
		})
		// 故障照片
		recordData.value.faultImagesList = faultImagesList.map(({ url }) => {
			return { url }
		})
		await taskRecord(recordData.value)
		uni.reLaunch({
			url: '/pages/task/index',
		})
	}
</script>
<template>
	<view class="page-container">
		<scroll-view class="scroll-view" scroll-y>
			<view class="scroll-view-wrapper">
				<uni-list class="base-info">
					<uni-list-item
						title="出车时间"
						show-arrow
						:right-text="recordData.startTime"
					/>
					<uni-list-item show-arrow title="回车时间">
						<template v-slot:footer>
							<uni-datetime-picker v-model="recordData.endTime">
								<view class="picker-value">{{
									recordData.endTime || '请选择'
								}}</view>
							</uni-datetime-picker>
						</template>
					</uni-list-item>
				</uni-list>
				<sl-vehicle-violation></sl-vehicle-violation>
				<sl-vehicle-breakdown></sl-vehicle-breakdown>
				<sl-vehicle-accident></sl-vehicle-accident>
			</view>
		</scroll-view>
		<view class="toolbar">
			<button class="button" @click="onSubmit">提交登记</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
