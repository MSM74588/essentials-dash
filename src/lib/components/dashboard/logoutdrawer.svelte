<script context="module">
    let open = false;
    


	export function toggleDialog() {
		if (!open) {
			open = true;
		} else {
			open = false;
		}
	}
</script>

<script>
	import * as Dialog from '$lib/components/ui/dialog/index.ts';
	// @ts-ignore
	import * as Drawer from '$lib/components/ui/drawer/index.ts';
	import { Label } from '$lib/components/ui/label/index.ts';
	import { Button } from '$lib/components/ui/button/index.ts';
	import { mediaQuery } from 'svelte-legos';
	const isDesktop = mediaQuery('(min-width: 768px)');

    export let username = "User"
    export let email = "example@example.com"
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger>
            <slot />
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Hello!, {username}</Dialog.Title>
				<Dialog.Description>
					{email}
				</Dialog.Description>
			</Dialog.Header>
			
			<slot name="content" />
			
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<slot />
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>{username}</Drawer.Title>
				<Drawer.Description>
					{email}
				</Drawer.Description>
			</Drawer.Header>
			<div class="grid items-start gap-4 px-4">
                <slot name="content" />
            </div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
