<script lang="ts">
	import { goto } from '$app/navigation';
	import { COLORS } from '$lib/styles/colors';
	import type { AccountData } from '$lib/types/account';
	import Icon from '$lib/components/icons/icon.svelte';
	import { Cookies } from '$lib/utils/cookies';
	export let data: AccountData;
	if (!data?.user) {
		goto("login")
	}

	const logout = () => {
		Cookies.delete('token')
		goto("login")
	}

	const links = [{
		icon: 'edit',
		name: 'Edit Account',
		link: '/translate/edit'
	},
	{
		icon: 'star',
		name: 'Saved translations',
		link: '/translate/saved'
	},
		{
		icon: 'star',
		name: 'Saved Documents',
		link: '/translate/documents'
	},
	{
		icon: 'help',
		name: 'About Translate',
		link: '/translate/about'
	}
]
	
</script>

<article>
	<header>
		<button on:click={() => {goto('/')}}>
			<Icon icon={'leftArrow'} color={COLORS.swr_dark_grey} height='1.5rem' width='1.5rem'/>
		</button>
		<h1>Settings</h1>
	</header>
	<section class='info'>
		<div>
			<h3>{data?.user?.first_name} {data?.user?.last_name}</h3>
			<button on:click={logout}>
				<Icon icon="logout" color={COLORS.swr_light_grey} height='1.8rem' width='1.8rem'/>
			</button>
		</div>
		<p>Your account</p>
	</section>
	<section class="links">
		{#each links as link}
			<a href={link.link}>
				<Icon icon={link.icon} color={COLORS.swr_light_grey} height='1.8rem' width='1.8rem'/>
				<h3>{link.name}</h3>
			</a>
		{/each}
	</section>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 25rem;
		box-sizing: border-box;
		width: 100%;
		header {
			display:flex;
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
		.info {
			width: calc(100% - 3rem);
			margin: 1rem;
			div {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				h3 {
					font-size: 1.5rem;
					font-weight: 600;
				}
			}
			p {
				width: 100%;
				color: color('swr_dark_grey');
			}
		}
		.links {
			width: 100%;
			a {
				display: flex;
				background-color: white;
				flex-direction: row;
				margin: 1rem;
				width: 100%;
				padding: 0.5rem;
				border-radius: 1rem;
				h3 {
					margin-left: 1rem;
				}
			}
		}
	}
</style>
