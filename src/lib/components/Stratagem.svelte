<script lang="ts">
	import { CheckMatchingCode, type Code, type Stratagem } from "$lib/game"
	import ArrowDirection from "./ArrowDirection.svelte"

	export let stratagem: Stratagem
	export let input: Code

	$: matching = CheckMatchingCode(input, stratagem[1])
	$: complete = matching == stratagem[1].length
	$: eliminated = matching == 0 && input.length != 0

	export let size = 32
</script>

<div
	class="hue-{complete ? 'accent' : 'base'} {eliminated &&
		'opacity-65'} flex flex-col p-3 border text-hue11 bg-hue3 border-hue6 w-full sm:w-max"
>
	<div class="text-xl font-semibold uppercase">{stratagem[0]}</div>
	<div class="flex flex-row gap-2">
		{#each stratagem[1] as direction, i}
			{@const pressed = matching > i}

			<ArrowDirection {direction} {size} {pressed} />
		{/each}
	</div>
</div>
