class TypeEquals {
	constructor(from, to) {
		this.from = from;
		this.to = to;
	}
}

let refl = new TypeEquals(function (a) {
	return a;
}, function (a) {
	return a;
});

let RProxy = (() => {
	function RProxy() {

	};
	RProxy.value = new RProxy();
	return RProxy;
})();

let RLProxy = (() => {
	function RLProxy() {

	};
	RLProxy.value = new RLProxy();
	return RLProxy;
})();


let to = function (dict) {
	return dict.to;
};

let from = function (dict) {
	return dict.from;
};

module.exports = {
	RProxy: RProxy,
	RLProxy: RLProxy,
	TypeEquals: TypeEquals,
	to: to,
	from: from,
	refl: refl
};