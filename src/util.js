export function assert (condition, msg) {
		if (!condition) throw new Error(`[vuez assert error] ${msg}`)
}
