<script lang="ts">
	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);
</script>

....

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await supabase.auth.getUser() then user}
	<pre>{JSON.stringify(user, null, 2)}</pre>
{/await}
