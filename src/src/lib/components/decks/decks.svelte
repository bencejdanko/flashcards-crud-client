<script lang="ts">
    import { Copy, Delete, Download, Edit, PlayIcon } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/";
    import * as Tooltip from "$lib/components/ui/tooltip";


    import { goto } from "$app/navigation";

    import { onMount } from "svelte";

    import { pb, currentUser } from "$lib/pb";

    let userDecks: any;

    onMount(async () => {
        userDecks = await pb.collection("decks").getFullList();
    });

</script>

{#if userDecks}
    <div class='flex flex-wrap'>
        {#each userDecks as deck}
            <Card.Root
                class="m-2 w-[150px] h-[200px] flex flex-col justify-between hover:bg-secondary"
            >
                <div class="p-3">
                    <Card.Title class="flex items-center"
                        >{deck.name}

                        <Tooltip.Root openDelay={100}>
                            <Tooltip.Trigger
                                ><Edit
                                    size={15}
                                    class="ml-2"
                                /></Tooltip.Trigger
                            >
                            <Tooltip.Content side="bottom">
                                <p>Rename</p>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </Card.Title>
                    <Card.Description
                        >{deck.cards ? deck.cards.length : "0"} cards</Card.Description
                    >
                    <p>See progress</p>
                </div>

                <div class="p-3">
                    <div class="flex justify-between">
                        <Tooltip.Root openDelay={100}>
                            <Tooltip.Trigger>
                                <button
                                    on:click={() => {
                                        console.log("register");
                                        goto(`editor/${deck.id}`);
                                    }}
                                >
                                    <PlayIcon size={20} />
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content side="bottom">
                                <p>Edit</p>
                            </Tooltip.Content>
                        </Tooltip.Root>

                        <Tooltip.Root openDelay={100}>
                            <Tooltip.Trigger><Copy size={20} /></Tooltip.Trigger
                            >
                            <Tooltip.Content side="bottom">
                                <p>Copy</p>
                            </Tooltip.Content>
                        </Tooltip.Root>

                        <Tooltip.Root openDelay={100}>
                            <Tooltip.Trigger
                                ><Download size={20} /></Tooltip.Trigger
                            >
                            <Tooltip.Content side="bottom">
                                <p>Download</p>
                            </Tooltip.Content>
                        </Tooltip.Root>

                        <Tooltip.Root openDelay={100}>
                            <Tooltip.Trigger
                                ><Delete size={20} /></Tooltip.Trigger
                            >
                            <Tooltip.Content side="bottom">
                                <p>Delete</p>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </div>
                </div>
            </Card.Root>
        {/each}
    </div>
{:else}
    <p>Loading...</p>
{/if}
