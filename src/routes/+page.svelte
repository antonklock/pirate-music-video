<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	onMount(async () => {
		const PIXI = await import('pixi.js');
		let type = 'WebGL';
		if (!PIXI.utils.isWebGLSupported()) {
			type = 'canvas';
		}

		const app = new PIXI.Application({ width: 256, height: 256, backgroundColor: 0x1099bb });
		container.appendChild(app.view as HTMLCanvasElement);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div bind:this={container}></div>
