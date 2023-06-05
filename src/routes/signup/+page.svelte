<script lang="ts">
	import { COLORS } from '$lib/styles/colors';
	import { graphql } from '$lib/data/graphql';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { createAccount } from '$lib/data/api/account';
	import { goto } from '$app/navigation';
	import { Cookies } from '$lib/utils/cookies';

	let submitEnabled = true;

	let tryCreateAccount = async () => {
		submitEnabled = false;
		await createAccount();
		submitEnabled = true;
	}
</script>

<article>
	<section class="intro">
		<div class="introHeader">
			<h3>Create an account</h3>
		</div>
		<p>So you can start translating</p>
	</section>
	<section class="form">
		<label for="firstName">First Name</label>
		<input type="text" name="firstName" id="firstNameInput" placeholder="First Name"/>
		<label for="lastName">Last Name</label>
		<input type="text" name="lastName" id="lastNameInput" placeholder="Last Name"/>
		<label for="email">Email</label>
		<input type="text" name="email" id="emailInput" placeholder="Email address"/>
		<label for="password">Password</label>
		<input type="password" name="password" id="passwordInput" placeholder="Password"/>
		<label for="confirmPassword">Confirm Password</label>
		<input type="password" name="confirmPassword" id="confirmPasswordInput" placeholder="Password"/>
		<button on:click={submitEnabled?tryCreateAccount:null}>
			<p>Create Account</p>
		</button>
	</section>
	<hr>
	<section class="signup">
		<p>Don't have an account? <a href="/login">Login</a></p>
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
				border: 0.15rem solid black;
				border-radius: 0.5rem;
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
				display: flex;
				align-items: center;
				justify-content: center;
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
