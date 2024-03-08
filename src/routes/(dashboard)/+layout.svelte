<script>
	import { SignIn , SidebarSimple} from 'phosphor-svelte'
	
	import Clock from '$lib/components/widgets/clock.svelte';
	export let data;

	import Avatar from '$lib/components/dashboard/avatar.svelte';

	import Logoutdrawer, { toggleDialog } from '$lib/components/dashboard/logoutdrawer.svelte';
	import { Button } from '$lib/components/ui/button';

	import {Label} from '$lib/components/ui/label';

	import Networklist from '$lib/components/dashboard/networklist.svelte';
	import { goto } from '$app/navigation';

	let avatar_url = 'https://avatars.githubusercontent.com/u/48552989?v=4';
	// let avatar_url = '';

	// import { createDropdownMenu, melt } from '@melt-ui/svelte';
	// import Button from '$lib/components/ui/button/button.svelte';
	// const {
	// 	elements: { menu, item, trigger, arrow }
	// } = createDropdownMenu();
</script>


<div class="flex h-dvh w-dvw flex-row bg-neutral-900">
	<div class="flex h-full w-[450px] flex-col md:flex-row bg-neutral-800">
		<div id="header" class="md:h-full w-full md:w-20 bg-[#3B854B] px-3 md:px-0 py-2 md:py-4">
			<div class="flex h-full flex-row md:flex-col items-center gap-2">
				<div class="h-full md:flex-grow">
					
						<!-- TODO: Refactor here -->

						{#if !data.user}
							<!-- <div class="aspect-square w-full rounded-full bg-red-500">no user</div> -->
							
								<button on:click={() => goto('/login')} class="rounded-full group">
									<div class="bg-neutral-200 h-12 w-12 rounded-full flex items-center justify-center  outline outline-0 outline-solid group-hover:outline-2 outline-white outline-offset-0 group-hover:outline-offset-4  transition-all duration-100">
										<SignIn weight="bold" class="fill-neutral-800 h-6 w-6 group-hover:w-7 group-hover:h-7  transition-all duration-100"/>
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
									<button class="flex items-center justify-center outline outline-2 outline-solid hover:outline-4 outline-white outline-offset-0 hover:outline-offset-4  transition-all duration-100 rounded-full"
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
					class=" origin-center md:-translate-y-20 md:-rotate-90 font-header text-4xl font-bold dark:text-white flex-grow md:flex-grow-0"
				>
					Dashboard
				</h1>
				<button class="md:hidden h-11 w-11 flex items-center justify-center border-2 border-neutral-200 border-solid  rounded-lg active:border-4 transition-ALL duration-100 ">
					<SidebarSimple weight="bold" class="h-6 w-6"/>
				</button>
			</div>
		</div>
		<div id="sidebar-content" class="flex-grow px-6 py-5">
			<div class="flex flex-col gap-3">
				<Clock />

			<div class="flex flex-col gap-1">
				<Label>Network</Label>
				<Networklist></Networklist>
			</div>
			</div>
		</div>
	</div>
	<div>
		<slot />
	</div>
</div>
