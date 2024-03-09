<script>
	import { SignIn, SidebarSimple, HardDrives } from 'phosphor-svelte';

	import Clock from '$lib/components/widgets/clock.svelte';
	export let data;

	import Avatar from '$lib/components/dashboard/avatar.svelte';

	import Logoutdrawer, { toggleDialog } from '$lib/components/dashboard/logoutdrawer.svelte';
	import { Button } from '$lib/components/ui/button';

	import { Label } from '$lib/components/ui/label';

	import Networklist from '$lib/components/dashboard/networklist.svelte';
	import { goto } from '$app/navigation';

	let avatar_url = 'https://avatars.githubusercontent.com/u/48552989?v=4';
	// let avatar_url = '';

	// import { createDropdownMenu, melt } from '@melt-ui/svelte';
	// import Button from '$lib/components/ui/button/button.svelte';
	// const {
	// 	elements: { menu, item, trigger, arrow }
	// } = createDropdownMenu();

	import { fly } from 'svelte/transition'
	import { quadInOut } from 'svelte/easing'
	import { windowSizeStore } from 'svelte-legos';


	let sidebarShown = true

	const size = windowSizeStore()
</script>

<div class="absolute bottom-3  right-3 block sm:hidden z-50">
	<div class="pb-safe">
		<button class="bg-[#3B854B] flex flex-row items-center justify-center gap-3 px-5 py-4 rounded-xl drop-shadow-xl" on:click={() => {sidebarShown = !sidebarShown}}>
			{#if sidebarShown}
			<span>
				<SidebarSimple weight="fill" class="fill-emerald-300 h-4 w-4"/>
			</span>
			{:else}
			<span>
				<SidebarSimple weight="regular" class="fill-emerald-300 h-4 w-4" />
			</span>
			{/if}
			<p class="text-base text-emerald-300">Sidebar</p>
		</button>
	</div>
</div>

<div class="flex h-dvh w-dvw flex-row bg-neutral-900">
	{#if sidebarShown}
	<div class="flex h-full w-[450px] flex-col bg-neutral-800 md:flex-row" transition:fly={{x:-$size.width, easing: quadInOut, duration: 250}}>
		<div id="header" class="w-full sm:bg-[#3B854B] bg-transparent px-6 py-5 md:h-full md:w-20 md:px-0 md:py-4">
			<div class="flex h-full flex-row items-center gap-2 md:flex-col">
				<div class="h-full md:flex-grow">
					<!-- TODO: Refactor here -->

					{#if !data.user}
						<!-- <div class="aspect-square w-full rounded-full bg-red-500">no user</div> -->

						<button on:click={() => goto('/login')} class="group rounded-full">
							<div
								class="outline-solid flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 outline outline-0 outline-offset-0 outline-white transition-all duration-100 group-hover:outline-2 group-hover:outline-offset-4"
							>
								<SignIn
									weight="bold"
									class="h-6 w-6 fill-neutral-800 transition-all duration-100  group-hover:h-7 group-hover:w-7"
								/>
							</div>
						</button>
					{:else}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<Logoutdrawer username={data.user.name} email={data.user.email}>
							<div slot="content" class="grid items-start gap-4">
								<Button variant="outline">Settings</Button>
								<form action="/logout" method="POST" class="w-full">
									<Button type="submit" variant="destructive" class="w-full">Logout</Button>
								</form>
							</div>

							<span slot="trigger">
								<button
									class="outline-solid flex items-center justify-center rounded-full outline outline-2 outline-offset-0 outline-white transition-all duration-100 hover:outline-4 hover:outline-offset-4"
									on:click={() => {
										toggleDialog;
									}}
								>
									<Avatar username={data.user.name} url={avatar_url} />
								</button>
							</span>
						</Logoutdrawer>
					{/if}
				</div>
				<h1
					class=" hidden flex-grow origin-center font-header text-4xl font-bold dark:text-white md:block md:flex-grow-0 md:-translate-y-20 md:-rotate-90"
				>
					Dashboard
				</h1>

				<div class="block md:hidden ">
					{#if data.user}
					<h1 class="font-montserrat text-xs leading-3 font-semibold text-neutral-200">Welcome back,</h1>
					<h1 class="font-montserrat text-base font-bold">{data.user.name}</h1>
					{/if}
				</div>

				<div class="flex w-full justify-end">
					<button
						class="transition-all flex h-11 w-11 items-center justify-center rounded-full border-0 border-solid  border-neutral-200 duration-100 active:border-4 md:hidden"
					>
						<HardDrives weight="duotone" class="h-6 w-6 fill-neutral-300" />
					</button>
				</div>
			</div>
		</div>
		<div id="sidebar-content" class="flex-grow ">
			<div class="flex flex-col gap-3">
				<div class="md:bg-transparent  px-6 py-5 flex flex-col gap-5 rounded-b-lg" id="primary-widgets">
					<h1 class="text-white font-chivomono font-bold text-3xl">Dashboard</h1>
					<!-- TODO: make it dynamic to page name -->
					
					<Clock />

				<div class="flex flex-col gap-1">
					<Label>Network</Label>
					<Networklist></Networklist>
				</div>
				</div>
			</div>
		</div>
	</div>
	{/if}
	<div>
		<slot />
	</div>
</div>
