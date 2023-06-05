<script>

</script>

<section id="pageContainer">
	<main>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
