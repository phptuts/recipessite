<script lang="ts">
	import firebase from 'firebase/app';
	import 'firebase/analytics';
	import 'firebase/auth';
	import 'firebase/firestore';
	import { onMount } from 'svelte';
	import authStore from '../store/authStore';
	import Nav from '../components/Nav.svelte';

	onMount(async () => {
		const firebaseConfig = {
			apiKey: 'AIzaSyD5p9J1bkYxy3MmIvfZs2t8Gteuv3N8ZgY',
			authDomain: 'noahvideos.firebaseapp.com',
			databaseURL: 'https://noahvideos.firebaseio.com',
			projectId: 'noahvideos',
			storageBucket: 'noahvideos.appspot.com',
			messagingSenderId: '826072574665',
			appId: '1:826072574665:web:5fba0d78af6f3c33ddfb18',
			measurementId: 'G-3E412V3TGW'
		};

		firebase.initializeApp(firebaseConfig);

		firebase.auth().onAuthStateChanged((user) => {
			if (user !== null && user !== undefined) {
				authStore.set({ isLoggedIn: true, firebaseControlled: true, userId: user.uid });
				return;
			}

			authStore.set({ isLoggedIn: false, firebaseControlled: true });
		});
	});
</script>

<Nav />
<div class="container">
	<slot />
</div>
