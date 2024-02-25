type PixiAppAssets = {
	logo: string;
	video1: string;
	video2: string;
}

export async function initPixiApp(container: HTMLDivElement, assets: PixiAppAssets) {
    const PIXI = await import('pixi.js');
    let type = 'WebGL';
	if (!PIXI.utils.isWebGLSupported()) {
		type = 'canvas';
	}
	console.log("Pixi.js is using " + type);

	const app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0x1099bb });
	
	//DCOP Icon
	const sprite = PIXI.Sprite.from(assets.logo);
	sprite.anchor.set(0.5);
	sprite.y = app.renderer.height / 2;
	sprite.scale = { x: 0.15, y: 0.15 };

	app.stage.addChild(sprite);

	// Testvideo
	const texture = PIXI.Texture.from(assets.video1);
	const texture2 = PIXI.Texture.from(assets.video2);
	const videoSprite = new PIXI.Sprite(texture);
	videoSprite.anchor.set(0.5);
	videoSprite.y = app.renderer.height / 2;
	videoSprite.x = app.renderer.width / 2;
	videoSprite.scale = { x: 0.5, y: 0.5 };

	videoSprite.eventMode = 'dynamic';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const videoElement = texture.baseTexture.resource.source;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const videoElement2 = texture2.baseTexture.resource.source;
	videoElement.loop = true;
	videoElement2.loop = true;

	videoSprite.onclick = () => {
		
		if (videoSprite.texture === texture2) {
			// videoElement.play();
			// console.log('playing');
			videoSprite.texture = texture;
		} else {
			// videoElement.pause();
			// console.log('paused');
			videoSprite.texture = texture2;
		}

		
	}

	


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