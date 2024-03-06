<script>
	import { onMount, onDestroy } from 'svelte';

	let today = new Date();

	$: day = today.toLocaleDateString('en-US', { weekday: 'long' });

	$: currentDate = today.toLocaleDateString('en-US' ,{
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: currentTime = today.toLocaleTimeString('en-US', {
		hour12: false,
		hour: 'numeric',
		minute: 'numeric'
	});

    $: ampm = today.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }).slice(-2);

	const startUpdating = () => {
		const interval = setInterval(() => {
			today = new Date();
		}, 1000); // Update every second

		return () => clearInterval(interval);
	};

	onMount(startUpdating);

	onDestroy(() => console.log('Component destroyed'));
</script>

<!-- <div class="text-white">{today}</div> -->

<div
	class="w-full rounded-[11px] border-2 border-[#B62100] bg-[#EF3F18] px-7 py-5 font-montserrat dark:text-white"
>
	<div class="flex flex-col gap-2">
		<div>
			<h1 class="text-2xl font-bold leading-[1.1em]">{day}</h1>
			<h1 class="text-base font-bold leading-[1.1em]">{currentDate}</h1>
		</div>
		<div class="flex flex-row gap-0 items-baseline">
			<h1 class="inline text-5xl font-bold">{currentTime}</h1>
			<h1 class="inline text-3xl font-bold">{ampm.toUpperCase()}</h1>
		</div>
		<h1>Event Countdown</h1>
	</div>
</div>
