<script>
	import '../app.pcss';

	import '@fontsource-variable/space-grotesk';
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/chivo-mono';

	import Clock from '$lib/components/widgets/clock.svelte';
</script>

<div class="flex h-screen w-screen flex-row bg-neutral-900">
	<div class="h-full w-[450px] bg-neutral-800 flex flex-row">
		<div id="header" class="h-full w-20 bg-[#3B854B]">
			<div class="flex h-full flex-col items-center">
				<div class="h-full flex-grow"><div>items</div></div>
				<h1
					class=" font-header my-7 origin-center -translate-y-20 -rotate-90 text-4xl font-bold dark:text-white"
				>
					Dashboard
				</h1>
			</div>
		</div>
		<div id="sidebar-content" class="flex-grow px-6 py-5">
			<Clock />
		</div>
	</div>
	<div>
		<slot />
	</div>
</div>
