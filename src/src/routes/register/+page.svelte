<script>
    import * as Card from "$lib/components/ui/card/";
    import { Button } from "$lib/components/ui/button/";
    import { Input } from "$lib/components/ui/input/";

    import { pb } from "$lib";

    let email = "";
    let password = "";
    let passwordConfirm = "";

    let response = "";

    async function register() {
        console.log(email, password, passwordConfirm);
        const pb_response = await pb.collection("users").create({
            email,
            password,
            passwordConfirm,
        });

        response = JSON.stringify(pb_response, null, 2);
    }
</script>

<Card.Root class="m-10 p-10">
    <Card.Header>
        <Card.Title>Register a new account</Card.Title>
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
        <Input
            class="mt-2"
            id="passwordConfirm"
            placeholder="confirm password"
            type="password"
            bind:value={passwordConfirm}
        />

        <div class="p-2">{response}</div>
    </Card.Content>

    <Card.Footer class="flex justify-between">
        <Button on:click={register}>Register</Button>
        <p>
            Already have an account?
            <a href="/login"><strong>login</strong></a>
        </p>
    </Card.Footer>
</Card.Root>
