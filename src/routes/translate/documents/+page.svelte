<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import Icon from '$lib/components/icons/icon.svelte';
	import { goto } from '$app/navigation';
	import type { AccountData } from '$lib/types/account';
	import SavedDocumentsGrid from '$lib/components/SavedDocumentsGrid.svelte';

	export let data: AccountData;
	if (!data?.user) {
		goto('login');
	}
</script>

<article>
	<header>
		<button
			on:click={() => {
				goto('/settings');
			}}
		>
			<Icon icon={'leftArrow'} color={COLORS.swr_dark_grey} height="1.5rem" width="1.5rem" />
		</button>
		<h1>Saved Documents</h1>
	</header>
	<h3>All your saved documents</h3>
	{#if data.user}
		<SavedDocumentsGrid documents={data.user.files ?? []} />
	{/if}
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 25rem;
		width: 100%;
		header {
			display: flex;
			justify-content: flex-start;
			background-color: color('swr_secondary');
			align-items: center;
			width: calc(100% - 2rem);
			padding: 1rem 1rem 1rem;
			h1 {
				font-size: 1.5rem;
				text-align: left;
				font-weight: 500;
			}
		}
		h3 {
			text-align: center;
			font-size: 1.2rem;
			font-weight: 500;
			margin: 1rem 0;
		}
	}
</style>
