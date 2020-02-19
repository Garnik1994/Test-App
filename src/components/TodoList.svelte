<script>
    export let userName;
    export let todoList;
</script>

<ul class="collection with-header">
    <li class="collection-header"><h4>{userName}</h4></li>
    {#each todoList as todo}
        <li class="collection-item">
            <div>
                {todo.title}
                <div class="secondary-content">
                    {#if todo.completed}
                        <i class="material-icons">star</i>
                    {:else}
                        <i class="material-icons">star_border</i>
                    {/if}
                </div>
            </div>
        </li>
    {/each}
</ul>
