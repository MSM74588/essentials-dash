<script>
    // export data;
    export let form;

    console.log(form)

    let image_url = "https://images.unsplash.com/photo-1552564835-07e1379e9708"
    let css_image_string = `url(${image_url})`
    // let image_url = ""
    // $: image_class = image_url ? 'image_url_class' : '';

    
</script>

<div class="h-dvh w-dvw  bg-neutral-950 dark:text-white md:py-5 md:px-5">
	<div class=" flex-row flex w-full h-full rounded-lg md:border md:border-1 border-neutral-600 divide-solid divide-neutral-600 md:divide-x-[1px]">
        <div class="hidden md:block flex-grow bg-neutral-800 rounded-l-lg overflow-clip image-area image_area_url" style="--image-url: {css_image_string}">
            
        </div>
	<div class="flex md:w-[40%] scale-75 md:scale-100 p-4 items-center justify-center">
			

            <form action="?/login" method="POST" class="flex flex-col items-center gap-y-5 lg:px-[25%]">
                
                <h1 class="font-montserrat text-3xl font-bold">Log into your dashboard</h1>
			<h2 class="font-montserrat text-sm font-semibold text-zinc-300">
				Welcome! Please enter your login details below to access your dashboard.
			</h2>


            <div class="flex flex-col gap-1 w-full" >
                <label class="text-sm">Username:</label>
                <input name="email" value={form?.email ?? ''} class="bg-transparent rounded-md py-2 px-4 text-base focus:outline-2 outline outline-1 outline-neutral-700 focus:outline-neutral-200 transition-all duration-100" type="text">
                
            </div>

            <div class="flex flex-col gap-1 w-full" >
                <label class="tex t-sm">Password:</label>
                <input name="password" class="bg-transparent rounded-md py-2 px-4 text-base focus:outline-2 outline outline-1 outline-neutral-700 focus:outline-neutral-200 transition-all duration-100" type="password">
            </div>

            {#if form?.missing}<p class="error bg-red-600">{form?.message}</p>{/if}
            {#if form?.incorrect}<p class="error bg-pink-600">{form?.message}</p>{/if}

			<div class="w-full pt-3">
				<button type="submit" class="px-4 py-2 bg-neutral-200 rounded-md w-full dark:text-black text-base hover:bg-neutral-300 transition-all duration-100 disabled:bg-neutral-400">Log In</button>
			</div>
            </form>
	
	</div>
    </div>
</div>

<style>
    .image-area{
        background: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .image_area_url {
        background-image: var(--image-url)
    }
</style>
