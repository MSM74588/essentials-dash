<script lang="ts">
    // import Check from "svelte-radix/Check.svelte";
    // import CaretSort from "svelte-radix/CaretSort.svelte";

    import { Check , CaretUpDown} from 'phosphor-svelte'
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
    import { tick } from "svelte";
   
    const networks = [
      {
        value: "Localnetwork",
        label: "LocalNetwork"
      },
      {
        value: "next.js",
        label: "Tailscale"
      },
      {
        value: "nuxt.js",
        label: "Cloudflare"
      },
      {
        value: "remix",
        label: "Example.com"
      },
      {
        value: "192.168.0.105",
        label: "192.168.0.105"
      }
    ];
   
    let open = false;
    let value = "";
   
    $: selectedValue =
      networks.find((f) => f.value === value)?.label ?? "192.168.0.105 demo";
      // TODO: Later change the ip to bind to global network variable/store/context
   
    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger(triggerId: string) {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus();
      });
    }
  </script>
   
  <Popover.Root bind:open let:ids>
    <Popover.Trigger class="p-0" asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between rounded-lg"
      >
        {selectedValue}
        <CaretUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[16vw] p-0">
      <Command.Root>
        <Command.Input placeholder="Search network..." class="h-9" />
        <Command.Empty>No network found.</Command.Empty>
        <Command.Group>
          {#each networks as network}
            <Command.Item
              value={network.value}
              onSelect={(currentValue) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <Check
                class={cn(
                  "mr-2 h-4 w-4",
                  value !== network.value && "text-transparent"
                )}
              />
              {network.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>