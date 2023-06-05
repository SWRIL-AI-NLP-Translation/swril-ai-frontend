<script lang="ts">
	import Nav from '$lib/components/nav/Nav.svelte';
</script>

<section id="pageContainer">
	<main>
		<Nav/>
		<slot />
	</main>
</section>

<style global lang="scss">
	body,
	html {
		min-height: 100vh;
		background-color: color('swr_background');
	}
	main {
		min-height: 95%;
		width: 100%;
	}
</style>
