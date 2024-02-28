<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource/noto-color-emoji';
	import '@unocss/reset/tailwind-compat.css';
	import 'uno.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { button } from '$lib/styles/button.js';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>stratagem-hero</title>
</svelte:head>

<div class="flex flex-row justify-between bg-base2 border-b border-base6">
	<div class="p-2">stratagem-hero</div>
	<a class={button()} href="/auth">log in</a>

	<div class="flex flex-row gap-2">
		<div class="flex items-center">
			{#await supabase.auth.getUser() then user}
				<pre>currently logged in as: {JSON.stringify(user?.data?.user?.email, null, 2)}</pre>
			{/await}
		</div>

		<form action="/auth?/logout" method="post">
			<button class={button()}>log out</button>
		</form>
	</div>
</div>

<slot />

<style global>
	:global(body) {
		font-family: 'Inter Variable', 'Noto Color Emoji', sans-serif;
	}

	:global(button) {
		background-color: transparent;
	}

	:global(html) {
		--at-apply: bg-base1 text-base12 transition-colors scroll-smooth;
	}

	:global(*) {
		scroll-behavior: smooth;
	}

	:global(.dark-theme) {
		color-scheme: dark;
	}
</style>
