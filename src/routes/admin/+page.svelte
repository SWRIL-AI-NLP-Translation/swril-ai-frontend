<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<article>
	<header>
		<h1>Login to Admin</h1>
	</header>
</article>

<style lang="scss">
	button {
		@include button;
	}
	article {
		img {
			margin-top: 4rem;
		}
		header {
			@include header;
			margin-top: 2rem;
			margin-bottom: 5rem;
			h1 {
				font-size: 2rem;
				text-align: center;
			}
		}
		@include article;
	}
</style>
