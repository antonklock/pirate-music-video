<script lang="ts">
	import { onMount } from 'svelte';
	import { initPixiApp } from '$lib/pixijs/PixiSetup';
	import { auth, storage } from '$lib/firebase';
	import { signInAnonymously, signOut, type UserCredential } from 'firebase/auth';
	import { ref, getDownloadURL, type StorageReference } from 'firebase/storage';

	let fileRef: StorageReference;
	let downloadURL: string;

	let videoFileRef: StorageReference;
	let videoDownloadURL: string;

	let container: HTMLDivElement;

	onMount(async () => {
		const filePath = 'gs://pirate-music-video.appspot.com/test-images/dcop_logo_02.png';
		const videoFile = 'gs://pirate-music-video.appspot.com/test-videos/main.mp4';
		fileRef = ref(storage, filePath);
		videoFileRef = ref(storage, videoFile);

		try {
			downloadURL = await getDownloadURL(fileRef);
			videoDownloadURL = await getDownloadURL(videoFileRef);
			console.log('Download URL:', downloadURL);
			// await initPixiApp(container, { logo: downloadURL });
		} catch (error) {
			console.error('Error getting download URL:', error);
		}

		await initPixiApp(container, { logo: downloadURL, video1: videoDownloadURL });
	});

	let userCredential: UserCredential;

	async function handleAnonymousLogin() {
		try {
			userCredential = await signInAnonymously(auth);
		} catch (error) {
			console.error('Anonymous login error:', error);
			// Handle the error appropriately
		}
	}

	function handleSignOut() {
		signOut(auth);
	}
</script>

<div class="flex flex-col items-center justify-center bg-slate-800">
	<h1 class="text-white">Welcome to SvelteKit</h1>

	<div bind:this={container}></div>

	{#if userCredential}
		<div class="text-white">
			<p>Logged in as {userCredential.user.uid}</p>
			<button on:click={handleSignOut}>Logout</button>
		</div>
	{:else}
		<div class="text-white">
			<button type="button" class="variant-filled btn" on:click={handleAnonymousLogin}>Login</button
			>
			<button type="button" class="variant-filled btn">Button</button>

			<p>Not logged in</p>
		</div>
	{/if}
</div>
