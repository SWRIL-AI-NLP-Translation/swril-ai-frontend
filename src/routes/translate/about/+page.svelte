<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import Icon from '$lib/components/icons/icon.svelte';
	import { goto } from '$app/navigation';
	
</script>

<article>
	<header>
		<button on:click={() => {goto('/settings')}}>
			<Icon icon={'leftArrow'} color={COLORS.swr_dark_grey} height='1.5rem' width='1.5rem'/>
		</button>
		<h1>About website</h1>
	</header>
	<h3>Translate</h3>
	<section class="info">
		<p>
			This translater is created by the Smart Waterloo Region Innovation Lab. 
		</p>
		<p>
			Our goal is to make Waterloo Region the best place for children and youth. This is one way that we are working towards that goal. 
		</p>
		<p>
			The goal of Translate is to...
		</p>
		<ol>
			<li>
				Make it easier for children and youth to communicate when english is not their first language
			</li>
			<li>
				Help children and youth by taking on some of burden that they have when translating things for their family
			</li>
			<li>
				Provide a free translation website without advertisement that will benefit the community
			</li>
		</ol>
	</section>

	<a href={'https://www.swril.ca'}>
		<Icon icon={'help'} color={COLORS.swr_light_grey} height='1.8rem' width='1.8rem'/>
		<h4>Contact us as www.swril.ca</h4>
	</a>
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
		h3 {
			color: color('swr_primary');
			font-size: 1.5rem;
		}
		.info {
			width: calc(100% - 3rem);
			background-color: white;
			padding: 2rem;
			border-radius: 1rem;
			margin: 1rem;
			p {
				font-size: 1rem;
				text-align: left;
				font-weight: 500;
				margin:0.5rem 0;
			}
			ol {
				width: 100%;
				margin: 0 0 0 1rem;
				font-size: 1rem;
				text-align: left;
				font-weight: 500;
			}
		}
		a {
				display: flex;
				background-color: white;
				flex-direction: row;
				margin: 1rem;
				width: 100%;
				padding: 0.5rem;
				border-radius: 1rem;
				h4 {
					margin-left: 1rem;
				}
			}
	}
</style>
