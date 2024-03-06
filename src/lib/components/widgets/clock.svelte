<script>
	import { onMount, onDestroy } from 'svelte';

	import { ArrowsOutSimple } from 'phosphor-svelte';

	import { fullScreenAction , portalAction} from 'svelte-legos';

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
		let hrs = today.getHours()
		if (hrs >= 12){
			return hrs - 12
		}
		else return hrs
	}

	// $: currentTime = today.toLocaleTimeString([], {
	// 	hour: '2-digit',
	// 	minute: '2-digit',
    //     hour12: true
	// })
	
	$: currentTime = `${hours12()}:${today.toLocaleTimeString([], { minute: '2-digit', hour12: true})}`

	$: ampm = today
		.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })
		.slice(-2);


    $: fullTime = today.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' })

	const startUpdating = () => {
		const interval = setInterval(() => {
			today = new Date();
		}, 1000); // Update every second

		return () => clearInterval(interval);
	};

	onMount(startUpdating);

	onDestroy(() => console.log('Component destroyed'));

	function fullscreen() {
		console.log(ref);
		if (!isFullscreenToggled) {
			// @ts-ignore
			fullScreenAction().update(ref);
			isFullscreenToggled = true;
		} else {
			// @ts-ignore
			console.log(isFullscreenToggled);
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
            isFullscreenToggled = false
		}
	}
</script>

<!-- <div class="text-white">{today}</div> -->

<div
	class="flex w-full flex-row rounded-[11px] border-2 border-[#B62100] bg-[#EF3F18] px-7 py-5 font-montserrat dark:text-white"
>
	<div class="flex-grow">
		<div class="flex flex-col gap-2">
			<div>
				<h1 class="text-2xl font-bold leading-[1.1em]">{day}</h1>
				<h1 class="text-base font-bold leading-[1.1em]">{currentDate}</h1>
			</div>
			<div class="flex flex-row items-baseline gap-0">
				<h1 class="inline text-5xl font-bold">{currentTime}</h1>
				<h1 class="inline text-3xl font-bold">{ampm.toUpperCase()}</h1>
			</div>
			<h1>Event Countdown</h1>
		</div>
	</div>
	<div>
		<button class="duration-150 hover:scale-125" on:click={fullscreen}>
			<ArrowsOutSimple weight="bold" size={20} />
		</button>
	</div>
</div>

{#if isFullscreenToggled}
	<div class="w-full h-full absolute top-0 left-0 bg-black" bind:this={ref} use:portalAction={"body"}>
      <div class="relative h-full">
        <div class="absolute top-0 right-0">
            <button class="duration-150 hover:scale-125 p-6" on:click={fullscreen}>
                <ArrowsOutSimple class="fill-white" weight="bold" size={20} />
            </button>
        </div>
        <div class="flex h-full w-full  justify-center items-center" >
            <div class="text-white">
                <h1 class="font-montserrat text-4xl font-semibold text-neutral-300">{day}</h1>
                <h1 class="font-chivomono text-9xl font-bold">{fullTime}</h1>
                <h1 class="font-montserrat text-2xl font-semibold text-neutral-300">{currentDate}</h1>

            </div>
        </div>
      </div>
    </div>
{/if}
