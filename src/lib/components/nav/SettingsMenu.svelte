<script lang="ts">
	import { goto } from "$app/navigation";
	import { COLORS } from "$lib/styles/colors";
	import type { UserType } from "$lib/types/user";
	import Icon from "../icons/Icon.svelte";
	
	export let user:UserType|undefined;

	let signInDisplay = false;

</script>

<div class="container">
	<div class="settingsButton" on:click={user?()=>{goto('/settings')}:()=>{console.log("hi"); signInDisplay = !signInDisplay}} >
		<Icon icon="settings" color={COLORS.swr_font}/>
	</div>
	<button 
		class="signInButton" 
		style={`display: ${signInDisplay?'flex':'none'}`}
		on:click={()=>{goto('/login')}}
	>
		<Icon icon="logout" height={'1.5rem'} width={'1.5rem'} color={COLORS.swr_dark_grey}/>
		<p>Sign in</p>
	</button>
</div>

<style lang="scss">
	.container {
		// position: relative
		margin-right: 1rem;
	}
	.settingsButton {
		height: 2.5rem;
		width: 2.5rem;
		cursor: pointer;
	}
	.signInButton {
		position: absolute;
		cursor: pointer;
		right: 0;
		max-height: 2rem;
		width: 7rem;
		background-color: white;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		padding: 0.3rem;
		p {
			font-size: 1rem;
			text-align: center;
			color: color('swr_dark_grey');
			margin: 0 0.5rem;
		}
	}
</style>