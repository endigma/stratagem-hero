<script lang="ts">
	import { input } from '$lib/styles/input';
	import { button } from '$lib/styles/button';
	import type { ActionData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import { label } from '$lib/styles/label.js';

	export let data;
	export let form: ActionData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const {
		form: magicForm,
		errors: magicErrors,
		constraints: magicConstraints,
		enhance: magicEnhance,
		message: magicMessage
	} = superForm(data.magicForm);

	const {
		form: updatePasswordForm,
		errors: updatePasswordErrors,
		constraints: updatePasswordConstraints,
		enhance: updatePasswordEnhance,
		message: updatePasswordMessage
	} = superForm(data.updatePasswordForm);

	const {
		form: loginPasswordForm,
		errors: loginPasswordErrors,
		constraints: loginPasswordConstraints,
		enhance: loginPasswordEnhance,
		message: loginPasswordMessage
	} = superForm(data.loginPasswordForm);
</script>

<div class="content flex flex-col gap-5">
	<div class="bg-base2 p-4">
		<h3 class="h3 mb-2">Magic Login</h3>
		<form action="?/magic" use:magicEnhance method="post">
			<div class="flex flex-col gap-2">
				<label class={label()}>
					Email
					<input
						type="text"
						name="email"
						class={input()}
						bind:value={$magicForm.email}
						aria-invalid={$magicErrors.email ? 'true' : undefined}
						{...$magicConstraints.email}
					/>
				</label>

				{#if $magicErrors.email}
					<span class="text-red9">{$magicErrors.email}</span>
				{/if}

				<button class={button()}>login</button>
			</div>
		</form>
		{#if $magicMessage}
			<div class="message">{$magicMessage}</div>
		{/if}
	</div>

	<div class="bg-base2 p-4">
		<h3 class="h3 mb-2">Update Password</h3>
		<form action="?/updatePassword" use:updatePasswordEnhance method="post">
			<div class="flex flex-col gap-2">
				<label class={label()}>
					Password
					<input
						type="password"
						id="password"
						name="password"
						class={input()}
						bind:value={$updatePasswordForm.password}
						aria-invalid={$updatePasswordErrors.password ? 'true' : undefined}
						{...$updatePasswordConstraints.password}
					/>
				</label>

				{#if $updatePasswordErrors.password}
					{#each $updatePasswordErrors.password as error}
						<span class="text-red9">{error}</span>
					{/each}
				{/if}

				<button class={button()}>update password</button>
			</div>
		</form>
		{#if $updatePasswordMessage}
			<div class="message">{$updatePasswordMessage}</div>
		{/if}
	</div>

	<div class="bg-base2 p-4">
		<h3 class="h3 mb-2">Log in with Password</h3>
		<form action="?/password" use:loginPasswordEnhance method="post">
			<div class="flex flex-col gap-2">
				<label class={label()}>
					Email
					<input
						type="text"
						id="email"
						name="email"
						class={input()}
						bind:value={$loginPasswordForm.email}
						aria-invalid={$loginPasswordErrors.email ? 'true' : undefined}
						{...$loginPasswordConstraints.email}
					/>
				</label>

				<label class={label()}>
					Password
					<input
						type="password"
						id="password"
						name="password"
						class={input()}
						bind:value={$loginPasswordForm.password}
						aria-invalid={$loginPasswordErrors.password ? 'true' : undefined}
						{...$loginPasswordConstraints.password}
					/>
				</label>

				<button class={button()}>log in</button>
			</div>
		</form>
		{#if $loginPasswordMessage}
			<div class="message">{$loginPasswordMessage}</div>
		{/if}
	</div>

	<div class="bg-base2 p-4">
		<h3 class="h3 mb-2">Log in with OAuth</h3>

		<div class="flex flex-row gap-2">
			<button
				class={button()}
				on:click={async () => {
					await supabase.auth.signInWithOAuth({
						provider: 'github',
						options: {
							redirectTo: `http://localhost:5173/auth/callback`
						}
					});
				}}>log in with github</button
			>

			<button
				class={button()}
				on:click={async () => {
					await supabase.auth.signInWithOAuth({
						provider: 'discord',
						options: {
							redirectTo: `http://localhost:5173/auth/callback`
						}
					});
				}}>log in with discord</button
			>
		</div>
	</div>
</div>
