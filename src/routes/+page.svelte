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
		let sprite = PIXI.Sprite.from('/dcop_logo_01.png');
		sprite.anchor.set(0.5);
		sprite.y = app.renderer.height / 2;
		sprite.scale = { x: 0.15, y: 0.15 };

		app.stage.addChild(sprite);

		let elapsed = 0.0;
		app.ticker.add((delta) => {
			// Add the time to our total elapsed time
			elapsed += delta;
			// Update the sprite's X position based on the cosine of our elapsed time.  We divide
			// by 50 to slow the animation down a bit...
			sprite.x = 125.0 + Math.cos(elapsed / 25.0) * 50.0;
		});

		container.appendChild(app.view as HTMLCanvasElement);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div bind:this={container}></div>
