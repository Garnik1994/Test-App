import { writable } from 'svelte/store';
// In my opinion we need an api that returns the user by id
export const userNameStore = writable('');
