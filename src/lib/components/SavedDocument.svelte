<script lang="ts">
	import { goto } from "$app/navigation";
	import { savedText } from "$lib/data/stores";
	import type { UserFile } from "$lib/types/userFile";
	
	export let document:UserFile;

	const trimText = (name:string, length: number) => {
		if (name.length > length) {
			return name.slice(0, length) + '...'
		}
		return name
	}

	const translateDocument = () => {
		savedText.set(document.text.replaceAll("\n\n", "\n"))
		goto('/')
	}

</script>

<div class="container">
	<h3>{trimText(document.name, 13)}</h3>
	<p>{trimText(document.text, 200)}</p>
	<button on:click={translateDocument}>
		<p>Translate</p>
	</button>
</div>

<style lang="scss">
	.container {
		background-color: white;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 10rem;
		margin: 0.5rem;
		padding: 0.5rem;
		h3 {
			font-size: 1.1rem;
			text-align: center;
		}
		p {
			font-size: 0.8rem;
			text-align: center;
		} 
		button {
			background-color: color('swr_secondary');
			border: 0.2rem solid transparent;
			transition: border-color 0.2s ease-in-out;
			border-radius: 1rem;
			color: white;
			font-size: 0.8rem;
			font-weight: 600;
			margin: 0.5rem 1rem;
			padding: 0.2rem;
			width: 100%;
			p {
				margin: 0;
			}
			&:hover {
				border-color: color('swr_blue');
			}
		}	
	}
</style>