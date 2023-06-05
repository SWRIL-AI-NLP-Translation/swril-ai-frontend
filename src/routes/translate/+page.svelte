<script lang="ts">
	import { goto } from '$app/navigation';
	import { COLORS } from '$lib/styles/colors';
	import Swap from '$lib/components/icons/swap.svelte';
	import Upload from '$lib/components/icons/upload.svelte';
	import { graphql } from '$lib/data/graphql';
	import { getTranslation, saveTranslation } from '$lib/data/api/translate'
	import { languages } from '$lib/types/languages';
	import type { AccountData } from '$lib/types/account';
	import Icon from '$lib/components/icons/Icon.svelte';
	import SavedTranslationGrid from '$lib/components/SavedTranslationGrid.svelte';
	import { savedText } from '$lib/data/stores';
	import { onMount } from 'svelte';
	// import micPhone from '$lib/images/mic.svg';
	export let data: AccountData;

	let fromLanguage = 'English';
	let toLanguage = 'French';

	const langMap: any = {"Chinese": 'zh-cn', "English": 'en', "Afrikaans": 'af', "Armenian": 'hy', "Portuguese": 'pt', "Urdu": 'ur', "Spanish": 'es',
        "French": 'fr', "Arabic": 'ar', "Polish": 'pl', "Filipino": 'tl', "Croatian": 'hr', "Serbian": 'sr', "Romanian": 'ro', "German": 'de',
        "Italian": 'it', "Dutch": 'nl', "Hindi": 'hi', "Korean": 'ko', "Japanese": 'ja', "Persian": 'fa', "Punjabi": 'pa', "Gujarati": 'gu',
        "Turkish": 'tr', "Thai": 'th', "Russian": 'ru', "Amharic": 'am'};

	$: translation = '';

	let tryTranslate = async () => {
		const translationData = await getTranslation();
		fromLanguage = translationData.fromLanguage
		toLanguage = translationData.toLanguage
		translation = translationData.translation
	}
	let savedTranslation:string = '';
	savedText.subscribe(value => {savedTranslation = value})
	onMount(() => {
		if (savedTranslation.length > 0) {
			const textInput:HTMLInputElement|null = document.querySelector("#textInput");
			if (textInput) {
				textInput.value = savedTranslation;
				tryTranslate();
			}
		}
	})

	const trySaveTranslation = async () => {
		if (!data.user) {
			alert('You must be logged in to save translations')
			return
		}
		const newTranslation = await saveTranslation(translation)
		if (!newTranslation) return
		if (data?.user) {
			data.user.translations = [...data.user.translations, newTranslation]
			alert('Saved translation to your account')
		} else {
			alert('You must be logged in to save translations')
		}
		
	}
	const swap = () => {
		const fromLanguageInput:HTMLInputElement|null = document.querySelector("#fromLanguageInput");
		const toLanguageInput:HTMLInputElement|null = document.querySelector("#toLanguageInput");
		if (fromLanguageInput && toLanguageInput) {
			const temp = fromLanguageInput.value;
			fromLanguageInput.value = toLanguageInput.value;
			toLanguageInput.value = temp;
			translation = ''
		}
	}

	let transcript = '';
	let recognition: any;
	let isRecording = false;

	// Starts the speech recognition process
	const startStopRecognition = async () => {
		const startStopBtn: HTMLImageElement | null = document.querySelector('#microphone');
		// Changes color of button and activates speech API
		if (!isRecording) {
			startRecording();
			if (startStopBtn) {
				startStopBtn.style.backgroundColor = 'aquamarine';
			}
		} else {
			stopRecording();
			if (startStopBtn) {
				startStopBtn.style.backgroundColor = '';
			}
		}
		isRecording = !isRecording;
	};

	// Wrapper for recognition start
	const startRecording = async () => {
		const textInput: HTMLInputElement | null = document.querySelector('#textInput');
		const languageInput: HTMLInputElement | null = document.querySelector('#fromLanguageInput');

		recognition = new webkitSpeechRecognition();
		recognition.interimResults = true;
		
		// Set language to selected language default english
		// If in middle of recording language change takes effect next recording
		if (languageInput) {
			let lang = languageInput.value;
			recognition.lang = langMap[lang];
		} else {
			recognition.lang = 'en';
		}
		
		recognition.continuous = true;
		
		recognition.start();

		// Records spoken words
		recognition.onresult = (event: any) => {
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const result = event.results[i];
				if (result.isFinal) {
					transcript += result[0].transcript;
				}
				if (textInput) {
					textInput.value = transcript;
				}
			}
		};
	};

	// Wrapper for recognition stop
	const stopRecording = async () => {
		const textInput: HTMLInputElement | null = document.querySelector('#textInput');
		if (recognition) {
			recognition.stop();
		}
		// If recording activates again words are cleared
		transcript = '';
	};
</script>

