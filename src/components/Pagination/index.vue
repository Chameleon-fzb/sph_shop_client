<template>
	<div>
		<div class="pagination">
			<!-- 上一页 -->
			<button
				:class="{ disabled: myCurrentPage === 1 || totalPages <= 0 }"
				@click="changeCurrentPage(myCurrentPage - 1)"
			>
				上一页
			</button>
			<!-- 第一页 -->
			<button
				v-if="total > 0 && startEnd.start != 1"
				@click="changeCurrentPage(1)"
			>
				1
			</button>
			<button v-if="myCurrentPage > 3 && startEnd.start != 1" disabled>
				···
			</button>
			<!-- 遍历连续页码数 -->
			<button
				v-for="item in startEndArr"
				:key="item"
				:class="{ active: myCurrentPage === item }"
				@click="changeCurrentPage(item)"
			>
				{{ item }}
			</button>
			<button v-if="startEnd.end < totalPages - 1" disabled>···</button>
			<!-- 最后一页 -->
			<button
				v-if="startEnd.end != totalPages"
				@click="changeCurrentPage(totalPages)"
			>
				{{ totalPages }}
			</button>
			<button
				:class="{ disabled: myCurrentPage === totalPages || totalPages <= 0 }"
				@click="changeCurrentPage(myCurrentPage + 1)"
			>
				下一页
			</button>
			<button class="disabled">共{{ total }}条</button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Pagination',
	props: {
		// 当前页
		currentPage: {
			type: Number,
			default: 1
		},
		// 商品总数量
		total: {
			type: Number,
			default: 0
		},
		// 每页显示的商品最大数量
		pageSize: {
			type: Number,
			default: 10
		},
		// 最大连续页码数
		showPageNo: {
			type: Number,
			default: 3,
			// 传入的值为奇数
			validator: function(value) {
				return value % 2 === 1
			}
		}
	},
	data() {
		return { myCurrentPage: this.currentPage }
	},
	computed: {
		// 页码数
		totalPages() {
			const { total, pageSize } = this
			return Math.ceil(total / pageSize)
		},
		startEnd() {
			let start, end
			const { myCurrentPage, showPageNo, totalPages } = this
			/* 计算start */
			/*
			myCurrentPage ,showPageNo, totalPages
			 4                3            12      123[4]56789
			 5                3            12      1234[5]6789
			 4                5            12
			 5                5            12
			 start = 3 = 4-1 = myCurrentPage - (showPageNo-1)/2
			 start = 4 = 5-1 = myCurrentPage -  (showPageNo-1)/2
				 end = 5 = 4+1 = myCurrentPage + (showPageNo-1)/2
				 end = 6 = 5+1 = myCurrentPage + (showPageNo-1)/2

 			 */
			start = myCurrentPage - (showPageNo - 1) / 2
			// 最小值不小于1
			start = start < 1 ? 1 : start
			// end = myCurrentPage + (showPageNo - 1) / 2
			end = start + showPageNo - 1
			// 最大值不超过 totalPages
			if (end > totalPages) {
				end = totalPages
				// 修正 start
				start = end - showPageNo + 1
				// 最小值小于1时
				start = start < 1 ? 1 : start
			}
			return { start, end }
		},
		startEndArr() {
			const { start, end } = this.startEnd
			let arr = []
			for (let i = start; i <= end; i++) {
				arr.push(i)
			}
			return arr
		}
	},
	methods: {
		/* 修改当前页码 */
		changeCurrentPage(page) {
			if (page <= 0 || page > this.totalPages || page === this.myCurrentPage)
				return
			// this.myCurrentPage = page
			/* 触发自定义事件 */
			this.$emit('currentChange', page)
			scrollTo(0, 0)
		}
	},
	watch: {
		/* 子组件监视父组件传入数据的变化 */
		currentPage: {
			handler(newPage) {
				this.myCurrentPage = newPage
			}
		}
	}
}
</script>
<style lang="less" scoped>
* {
	text-align: center;
	& > .pagination {
		display: inline-block;
		button {
			margin: 0 5px;
			background-color: #f4f4f5;
			color: #606266;
			outline: none;
			border-radius: 2px;
			padding: 0 4px;
			vertical-align: top;
			display: inline-block;
			font-size: 13px;
			min-width: 35.5px;
			height: 28px;
			line-height: 28px;
			cursor: pointer;
			box-sizing: border-box;
			text-align: center;
			border: 0;

			&.disabled {
				color: #c0c4cc;
				cursor: not-allowed;
			}

			&.active {
				cursor: not-allowed;
				background-color: #e1251b;
				color: #fff;
			}
		}
	}
}
</style>
