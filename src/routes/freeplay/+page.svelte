<script lang="ts">
	import ArrowDirection from "$lib/components/ArrowDirection.svelte"
	import InputDrawer from "$lib/components/InputDrawer.svelte"
	import Stratagem from "$lib/components/Stratagem.svelte"
	import { Direction, MatchingGems, type Code } from "$lib/game"
	import { stratagems } from "$lib/game"

	let matchingGems = stratagems

	let state: "Complete" | "Playing" | "Failed" = "Playing"

	let input: Code = []

	function reset() {
		input = []
		matchingGems = stratagems
		state = "Playing"
	}

	function accept() {
		if (state === "Failed" || state === "Complete") {
			reset()
		}
	}

	function onDirection(e: CustomEvent<Direction>) {
		input = [...input, e.detail]

		matchingGems = MatchingGems(input)
		if (matchingGems.length === 1 && matchingGems[0][1].length === input.length) {
			console.log("matched gem", matchingGems[0][0])
			state = "Complete"
		}

		if (matchingGems.length === 0) {
			state = "Failed"
		}
	}
</script>

<div class="h-screen flex flex-col">
	<div class="flex-grow content overflow-auto">
		<div class="flex flex-row gap-2 flex-wrap">
			{#each stratagems as [name, code]}
				<Stratagem {input} stratagem={[name, code]} />
			{:else}
				<div class="flex flex-col p-3 border text-red11 bg-red3 border-red6 w-max">
					<h2 class="h2 uppercase w-max">Failed</h2>
					No tracked stratagems use this code.
				</div>
			{/each}
		</div>

		{#if state === "Complete" || state === "Failed"}
			<small>Press space or escape to reset</small>
		{/if}
	</div>
	<InputDrawer on:direction={onDirection} on:reset={reset} on:accept={accept} bind:input />
</div>
