import { audio } from "@/assets/audio";

type Opts = {
	scale?: number;
	brightness?: number;
	audio?: boolean;
	audioRate?: number;
};
export function playPop(el: Animatable, opts: Opts = {}) {
	opts.scale ??= 1.05;
	opts.brightness ??= 1.8;
	opts.audio ??= true;
	opts.audioRate ??= 1;

	if (opts.audio) {
		audio.pop.rate(opts.audioRate);
		audio.pop.play();
	}

	return el.animate(
		[
			{ transform: "scale(1)", filter: "brightness(1)" },
			{
				transform: `scale(${opts.scale})`,
				filter: `brightness(${opts.brightness})`,
			},
			{ transform: "scale(1)", filter: "brightness(1)" },
		],
		{
			duration: 300,
			easing: "ease-out",
		},
	).finished;
}
