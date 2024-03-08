<script>
	import Clock from '$lib/components/widgets/clock.svelte';
	export let data;

	import Avatar from '$lib/components/dashboard/avatar.svelte';

	import {  } from 'phosphor-svelte'

	let avatar_url = 'https://avatars.githubusercontent.com/u/48552989?v=4';

	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	const {
		elements: { menu, item, trigger, arrow }
	} = createDropdownMenu();
</script>

<div use:melt={$menu} class="text-white bg-neutral-800 flex flex-col border border-1 border-neutral-700 rounded-lg w-60 font-base divide-solid divide-y-2 divide-neutral-700">
	<div use:melt={$item} class="p-1">
		<div class="context-item">
			<h1 class="font-bold">{data.user.username}</h1>
			<h2 class="text-sm">{data.user.id}</h2>
		</div>
	</div>

	<div use:melt={$item} class="p-1">
		<div>
			<form action="/logout" method="POST">
				<button class="context-item-button" type="submit">
					<h1>Logout</h1>

				</button>
			</form>
		</div>
	</div>

</div>

<div class="flex h-screen w-screen flex-row bg-neutral-900">
	<div class="flex h-full w-[450px] flex-row bg-neutral-800">
		<div id="header" class="h-full w-20 bg-[#3B854B]">
			<div class="flex h-full flex-col items-center">
				<div class="h-full flex-grow">
					<div>
						<!-- TODO: Refactor here -->

						{#if !data.user}
							<div class="aspect-square w-full rounded-full bg-red-500">no user</div>
						{:else}
							<div use:melt={$trigger}>
								<Avatar username={data.user.name} url={avatar_url} />
							</div>
						{/if}
					</div>
				</div>
				<h1
					class=" my-7 origin-center -translate-y-20 -rotate-90 font-header text-4xl font-bold dark:text-white"
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
