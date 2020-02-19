<script>
    import {onMount} from 'svelte';
    import queryString from 'query-string';
    import {API_URL} from '../common/constants';
    import {userNameStore} from '../stores/userStore.js';
    import Loading from "../components/Loading.svelte";
    import TodoList from "../components/TodoList.svelte";

    let userTodoList = [];
    let userName = '';
    let isLoading = true;

    onMount(async () => {
        let queryParams = {};

        if (typeof window !== 'undefined') {
            queryParams = queryString.parse(window.location.search);
        }

        const result = await fetch(API_URL + `/todos?userId=${queryParams.userId}`);
        userTodoList = await result.json();
        isLoading = false;
    });

    const unsubscribe = userNameStore.subscribe(value => {
        userName = value;
    });
</script>

<div>
    {#if userTodoList.length === 0}
        <Loading/>
    {:else}
        <TodoList userName={userName} todoList={userTodoList}/>
    {/if}
</div>
