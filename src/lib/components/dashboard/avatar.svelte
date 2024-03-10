<script>
	// import { createAvatar, melt } from '@melt-ui/svelte';

	import * as Avatar from "$lib/components/ui/avatar";

	export let username = 'User Name';
	export let url = '';

	// const {
	// 	elements: { image, fallback }
	// } = createAvatar({
	// 	src: url,
	// 	delayMs: 650
	// });

	// With an exaggerated fallback delay
	// const {
	// 	elements: { image: imageA, fallback: fallbackA }
	// } = createAvatar({
	// 	src: 'https://avatars.githubusercontent.com/u/5968653?v=4',
	// 	delayMs: 650
	// });

	// // A blank source to demonstrate the fallback
	// const {
	// 	elements: { image: imageB, fallback: fallbackB }
	// } = createAvatar({
	// 	src: ''
	// });
</script>

<!-- <div class="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
	<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
	<span use:melt={$fallback} class="text-magnum-700 text-3xl font-medium">{username.split(' ').map(name => name[0]).join('').toUpperCase()}</span>
</div> -->

<Avatar.Root class="h-9 w-9 md:h-12 md:w-12">
	<Avatar.Image src={url} alt={username} srcset=""/>
	<Avatar.Fallback>{username.split(' ').map(name => name[0]).join('').toUpperCase()}</Avatar.Fallback>
  </Avatar.Root>