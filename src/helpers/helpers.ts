export const truncateString = (str: string, len: number) => {
	if (str) {
		if (str.length <= len) {
			return str
		}
		return str.slice(0, len).replaceAll('<br>', ' ') + '...'
	} else return ''
}
