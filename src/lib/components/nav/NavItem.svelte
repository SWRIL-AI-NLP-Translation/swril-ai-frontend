<script lang="ts">
	import { COLORS } from "$lib/styles/colors";
	export let color: string = COLORS.swr_secondary
	export let onClick: () => void
</script>

<div style={`background-color: ${color}`} on:click={onClick}>
	<slot/>
</div>

<style lang="scss" scoped>
	div {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		box-sizing: border-box;
		cursor: pointer;
		&:hover {
			opacity: 0.7;
		}
	}
</style>