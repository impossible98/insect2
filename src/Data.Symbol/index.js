let unsafeCoerce = function (arg) {
	return arg;
};


let SProxy = (function () {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();

let IsSymbol = function (reflectSymbol) {
	this.reflectSymbol = reflectSymbol;
};

let reifySymbol = function (s) {
	return function (f) {
		return unsafeCoerce(function (dictIsSymbol) {
			return f(dictIsSymbol);
		})({
			reflectSymbol: function (v) {
				return s;
			}
		})(SProxy.value);
	};
};

let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};

module.exports = {
	IsSymbol: IsSymbol,
	reflectSymbol: reflectSymbol,
	reifySymbol: reifySymbol,
	SProxy: SProxy
};
