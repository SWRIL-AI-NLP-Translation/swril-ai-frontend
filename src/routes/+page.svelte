<script lang="ts">
	import compassLogo from '$lib/images/compassLogo.png';
	import { goto } from '$app/navigation';
</script>

<article>
	<header>
		<h1>Smart Waterloo Region AI and NLP Prototypes</h1>
	</header>
	<button on:click={() => goto("/translate")}>
		<!-- TODO: Fix this formatting + use icon -->
		<p></p> 
		<p>Translation</p>
		<p>{">"}</p>
	</button>
	<button on:click={() => goto("/chatbot")}>
		<!-- TODO: Fix this formatting + use icon -->
		<p></p> 
		<p>Chatbot</p>
		<p>{">"}</p>
	</button>
	<button on:click={() => goto("/admin")}>
		<!-- TODO: Fix this formatting + use icon -->
		<p></p> 
		<p>Admin</p>
		<p>{">"}</p>
	</button>
	
</article>

<style lang="scss">
	button {
		@include button;
		width: 60%;
    	padding: 0.3rem 1rem;
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
