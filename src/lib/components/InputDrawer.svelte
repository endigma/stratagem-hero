<script lang="ts">
	import { Direction, type Code } from "$lib/game"
	import { createEventDispatcher } from "svelte"
	import ArrowDirection from "./ArrowDirection.svelte"
	import { button } from "$lib/styles/button"

	export let input: Code

	const keybinds: { [key: string]: Direction } = {
		i: Direction.Up,
		k: Direction.Down,
		j: Direction.Left,
		l: Direction.Right
	}

	const dispatch = createEventDispatcher<{
		direction: Direction
		reset: void
		accept: void
	}>()

	function onKeyDown(event: KeyboardEvent) {
		// console.log(event)

		if (event.key === "Escape" || event.key === "Backspace") {
			event.preventDefault()
			dispatch("reset")
		}

		if (event.key === " ") {
			event.preventDefault()
			dispatch("accept")
		}

		if (Object.keys(keybinds).includes(event.key)) {
			event.preventDefault()

			dispatch("direction", keybinds[event.key])
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex flex-row bg-base2 border-t border-base7 p-4">
	<div class="flex flex-row gap-2">
		{#each input as direction}
			<ArrowDirection pressed={false} {direction} />
		{:else}
			<div class="h-12 text-base11 text-xl">Start entering a code to start</div>
		{/each}
	</div>
</div>
