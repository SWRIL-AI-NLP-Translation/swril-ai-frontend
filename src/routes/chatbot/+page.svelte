<script lang="ts">
	import { beforeUpdate } from 'svelte';

	function reloadChatbot() {
		const scriptElement = document.createElement('script');
		scriptElement.src = 'https://d13mwskebrl0j4.cloudfront.net/chatbot/dist/bundle.js';
		scriptElement.id = 'swril-chatbot-script';

		const existingScript = document.querySelector('#swril-chatbot-script');
		if (existingScript) existingScript.remove();

		document.body.appendChild(scriptElement);
	}

	beforeUpdate(reloadChatbot);

</script>

<article>
	<header>
		<h1>Chatbot</h1>
	</header>
	<div id="swril-chatbot-div"></div>
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
