<script>
	import Clock from '$lib/components/widgets/clock.svelte';
	export let data;

	import Avatar from '$lib/components/dashboard/avatar.svelte';

	import Logoutdrawer, { toggleDialog } from '$lib/components/dashboard/logoutdrawer.svelte';
	import { Button } from '$lib/components/ui/button';

	import {Label} from '$lib/components/ui/label';

	import Networklist from '$lib/components/dashboard/networklist.svelte';

	let avatar_url = 'https://avatars.githubusercontent.com/u/48552989?v=4';
	// let avatar_url = '';

	// import { createDropdownMenu, melt } from '@melt-ui/svelte';
	// import Button from '$lib/components/ui/button/button.svelte';
	// const {
	// 	elements: { menu, item, trigger, arrow }
	// } = createDropdownMenu();
</script>


<div class="flex h-screen w-screen flex-row bg-neutral-900">
	<div class="flex h-full w-[450px] flex-row bg-neutral-800">
		<div id="header" class="h-full w-20 bg-[#3B854B] py-4">
			<div class="flex h-full flex-col items-center">
				<div class="h-full flex-grow">
					<div>
						<!-- TODO: Refactor here -->

						{#if !data.user}
							<div class="aspect-square w-full rounded-full bg-red-500">no user</div>
						{:else}
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<Logoutdrawer username={data.user.name} email={data.user.email}>
								<div slot="content" class="grid items-start gap-4">
									<Button variant="ghost">Settings</Button>
									<form action="/logout" method="POST" class="w-full">
										<Button type="submit" variant="destructive" class="w-full">Logout</Button>
									</form>
								</div>

								<span slot="trigger">
									<button
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
				</div>
				<h1
					class=" origin-center -translate-y-20 -rotate-90 font-header text-4xl font-bold dark:text-white"
				>
					Dashboard
				</h1>
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
