

<script>
	// @ts-ignore
	import * as Dialog from '$lib/components/ui/dialog/index.ts';
	// @ts-ignore
	import * as Drawer from '$lib/components/ui/drawer/index.ts';
	// @ts-ignore
	import { Label } from '$lib/components/ui/label/index.ts';
	// @ts-ignore
	import { Button } from '$lib/components/ui/button/index.ts';

	import { mediaQuery } from 'svelte-legos';
	const isDesktop = mediaQuery('(min-width: 768px)');



	import { Palette } from 'phosphor-svelte'
	

	export function toggleThemeDialog() {
		console.log("Theme dialogopen Function ran")

		dialogopen = !dialogopen

		console.log(dialogopen)
	}

	let dialogopen = false;
</script>

<!-- <button on:click={() => (dialogopen = true)}>Open Dialog</button> -->

<button on:click={() => (dialogopen = true)}
						class="transition-all flex h-11 w-11 items-center justify-center rounded-full border-0 border-solid  border-muted-foreground duration-100 active:border-4 md:hidden"
					>
						<Palette weight="duotone" class="h-6 w-6 fill-text-secondary" />
					</button>

{#if $isDesktop}
	<Dialog.Root bind:open={dialogopen}>
		<Dialog.Trigger>
            <slot  name="trigger"/>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Pick Theme</Dialog.Title>
			</Dialog.Header>


			<Button>Theme 1</Button>
			
			
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open={dialogopen}>
		<Drawer.Trigger>
			<slot  name="trigger"/>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Pick Theme</Drawer.Title>
			</Drawer.Header>
			<div class="grid items-start gap-4 px-4">


                <Button on:click={() => {  document.querySelector("html")?.setAttribute("data-theme", "dracula"); }}>Dracula</Button>
				<Button on:click={() => {}}>Switch Dark/Light Mode</Button>


            </div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
