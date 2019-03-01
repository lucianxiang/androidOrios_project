/**
 * Created by leibo on 2018/12/14.
 */
export default {
	mounted() {
		mui.plusReady(() => {
			//返回按钮
			plus.key.addEventListener('backbutton', () => {
				// console.log(1)
				this.$router.go(-1)
			}, false);
		})
	}
}