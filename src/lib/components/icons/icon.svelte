<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import Logout from './logout.svelte';
	import Settings from './settings.svelte';
    import Globe from './globe.svelte';
    import Translate from './translate.svelte';
	import Mail from './mail.svelte';
	import Stamp from './stamp.svelte';
	import Like from './like.svelte';
	import Dislike from './dislike.svelte';
	import Account from './account.svelte';
	import Edit from './edit.svelte';
	import Help from './help.svelte';
	import LeftArrow from './leftArrow.svelte';
	import Star from './star.svelte';
	import Swap from './swap.svelte';
	import Mic from './mic.svelte';
	const icons = [
		"logout",
		"settings",
        "globe",
        "translate",
		"mail",
		"stamp",
		"like",
		"dislike",
		"star",
		"swap",
		"account",
		"leftArrow",
		"edit",
		"help",
		"mic"
	]
	export let color = COLORS.swr_font;
	export let height: string|undefined = undefined
	export let width: string|undefined = undefined
	export let icon: typeof icons[number] 
</script>

<div style={`height: ${height}; width: ${width}`}>
	{#if icon == "logout"}
		<Logout color={color}/>
	{:else if icon == "settings"}
		<Settings color={color}/>
    {:else if icon == "globe"}
		<Globe color={color}/>
    {:else if icon == "translate"}
		<Translate color={color}/>
	{:else if icon == "mail"}
		<Mail color={color}/>
	{:else if icon == "stamp"}
		<Stamp color={color}/>
	{:else if icon == "like"}
		<Like color={color}/>
	{:else if icon == "dislike"}
		<Dislike color={color}/>
	{:else if icon == "star"}
		<Star color={color}/>
	{:else if icon == "swap"}
		<Swap color={color}/>
	{:else if icon == "account"}
		<Account color={color}/>
	{:else if icon == "leftArrow"}
		<LeftArrow color={color}/>
	{:else if icon == "edit"}
		<Edit color={color}/>
	{:else if icon == "help"}
		<Help color={color}/>
	{:else if icon == "mic"}
		<Mic color={color}/>
	{/if}
</div>
