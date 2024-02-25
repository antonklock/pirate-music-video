type PixiAppAssets = {
	logo: string;
	video1: string;
}

export async function initPixiApp(container: HTMLDivElement, assets: PixiAppAssets) {
    const PIXI = await import('pixi.js');
    let type = 'WebGL';
	if (!PIXI.utils.isWebGLSupported()) {
		type = 'canvas';
	}
	console.log("Pixi.js is using " + type);

	const app = new PIXI.Application({ width: 256, height: 256, backgroundColor: 0x1099bb });
	
	//DCOP Icon
	const sprite = PIXI.Sprite.from(assets.logo);
	sprite.anchor.set(0.5);
	sprite.y = app.renderer.height / 2;
	sprite.scale = { x: 0.15, y: 0.15 };

	app.stage.addChild(sprite);

	// Testvideo
	const texture = PIXI.Texture.from(assets.video1);
	const videoSprite = new PIXI.Sprite(texture);
	videoSprite.anchor.set(0.5);
	videoSprite.y = app.renderer.height / 1.5;
	videoSprite.scale = { x: 0.15, y: 0.15 };

	app.stage.addChild(videoSprite);
	// texture.baseTexture.resource.source.play();

	let elapsed = 0.0;
	app.ticker.add((delta) => {
		// Add the time to our total elapsed time
		elapsed += delta;
		// Update the sprite's X position based on the cosine of our elapsed time.  We divide
		// by 50 to slow the animation down a bit...
		sprite.x = 125.0 + Math.cos(elapsed / 25.0) * 50.0;
	});

	container.appendChild(app.view as HTMLCanvasElement);
}