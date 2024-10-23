<script>
    import * as Card from "$lib/components/ui/card/";
    import { Button } from "$lib/components/ui/button/";
    import { Input } from "$lib/components/ui/input/";

    import { goto } from "$app/navigation";

    import { pb, currentUser } from "$lib/pb";

    let email = "";
    let password = "";

    let response = "";

    async function login() {
        const pb_response = await pb
            .collection("users")
            .authWithPassword(email, password);

        goto("/dashboard");

        response = JSON.stringify(pb_response, null, 2);
    }
</script>

{#if $currentUser}
    <p>Already logged in as {$currentUser.email}</p>
    <button
        on:click={() => {
            pb.authStore.clear();
        }}>Logout</button
    >
{:else}
    <Card.Root class="m-10 p-10">
        <Card.Header>
            <Card.Title>Login to your account</Card.Title>
            <Card.Description>Create your deck in seconds.</Card.Description>
        </Card.Header>

        <Card.Content>
            <Input
                class="mt-2"
                id="email"
                placeholder="example@example.com"
                bind:value={email}
            />
            <Input
                class="mt-2"
                type="password"
                id="password"
                placeholder="password"
                bind:value={password}
            />

            <div class="p-2">{response}</div>
        </Card.Content>

        <Card.Footer class="flex justify-between">
            <Button on:click={login}>Login</Button>
            <p>
                Don't have an account??
                <a href="/register"><strong>register</strong></a>
            </p>
        </Card.Footer>
    </Card.Root>
{/if}
