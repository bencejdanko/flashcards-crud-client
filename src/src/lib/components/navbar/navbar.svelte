<script lang="ts">
    import * as Menubar from "$lib/components/ui/menubar";

    import { pb, currentUser } from "$lib/pb";


    import { onMount } from "svelte";

    onMount(async () => {
        
    });

</script>

<Menubar.Root class="rounded-none">
    <Menubar.Menu>
        <Menubar.Trigger><strong>Learner</strong></Menubar.Trigger>
        <Menubar.Content>
            <Menubar.Item>About Learner</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Account Settings</Menubar.Item>
            <Menubar.Item>
                <button
                    on:click={() => {
                        pb.authStore.clear();
                    }}
                >Sign out</button>
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Landing Page</Menubar.Item>
        </Menubar.Content>
    </Menubar.Menu>

    <Menubar.Menu>
        <Menubar.Trigger>Decks</Menubar.Trigger>
        <Menubar.Content>
            <Menubar.Item>
                New Deck
                <Menubar.Shortcut>Shift-Ctrl-N</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator />
        </Menubar.Content>
    </Menubar.Menu>

    <Menubar.Menu>
        <Menubar.Trigger>Help</Menubar.Trigger>
        <Menubar.Content>
            <Menubar.Item>Documentation</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Feedback</Menubar.Item>
            <Menubar.Item>Support</Menubar.Item>
        </Menubar.Content>
    </Menubar.Menu>
</Menubar.Root>