<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import Icon from '$lib/components/icons/icon.svelte';
	import { goto } from '$app/navigation';
	import { updateAccount } from '$lib/data/api/account';
	import type { AccountData } from '$lib/types/account';

	let submitEnabled = true;

	export let data: AccountData;
	if (!data?.user) {
		goto("login")
	}

	let tryUpdateAccount = async () => {
		submitEnabled = false;
		const res = await updateAccount();
		if (res.error) {
			alert(res.error.message);
		} else {
			alert("Account updated successfully")
			goto('/settings')
		}
		submitEnabled = true;
	}
</script>

<article>
	<header>
		<button on:click={() => {goto('/settings')}}>
			<Icon icon={'leftArrow'} color={COLORS.swr_dark_grey} height='1.5rem' width='1.5rem'/>
		</button>
		<h1>Edit account</h1>
	</header>
	<!-- <section class="intro">
		<div class="introHeader">
			<h3>Create an account</h3>
		</div>
		<p>So you can start translating</p>
	</section> -->
	<section class="form">
		<label for="firstName">First Name</label>
		<input value={data?.user?.first_name} type="text" name="firstName" id="firstNameInput" placeholder="First Name"/>
		<label for="lastName">Last Name</label>
		<input value={data?.user?.last_name} type="text" name="lastName" id="lastNameInput" placeholder="Last Name"/>
		<button on:click={submitEnabled?tryUpdateAccount:null}>
			Update Account
		</button>
	</section>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
		.intro {
			width: 100%;
			.introHeader {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 100%;
				h3 {
					font-size: 1.5rem;
					text-align: left;
					font-weight: 500;
				}
			}
			p {
				font-size: 1rem;
				text-align: left;
				font-weight: 500;
				color: color('swr_green');
			}
		}
		.form {
			box-sizing: border-box;
			* {
				box-sizing: border-box;
			}
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 1rem;
			align-items: flex-end;
			justify-content: center;
			label {
				align-self: flex-start;
				// display: none;
			}
			input {
				width: 100%;
				height: 3rem;
				border-radius: 1rem;
				border: none;
				outline: none;
				padding: 0 1rem;
				margin: 0.5rem 0;
				font-size: 1rem;
				font-weight: 500;
				background-color: white;
			}	
			a {
				color: color('swr_blue');
			}
			button {
				width: 100%;
				height: 3rem;
				border-radius: 1rem;
				border: none;
				outline: none;
				padding: 0 1rem;
				margin: 0.5rem 0;
				font-size: 1rem;
				font-weight: 500;
				background-color: color('swr_primary');
				color: white;
			}
		}
		hr {
			width: 100%;
			border: none;
			height: 1px;
			background-color: black;
			margin: 1rem;
		}
		.signup {
			width: 100%;
			p {
				font-size: 1rem;
				text-align: center;
				font-weight: 500;
				color: color('swr_green');
				a {
					color: color('swr_blue');
				}
			}
		}
	}
</style>
