<script lang="ts">
	import type { SavedTranslationType } from "$lib/types/translation";
	
	export let translation:SavedTranslationType;

</script>

<div class="container">
	<p>{translation.from_text}</p>
	<h6>{translation.to_text}</h6>
</div>

<style lang="scss">
	.container {
		background-color: white;
		border-radius: 1rem;
		max-width: 15rem;
		margin: 0.5rem;
		padding: 0.5rem;
		p {
			font-size: 0.8rem;
		} 
		h6 {
			font-size: 1.1rem
		}
	}
</style>