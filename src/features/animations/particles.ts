import { random } from "@/lib/utils";

export function playParticles(amount = 8, opts: Opts) {
	const promises: Promise<Animation>[] = [];
	for (let i = 0; i < amount; i++) {
		promises.push(playParticle(opts));
	}
	return Promise.all(promises);
}

type Opts = {
	z?: number | string;
	text?: string;
	size?: number;
	spread?: number;
	background?: string;
	width?: number;
	height?: number;
	duration?: number;
} & (
	| {
			x: number;
			y: number;
	  }
	| {
			el: Element;
	  }
);
export function playParticle(opts: Opts) {
	opts.text ??= opts.background ? undefined : "❤️";
	opts.spread ??= opts.size ?? 64;
	opts.duration ??= 1000;

	const p = document.createElement("div");
	p.style.position = "absolute";
	p.style.background = opts.background ?? "";
	p.style.backgroundPosition = "center";
	p.style.backgroundRepeat = "no-repeat";
	p.style.backgroundSize = "cover";
	p.style.width = opts.size || opts.width ? `${opts.size ?? opts.width}px` : "";
	p.style.height =
		opts.size || opts.height ? `${opts.size ?? opts.height}px` : "";
	p.style.zIndex = opts.z ? String(opts.z) : "40";
	p.style.userSelect = "none";
	p.style.pointerEvents = "none";
	p.style.fontSize = opts.size ? `${opts.size}px` : "";
	p.textContent = opts.text ?? null;

	// p.getBoundingClientRect() only works if the element is in the DOM
	document.body.prepend(p);

	const pRect = p.getBoundingClientRect();

	const sizeX = pRect.width;
	const sizeY = pRect.height;

	const startingPos = { x: 0, y: 0 };

	if ("el" in opts) {
		const elRect = opts.el?.getBoundingClientRect();
		startingPos.x = elRect.x + elRect.width / 2 - sizeX / 2;
		startingPos.y = elRect.y + elRect.height / 2 - sizeY / 2;
	} else {
		startingPos.x = opts.x - sizeX / 2;
		startingPos.y = opts.y - sizeY / 2;
	}

	const finalPos = {
		x: startingPos.x + random(-opts.spread, opts.spread),
		y: startingPos.y + random(-opts.spread, opts.spread),
	};

	const animation = p.animate(
		[
			{
				top: `${startingPos.y}px`,
				left: `${startingPos.x}px`,
				opacity: "100%",
				rotate: `${random(0, 360)}deg`,
			},
			{
				top: `${finalPos.y}px`,
				left: `${finalPos.x}px`,
				opacity: "0%",
				rotate: `${random(0, 360)}deg`,
			},
		],
		{ duration: opts.duration, easing: "ease-out" },
	);

	animation.addEventListener("finish", () => p.remove());

	return animation.finished;
}
