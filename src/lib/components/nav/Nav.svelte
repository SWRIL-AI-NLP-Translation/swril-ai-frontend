<script lang="ts">
	import SettingsMenu from './SettingsMenu.svelte';
	import NavItem from "./NavItem.svelte"

	import { goto } from "$app/navigation";
	import { COLORS } from "$lib/styles/colors";
	import type { UserType } from '$lib/types/user';

	export let user: UserType | undefined;
	
</script>

<header>
	<nav>
		<NavItem onClick={() => goto('/')} color={COLORS.swr_green}>
			<h2>SWRIL-AI</h2>
		</NavItem>
		<NavItem onClick={() => goto('/translate')} color={COLORS.swr_blue}>
			<h3>Translate</h3>
		</NavItem>
		<NavItem onClick={() => goto('/chatbot')} >
			<h3>Chatbot</h3>
		</NavItem>
	</nav>
	
	<SettingsMenu user={user}/>
</header>

<style lang="scss">
	header {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 4rem;
		background-color: color('swr_primary');
	}
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: 4rem;
		padding-right: 1rem;
	}
</style>
