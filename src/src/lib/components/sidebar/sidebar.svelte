
<script lang="ts">
    import Card from "$lib/components/ui/card/card.svelte";

    import { Plus } from "lucide-svelte";

    import { pb, currentUser } from "$lib/pb";
    import { goto } from "$app/navigation";

    async function createNewDeck() {

        if (!$currentUser) {
            return;
        }

        const deck = await pb.collection("decks").create({
            name: "new deck",
            user: $currentUser.id,
        });

        goto(`/editor/${deck.id}`);
    }
</script>

<Card
    class="fixed top-10 rounded-none left-0 w-[200px] h-full bg-secondary pt-10"
>
    <button
        on:click={() => {
            createNewDeck();
        }}
    >
        <Card
            class="hover:bg-secondary flex items-center justify-center p-10 aspect-square m-10"
        >
            <Plus />
        </Card>
    </button>
</Card>
