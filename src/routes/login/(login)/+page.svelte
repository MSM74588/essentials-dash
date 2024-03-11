<script>
	import { onMount } from 'svelte';
	// export data;
	export let form;

	console.log(form);

	let image_url = 'https://images.unsplash.com/photo-1552564835-07e1379e9708';
	let css_image_string = `url(${image_url})`;
	// let image_url = ""
	// $: image_class = image_url ? 'image_url_class' : '';

	import { Toaster, toast } from 'svelte-sonner';

    onMount(
        () => {
            if (form?.missing){
                toast.warning(form?.missing)
            }

            if (form?.incorrect) {
                toast.error(form?.incorrect)
            }

        }
    )
</script>

<Toaster />

<div class="h-dvh w-dvw bg-neutral-950 dark:text-white md:px-5 md:py-5">
	<div
		class=" md:border-1 flex h-full w-full flex-row divide-solid divide-neutral-600 rounded-lg border-neutral-600 md:divide-x-[1px] md:border"
	>
		<div
			class="image-area image_area_url hidden flex-grow overflow-clip rounded-l-lg bg-neutral-800 md:block"
			style="--image-url: {css_image_string}"
		></div>
		<div class="flex scale-75 items-center justify-center p-4 md:w-[40%] md:scale-100">
			<form action="?/login" method="POST" class="flex flex-col items-center gap-y-5 lg:px-[25%]">
				<h1 class="font-montserrat text-3xl font-bold">Log into your dashboard</h1>
				<h2 class="font-montserrat text-sm font-semibold text-zinc-300">
					Welcome! Please enter your login details below to access your dashboard.
				</h2>

				<div class="flex w-full flex-col gap-1">
					<label class="text-sm">Username:</label>
					<input
						name="email"
						value={form?.email ?? ''}
						class="rounded-md bg-transparent px-4 py-2 text-base outline outline-1 outline-neutral-700 transition-all duration-100 focus:outline-2 focus:outline-neutral-200"
						type="text"
					/>
				</div>

				<div class="flex w-full flex-col gap-1">
					<label class="tex t-sm">Password:</label>
					<input
						name="password"
						class="rounded-md bg-transparent px-4 py-2 text-base outline outline-1 outline-neutral-700 transition-all duration-100 focus:outline-2 focus:outline-neutral-200"
						type="password"
					/>
				</div>

                <!-- TODO -->
				{#if form?.missing}<p class="error bg-red-600">{form?.missing}</p>{/if}
				{#if form?.incorrect}<p class="error bg-pink-600">{form?.incorrect}</p>{/if}

				<div class="w-full pt-3">
					<button
						type="submit"
						class="w-full rounded-md bg-neutral-200 px-4 py-2 text-base transition-all duration-100 hover:bg-neutral-300 disabled:bg-neutral-400 dark:text-black"
						>Log In</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.image-area {
		background: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.image_area_url {
		background-image: var(--image-url);
	}
</style>
