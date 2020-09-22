class Type {
	constructor(kw, kw2) {
		this.kw = kw;
		this.kw2 = kw2;
	}
}

let refl = new Type((a) => {
	return a;
}, (a) => {
	return a;
});

let RProxy = (() => {
	function RProxy() { };

	RProxy.value = new RProxy();

	return RProxy;
})();

let RLProxy = (() => {
	function RLProxy() { };

	RLProxy.value = new RLProxy();

	return RLProxy;
})();


function to(dict) {

	return dict.to;
}

function from(dict) {

	return dict.from;
}

module.exports = {
	RProxy: RProxy,
	RLProxy: RLProxy,
	TypeEquals: Type,
	to: to,
	from: from,
	refl: refl
};