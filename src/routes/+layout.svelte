<script lang="ts">
	import "@fontsource-variable/inter"
	import "@fontsource/noto-color-emoji"
	import "@unocss/reset/tailwind-compat.css"
	import "uno.css"
</script>

<svelte:head>
	<title>Stratagem Hero</title>
</svelte:head>

<div class="h-screen flex flex-col">
	<div class="flex flex-row items-center gap-2">
		<h4 class="h4">gamemodes</h4>
		<a href="freeplay" class="link">freeplay</a>
		<a href="timeattack" class="link">time attack</a>
	</div>

	<slot />
</div>

<style global>
	:global(body) {
		font-family: "Inter Variable", "Noto Color Emoji", sans-serif;
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

	.link {
		--at-apply: "text-accent11 hover:underline";
	}
</style>