<article>
	<header>
		<h1>Translate</h1>
	</header>
	<section class="languageSelect">
		<select value={fromLanguage} class="fromLanguage" id="fromLanguageInput" on:change={tryTranslate}>
			{#each languages as language}
				<option value={language}>{language}</option>
			{/each}
		</select>
		<button 
			class="swapIcon"
			on:click={swap}
		>
			<Swap color={COLORS.swr_dark_grey}/>
		</button>
		<select value={toLanguage} class="toLanguage" id="toLanguageInput"  on:change={tryTranslate}>
			{#each languages as language}
				<option value={language}>{language}</option>
			{/each}
			<!-- <p class="languageName">{toLanguage}</p> -->
		</select>
	</section>

	<section class="textArea">
		<textarea 
			id="textInput" 
			placeholder="Enter text here..." 
			value={savedTranslation}
			on:keydown={(e) => {if (e.key === 'Enter') tryTranslate()}}
			on:focusout={tryTranslate}
			on:change={() => {translation = ''}}
		></textarea>
		<div id="textOutput" >
			{#if translation}
				<button on:click={trySaveTranslation}>
					<Icon icon="star" width='2rem' height='2rem' color={COLORS.swr_dark_grey}/>
				</button>
			{/if}
			<p 
				placeholder="Hit enter to translate" 
			>{translation}
			</p>
		</div>
		<div class="document">
			<button on:click={() => {goto('/translate/upload')}}>
				<div>
					<Upload color={COLORS.swr_primary}/>
				</div>
				<p>Upload Document</p>
			</button>
			<div class="separator"></div>
			<button on:mousedown={startStopRecognition} class="microphone">
				<Icon icon="mic" color={COLORS.swr_dark_grey}/>
			</button>
		</div>
	</section>

	{#if data?.user}
		<section class="previousTranslations">
			<h5>Previous translations</h5>
			<SavedTranslationGrid translations={data.user.translations}/>
		</section>
	{/if}
	<!-- <button on:mousedown={startStopRecognition}>
		<img src={micPhone} alt="micPhone" class="microphone" id="microphone"/>
	</button> -->

</article>

<style lang="scss">
	button {
		background-color: transparent;
		border: none;
		outline: none;
	}
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 25rem;
		border: 0.2rem solid black;
		header {
			display:flex;
			justify-content: center;
			background-color: color('swr_secondary');
			align-items: center;
			width: calc(100% - 2rem);
			padding: 1rem;
			h1 {
				font-size: 2rem;
				text-align: center;
				color: color('swr_primary')
			}
		}
		.microphone {
			border-radius: 100%;
			width: 3rem;
			height: 3rem;
		}
		.microphone:active {
			background-color: aquamarine;
		}
		.separator {
			height: 3rem;
			padding-left: 3rem;
			margin-right: 3rem;
			border-right: 0.1rem solid color('swr_dark_grey');
		}
		.languageSelect {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			.swapIcon {
				height: 4rem;
				width: 4rem;
				// padding: 1rem;
				border-radius: 50%;
				margin: 0 1rem;
				transition: rotate 0.4s ease-in-out;
				&:hover {
					rotate: 180deg;
				}
			}
			.fromLanguage, .toLanguage {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 1rem;
				font-size: 1.5rem;
				text-align: center;
				border: none;
				color: white;
				width: 100%;
				height: 100%;
				border: 0.2rem solid transparent;
				transition: border-color 0.2s ease-in-out;
			}
			.fromLanguage {
				background-color: color('swr_green');
				&:hover {
					border-color: color('swr_blue');
				}
			}
			.toLanguage {
				background-color: color('swr_blue');
				&:hover {
					border-color: color('swr_green');
				}
			}
		}
		.textArea {
			width: 100%;
			#textInput {
				border: none;
				border-radius: 0.5rem 0.5rem 0 0;
				padding: 0.6rem;
				width: calc(100% - 1.2rem);
				min-height: 6rem;
				resize:vertical;
				font-size: 1.3rem;
			}
			#textOutput {
				border: none;
				border-top: 1px solid color('swr_dark_grey');
				padding: 0.6rem;
				width: calc(100% - 1.2rem);
				font-size: 1.3rem;
				background-color: white;
				resize: none;
				button {
					padding: 0;
				}
			}
			.document {
				display: flex;
				align-items: center;
				justify-content: center;
				width: calc(100% - 1rem);
				background-color: white;
				border-top: 1px solid color('swr_dark_grey');
				padding: 0.5rem;
				border-radius: 0 0 0.5rem 0.5rem;
				button {
					display: flex;
					align-items: center;
					justify-content: center;
					border: 0.2rem solid transparent;
					// padding: 0.3rem 0.5rem;
					border-radius: 0.5rem;
					transition: border-color 0.2s ease-in-out;
					// box-sizing:border-box;
					&:hover {
						border-color: color('swr_blue');
					}
					div {
						height: 2rem;
						width: 2rem;
					}
					p {
						margin: 0.3rem 0.5rem;
						font-size: 1.2rem;
						// color: black;
						font-weight: bold;
					}
				}
			}
		}
		.previousTranslations {
			h5 {
				margin: 1rem 0 0.5rem;
				font-size: 1.5rem;
				text-align: center;
				color: color('swr_dark_grey')
			}
		}
	}
</style>
