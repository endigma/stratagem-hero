<script lang="ts">
	import ArrowDirection from "$lib/components/ArrowDirection.svelte"
	import { Direction, MatchingGems, type Code, type Stratagem, CheckMatchingCode } from "$lib/game"
	import { stratagems } from "$lib/game"
	import StratagemDisplay from "$lib/components/Stratagem.svelte"
	import InputDrawer from "$lib/components/InputDrawer.svelte"
	import { onDestroy, onMount } from "svelte"
	import { succ } from "@mobily/ts-belt/Number"
	import { browser } from "$app/environment"

	let state: "Playing" | "Failed" = "Playing"

	let input: Code = []
	let gem: Stratagem = stratagems[0]
	let streak = 0
	let matching = 0

	function reset() {
		input = []
		state = "Playing"
		streak = 0
	}

	function win() {
		streak += 1
		countdown = 10
		input = []
		gem = stratagems[Math.floor(Math.random() * stratagems.length)]
	}

	function lose() {
		countdown = 0
		state = "Failed"
	}

	function onDirection(e: CustomEvent<Direction>) {
		input = [...input, e.detail]

		matching = CheckMatchingCode(input, gem[1])

		if (input.length > 0 && matching == 0) {
			console.log("lose")
			lose()
		}

		if (matching == gem[1].length) {
			console.log("win")
			win()
		}
	}

	let timer: NodeJS.Timeout
	let countdown = 10

	onMount(() => {
		timer = setInterval(() => {
			countdown -= 1
		}, 1000)
	})

	onDestroy(() => {
		if (timer) {
			clearInterval(timer)
		}
	})

	$: if (countdown <= 0) lose()
</script>

<div class="h-screen flex flex-col">
	<div class="flex-grow content overflow-auto">
		<div class="flex flex-col">
			<span>{state}</span>
			<span>
				Score: {streak}
			</span>
			<span>
				{countdown} Seconds remaining!
			</span>
		</div>

		<StratagemDisplay {input} stratagem={gem} />

		{#if state === "Failed"}
			<small>Press space or escape to reset</small>
		{/if}
	</div>
	<InputDrawer on:reset={reset} on:direction={onDirection} {input} />
</div>
