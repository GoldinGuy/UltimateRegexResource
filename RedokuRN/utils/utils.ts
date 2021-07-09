export function arrToGrid(arr: string[], n: number) {
	var a = [];
	for (var i = 0; i < arr.length; i += n) {
		a.push(arr.slice(i, i + n));
	}
	return a;
}

export function escapeChars(s: string) {
	if (s) return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	else return "";
};

export function coinFlip() {
	return Math.random() > 0.5;
};
