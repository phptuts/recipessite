import { writable } from 'svelte/store';

const authStore = writable<{
	isLoggedIn: boolean;
	firebaseControlled: boolean;
	userId?: string;
}>({ isLoggedIn: false, firebaseControlled: false });

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};
