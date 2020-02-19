<script>
    import {onMount} from 'svelte';
    import {API_URL, USERS_PAGE_LIMIT} from '../common/constants';
    import UsersTable from "../components/UsersTable.svelte";
    import Loading from "../components/Loading.svelte";

    let users = [],
        totalCount = 0,
        currentPage = localStorage.getItem('current_page') ? parseInt(localStorage.getItem('current_page')) : 1,
        hasPreviousPage = false,
        isLoading = false,
        hasNextPage = true;

    onMount(async () => {
        await getUsersList(currentPage);
    });

    async function getUsersList(page) {
        try {
            isLoading = true;
            const result = await fetch(API_URL + `/users?_page=${page}&_limit=${USERS_PAGE_LIMIT}`);
            users = await result.json();
            localStorage.setItem('current_page', page);
            totalCount = result.headers.get('x-total-count');
            if (page * USERS_PAGE_LIMIT >= totalCount) {
                hasNextPage = false;
            } else {
                hasNextPage = true;
            }
            if (page > 1) {
                hasPreviousPage = true;
            } else {
                hasPreviousPage = false;
            }
            isLoading = false;
        } catch (error) {

        }

    }

    async function goToFirstPage() {
        if (hasPreviousPage) {
            currentPage = 1;
            await getUsersList(currentPage);
        }
    }

    async function goToPreviousPage() {
        if (hasPreviousPage) {
            currentPage = currentPage - 1;
            await getUsersList(currentPage);
        }
    }

    async function goToNextPage() {
        if (hasNextPage) {
            currentPage = currentPage + 1;
            await getUsersList(currentPage);
        }
    }

    async function goToLastPage() {
        if (hasNextPage) {
            currentPage = Math.ceil(totalCount / USERS_PAGE_LIMIT);
            await getUsersList(currentPage);
        }
    }
</script>
{#if isLoading}
    <Loading/>
{/if}
<div>
    <UsersTable users={users}/>
    <ul class="pagination">
        <li class={hasPreviousPage ? 'waves-effect' : 'disabled'}>
            <a href="#!" on:click={() => goToFirstPage()}><i class="material-icons">first_page</i></a>
        </li>
        <li class={hasPreviousPage ? 'waves-effect' : 'disabled'}>
            <a href="#!" on:click={() => goToPreviousPage()}><i class="material-icons">chevron_left</i></a>
        </li>
        <li class="active"><a href="#!">{currentPage}</a></li>
        <li class={hasNextPage ? 'waves-effect' : 'disabled'}>
            <a href="#!" on:click={() => goToNextPage()}><i class="material-icons">chevron_right</i></a>
        </li>
        <li class={hasNextPage ? 'waves-effect' : 'disabled'}>
            <a href="#!" on:click={() => goToLastPage()}><i class="material-icons">last_page</i></a>
        </li>
    </ul>
</div>
