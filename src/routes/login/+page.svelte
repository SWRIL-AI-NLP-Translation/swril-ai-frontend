<script lang="ts">
	import Icon from '$lib/components/icons/icon.svelte';
	import { login } from '$lib/data/api/account';
	import { Cookies } from '$lib/utils/cookies';

	let submitEnabled = true;

	let tryLogin = async () => {
		submitEnabled = false;
		const res = await login();
		if (res.error) {
			alert(res.error.message);
		} else {
			alert('Logged in!');
			Cookies.set('token', res.data);
			window.location.href = '/';
		}
		submitEnabled = true;
	};
</script>

<article>
	<section class="intro">
		<div class="introHeader">
			<h3>Login</h3>
			<Icon height={'2rem'} width={'2rem'} icon={'account'} />
		</div>
		<p>Hello, welcome back to your account!</p>
	</section>
	<section class="form">
		<label for="email">Email</label>
		<input type="text" id="emailInput" name="email" placeholder="Email address" />
		<label for="password">Password</label>
		<input type="password" id="passwordInput" name="password" placeholder="Password" />
		<a href="/forgotpassword">Forgot Password?</a>
		<button on:click={submitEnabled ? tryLogin : null}>
			<p>Login</p>
		</button>
	</section>
	<hr />
	<section class="signup">
		<p>Don't have an account? <a href="/signup">Sign up</a></p>
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
			padding: 0 3rem;
			align-items: flex-end;
			justify-content: center;
			label {
				display: none;
			}
			input {
				width: 100%;
				height: 3rem;
				border-radius: 1rem;
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
