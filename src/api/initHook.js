/**
 * Created by fengchaoyi on 2017/4/27.
 */

// inject into Vue instance's init/beforecreate method
export default () => {
		const options = this.$options;

		// store injection
		if (options.store) {
				this.$store = options.store
		} else if (options.parent && options.parent.$store) {
				this.$store = options.parent.$store
		}
}