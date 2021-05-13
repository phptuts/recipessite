<script lang="ts">
	import firebase from 'firebase/app';
	import authStore from '../store/authStore';

	async function loginWithGoogle() {
		try {
			const provider = new firebase.auth.GoogleAuthProvider();

			await firebase.auth().signInWithPopup(provider);
		} catch (e) {
			console.log(e);
		}
	}
</script>

{#if !$authStore.isLoggedIn}
	<button on:click={loginWithGoogle}>Login with google</button>
{:else}
	<h1>You are logged in.</h1>
{/if}
