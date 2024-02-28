<script lang="ts">
	import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp } from "lucide-svelte"
	import type { Direction } from "$lib/game"

	export let direction: Direction
	export let pressed: boolean = false

	let size = 48
	let strokeWidth = 2
</script>

{#if direction === "up"}
	<ArrowBigUp {strokeWidth} {size} class="hue-{pressed ? 'accent' : 'base'} fill-hue9 text-hue9" />
{:else if direction === "down"}
	<ArrowBigDown
		{strokeWidth}
		{size}
		class="hue-{pressed ? 'accent' : 'base'} fill-hue9 text-hue9"
	/>
{:else if direction === "left"}
	<ArrowBigLeft
		{strokeWidth}
		{size}
		class="hue-{pressed ? 'accent' : 'base'} fill-hue9 text-hue9"
	/>
{:else if direction === "right"}
	<ArrowBigRight
		{strokeWidth}
		{size}
		class="hue-{pressed ? 'accent' : 'base'} fill-hue9 text-hue9"
	/>
{/if}
