import { audio } from "@/assets/audio";

type Opts = {
	duration?: number;
	range?: number;
	brightnessEnd?: number;
	scaleEnd?: number;
};
export async function playLockOpen(el: Animatable, opts: Opts = {}) {
	opts.duration ??= 1300;
	opts.range ??= 3;
	opts.brightnessEnd ??= 0.6;
	opts.scaleEnd ??= 1.08;

	const shakingKeyframes: Keyframe[] = [{ filter: "brightness(1)", scale: 1 }];
	for (let i = 0; i < 1600 / 32; i++) {
		const pos = normalize(Math.random() * 2 - 1, Math.random() * 2 - 1);
		pos.x *= opts.range;
		pos.y *= opts.range;
		shakingKeyframes.push({ translate: `${pos.x}px ${pos.y}px` });
	}

	shakingKeyframes.push({
		filter: `brightness(${opts.brightnessEnd})`,
		scale: opts.scaleEnd,
	});
	audio.lockOpening.play();
	return el
		.animate(shakingKeyframes, { easing: "ease-in", duration: 1024 })
		.finished.then((animation) => {
			audio.lockOpening.stop();
			audio.lockOpen.play();
			return animation;
		});
}

function normalize(x: number, y: number) {
	const h = Math.hypot(x, y);
	return { x: x / h, y: y / h };
}
