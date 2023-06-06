<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { uploadFile } from '$lib/data/api/file';
	import type { AccountData } from '$lib/types/account';
	
	let file: File|null = null;
	export let data: AccountData;
	onMount(() => {
		if (!data?.user || !data.token ) goto("/login")
	});

	const fileChange = (e: Event) => {
		let target:any = e.target ?? null;
		if (target!=null) {
			file = target.files[0];
		}
	}
	const tryUploadFile = async (): Promise<void> => {
		if (!file) return alert("File not found")
		const res = await uploadFile(file, data.token??'') as {filename: string};
		alert("Saved " + res.filename)
		goto('/translate/documents')
	}
</script>

<article>
	<header>
		<h1>Upload Document</h1>
	</header>
	<h3>Translate</h3>
	{#if file}
		<section class="fileInfo">
			<h4>{file.name}</h4>
		</section>
		<button class="uploadButton" on:click={tryUploadFile}>
			<h4>Upload</h4>
		</button>
	{:else}
		<section class="info">
			<p>
				Upload files to your account for quick translation!
			</p>
			<p>
				Supported File Types: .txt, .doc, .docx, .csv, .pdf, .xlsx
			</p>
		</section>
		<button class="selectFileButton">
			<h4>Select File</h4>
			<input  type="file" id="fileUpload" name="file" accept=".doc,.docx,.txt,.csv,.pdf,.xlsx" on:change={fileChange}>
		</button>
	{/if}
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 0.2rem solid black;
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
		.fileInfo {
			width: calc(100% - 3rem);
			background-color: white;
			padding: 2rem;
			border-radius: 1rem;
			margin: 1rem;
		}
		.info {
			width: calc(100% - 4rem);
			background-color: color('swr_light_grey');
			padding: 2rem;
			border-radius: 1rem;
			margin: 1rem;
			p {
				font-size: 1rem;
				text-align: left;
				font-weight: 500;
				margin:0.5rem 0;
			}
		}
		.uploadButton, .selectFileButton {
			@include text-button;
			background-color: white;
			border: 0.2rem solid black;
			position: relative;
			transition: border-color 0.2s ease-in-out;
			&:hover {
				border-color: color('swr_blue');
			}
			flex-direction: row;
			align-items: center;
			margin: 1rem;
			width: 100%;
			// padding: 0.5rem;
			border-radius: 1rem;
			height: 2.5rem;
		}
		.uploadButton {
			h4 {
				text-align: center;
				font-size: 1rem;
				width: 100%;
			}
		}
		.selectFileButton {
			input {
				opacity: 0;
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
			h4 {
				position: absolute;
				text-align: center;
				font-size: 1rem;
				width: 100%;
			}
		}
	}
</style>
