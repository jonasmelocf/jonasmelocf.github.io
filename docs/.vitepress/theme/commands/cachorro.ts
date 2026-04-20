export const cachorro = async () => {
	const el = document.createElement("img");
	const src = `https://place.dog/300/200?cache=${Date.now() + ((Math.random() * 123) | 0)}`;
	return new Promise<string>((resolve) => {
		el.onload = () => resolve(el.outerHTML);
		el.src = src;
	});
};
