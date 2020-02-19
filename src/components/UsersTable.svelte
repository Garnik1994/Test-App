<script>
    import {navigate} from "svelte-routing";
    import { userNameStore } from '../stores/userStore.js';
    export let users;

    function navigateToUserDetails(user) {
        userNameStore.update(() => user.name);
        navigate(`/user-details?userId=${user.id}`);
    }
</script>
<style>
    .pointer {
        cursor: pointer;
    }
</style>
<table class="highlight">
    <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
    </tr>
    </thead>
    <tbody>
    {#each users as user}
        <tr on:click={() => navigateToUserDetails(user)} class="pointer">
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
        </tr>
    {/each}
    </tbody>
</table>
