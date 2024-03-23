<script>
	import { onMount, onDestroy } from 'svelte';

	import { ArrowsOutSimple } from 'phosphor-svelte';

	import { portalAction, fullScreenAction } from 'svelte-legos';

	import { hotKeyAction } from 'svelte-legos';

	import Fullscreen from 'svelte-fullscreen';

	let today = new Date();

	/**
	 * @type {HTMLElement | undefined}
	 */
	let ref;

	let isFullscreenToggled = false;

	$: day = today.toLocaleDateString('en-US', { weekday: 'long' });

	$: currentDate = today.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: hours12 = () => {
		let hrs = today.getHours();
		if (hrs >= 13) {
			return hrs - 12;
		} else return hrs;
	};

	// $: currentTime = today.toLocaleTimeString([], {
	// 	hour: '2-digit',
	// 	minute: '2-digit',
	//     hour12: true
	// })

	$: currentTime = `${hours12()}:${today.toLocaleTimeString([], { minute: '2-digit', hour12: true })}`;

	$: ampm = today
		.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })
		.slice(-2);

	$: fullTime = today.toLocaleTimeString('en-US', {
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});

	const startUpdating = () => {
		const interval = setInterval(() => {
			today = new Date();
		}, 1000); // Update every second

		return () => clearInterval(interval);
	};

	onMount(startUpdating);

	onDestroy(() => console.log('Component destroyed'));

	function fullscreenBtn() {
		// const element = document.documentElement;

		if (!isFullscreenToggled) {
			// @ts-ignore
			document.documentElement.requestFullscreen();
			isFullscreenToggled = true;
		} else {
			document.exitFullscreen();
			isFullscreenToggled = false;
		}
	}
</script>

<!-- <div class="text-white">{today}</div> -->

<div
	class="responsive-container w-full rounded-[11px] border-2 border-widget-border bg-[--accent-widget] px-5 py-4 md:px-7 md:py-5 font-montserrat dark:text-white"
>
	<div class="clock-main-container">
		<div class="clock-container grid flex-row gap-2">
			
			<div class="clock">
				<div class="flex flex-row items-baseline md:gap-0 gap-[2px]">
					<h1 class="inline text-4xl font-semibold md:text-5xl">{currentTime}</h1>
					<h1 class="inline text-xl font-bold md:text-3xl">{ampm.toUpperCase()}</h1>
				</div>
			</div>
			<div class="day-date-container flex flex-col justify-center sm:items-start items-end">
				<h1 class="md:text-2xl text-xl font-bold leading-[1.1em]">{day}</h1>
				<h1 class="md:text-base text-xs font-semibold leading-[1.1em] whitespace-nowrap">{currentDate}</h1>
			</div>
			<!-- FIXME: remove HIDDEN -->
			<h1 class="hidden md:inline">Event Countdown</h1>
		</div>
	</div>
	<!-- FIXME: remove HIDDEN -->
	<div class="fullscreen-button hidden md:inline">
		<button
			class="duration-150 hover:scale-125"
			on:click={fullscreenBtn}
			use:hotKeyAction={{ shift: true, code: 'KeyF' }}
		>
			<ArrowsOutSimple weight="bold" size={20} />
		</button>
	</div>
</div>

{#if isFullscreenToggled}
	<div
		class="absolute left-0 top-0 h-full w-full bg-black"
		use:portalAction={'body'}
		id="fullscreenClock"
		bind:this={ref}
	>
		<div class="relative h-full">
			<div class="absolute right-0 top-0">
				<button class="p-6 duration-150 hover:scale-125" on:click={fullscreenBtn}>
					<ArrowsOutSimple class="fill-white" weight="bold" size={20} />
				</button>
			</div>
			<div class="flex h-full w-full items-center justify-center">
				<div class="text-white">
					<h1 class="font-montserrat text-4xl font-semibold text-neutral-300">{day}</h1>
					<h1 class="font-chivomono text-9xl font-bold">{fullTime}</h1>
					<h1 class="font-montserrat text-2xl font-semibold text-neutral-300">{currentDate}</h1>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* DEBUG */
	/* * {
		border: 1px rgba(0, 0, 255, 0.301) solid;
	} */

	/* if the screen is smaller than 640 (sm) then this will be applied */
	
	/* MOBILE UI */

	.clock-container {
		grid-template-areas:
			'clock daydate'
			'clock daydate';
			grid-template-columns: 1fr min-content;

			
	}

	.responsive-container {
		display: grid;
		grid-template-areas:
			'main main'
			'button button';
		grid-template-columns: 1fr min-content;
	}
	

	

	/* if the screen is bigger than 640 (sm) then this will be applied */
	/* FOR DESKTOP */
	@media (min-width: 640px) {
		.clock-container {
			grid-template-areas:
				'daydate daydate'
				'clock clock';
			grid-template-columns: 1fr min-content;
		}

		.responsive-container {
		display: grid;
		grid-template-areas:
			'main button'
			'main button';
	}

	}

	/* FOR TABLET */
	/* @media screen and (min-width: 768px) {
		.clock-container {
			grid-template-areas:
				'daydate daydate'
				'clock clock';
		}
	} */

	.clock {
		grid-area: clock;
	}

	.day-date-container {
		grid-area: daydate;
	}

	.clock-main-container {
		grid-area: main;
	}
	.fullscreen-button {
		grid-area: button;
	}
</style>
