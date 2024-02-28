<script lang="ts">
	import ArrowDirection from "./ArrowDirection.svelte"
	import { eq as arrayEq } from "@mobily/ts-belt/Array"
	import { Direction } from "$lib/game"
	import { stratagems } from "$lib/game"

	const keybinds: { [key: string]: Direction } = {
		i: Direction.Up,
		k: Direction.Down,
		j: Direction.Left,
		l: Direction.Right
	}

	let matchingGems = Object.entries(stratagems)
	let completeGem: string | null = null

	let input: Direction[] = []

	function reset() {
		input = []
		matchingGems = Object.entries(stratagems)
		completeGem = null
	}

	function onKeyDown(event: KeyboardEvent) {
		console.log(event)
		if (Object.keys(keybinds).includes(event.key) || event.key == " ") {
			event.preventDefault()

			if (completeGem && event.key == " ") {
				reset()
				return
			} else if (completeGem) {
				return
			}

			input = [...input, keybinds[event.key]]

			matchingGems = matchingGems.filter((gem) => {
				return arrayEq(gem[1].slice(0, input.length), input, (a, b) => a == b)
			})

			if (matchingGems.length == 1 && matchingGems[0][1].length == input.length) {
				console.log("matched gem", matchingGems[0][0])
				completeGem = matchingGems[0][0]
			}

			if (matchingGems.length == 0) {
				reset()
			}
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="h-screen flex flex-col">
	<div class="flex-grow content overflow-auto">
		<div class="flex flex-col gap-2 flex-wrap">
			{#each matchingGems as [name, code]}
				<div
					class="hue-{name == completeGem
						? 'accent'
						: 'base'} flex flex-col p-3 border text-hue11 bg-hue3 border-hue6 w-max"
				>
					<h2 class="h2 uppercase w-max">{name}</h2>
					<div class="flex flex-row gap-2">
						{#each code as direction, i}
							{#if i < input.length}
								<ArrowDirection pressed {direction} />
							{:else}
								<ArrowDirection {direction} />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>

		{#if completeGem}
			<small>Press space to reset</small>
		{/if}
	</div>
	<div class="flex flex-row bg-base2 p-4">
		<div class="flex flex-row gap-2">
			{#each input as keypress}
				<ArrowDirection pressed={false} direction={keypress} />
			{:else}
				<div class="h-12">Start entering a code to start</div>
			{/each}
		</div>
	</div>
</div>
