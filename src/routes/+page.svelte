<script lang="ts">
	import { input } from '$lib/styles/input';
	import { button } from '$lib/styles/button';

	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<div class="content">
	<h1 class="h1">Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
