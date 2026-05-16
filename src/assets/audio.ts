import { Howl } from "howler";

export const audio = {
	pop: new Howl({ src: "/pop.mp3", volume: 0.4 }),
	lockOpen: new Howl({ src: "/lock_open.mp3", volume: 0.4 }),
	lockOpening: new Howl({ src: "/lock_opening.mp3", volume: 0.6, rate: 2.56 }),
};
