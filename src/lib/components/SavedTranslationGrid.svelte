<script lang="ts">
	import type { SavedTranslationType } from "$lib/types/translation";
	import SavedTranslation from "./SavedTranslation.svelte";
	
	export let translations:SavedTranslationType[];

</script>

<div class="container">
	{#each translations as translation}
		<SavedTranslation translation={translation}/>
	{/each}
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>