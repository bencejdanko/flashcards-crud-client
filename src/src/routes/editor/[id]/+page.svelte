<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { pb, currentUser } from "$lib/pb";
    import { Navbar } from "$lib/components/navbar/";
    import { Input } from "$lib/components/ui/input/";

    import CodeMirror from "svelte-codemirror-editor";
    
    let id: string;
    let deck: DeckModel;
    let card: CardModel;
    let cards: CardModel[];
    let cardJson: string;
    let value = '';

    let questionDiv: HTMLDivElement;

    interface DeckModel {
        id: string;
        name: string;
        user: any;
        cards: string;
        created: Date;
        updated: Date;
    }

    interface CardModel {
        question: string;
        answer: string;
        explanation: string;
        created: Date;
        updated: Date;
    }
    onMount(() => {
        id = $page.params.id;

        async function getDeck() {
            deck = (await pb.collection("decks").getOne(id)) as DeckModel;

            if (deck.cards === null) {
                card = {
                    question: "<h1>Hello world</h1>",
                    answer: "Default answer",
                    explanation: "Default explanation",
                    created: new Date(),
                    updated: new Date(),
                };

                cardJson = JSON.stringify(card, null, 2);

                return;
            }
            card = JSON.parse(deck.cards[0]) as CardModel;
            cardJson = JSON.stringify(card, null, 2);
        }

        getDeck();
    });
</script>

<div class="h-screen flex flex-col">
    <Navbar />

    <div class="grid grid-cols-2 flex grow">
        {#if deck}
            <div class="flex grow">
                <div class="flex flex-col grow">
                    <Input
                        class="text-lg font-bold rounded-none"
                        bind:value={deck.name}
                    />
                    <div class="flex grow">
                        <Tabs.Root value="question" class="flex flex-col grow">
                            <Tabs.List class="w-full rounded-none m-0">
                                <Tabs.Trigger value="question"
                                    >Question</Tabs.Trigger
                                >
                                <Tabs.Trigger value="answer"
                                    >Answer</Tabs.Trigger
                                >
                                <Tabs.Trigger value="explanation"
                                    >Explanation</Tabs.Trigger
                                >
                                <Tabs.Trigger value="json">JSON</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="question" class="grow m-0">
                                <CodeMirror bind:value={card.question} />
                            </Tabs.Content>

                            <Tabs.Content value="answer" class="grow m-0">
                                <CodeMirror bind:value={card.answer} />
                            </Tabs.Content>

                            <Tabs.Content value="explanation" class="grow m-0">
                                <CodeMirror bind:value={card.explanation} />
                            </Tabs.Content>

                            <Tabs.Content value="json" class="grow m-0">
                                <CodeMirror bind:value={cardJson} />
                            </Tabs.Content>


                        </Tabs.Root>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .textarea {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>
