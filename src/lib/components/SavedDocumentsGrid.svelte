<script lang="ts">
	import type { UserFile } from "$lib/types/userFile";
	import SavedDocument from "./SavedDocument.svelte";
	
	export let documents:UserFile[];

</script>

<div class="container">
	{#each documents as document}
		<SavedDocument document={document}/>
	{/each}
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>