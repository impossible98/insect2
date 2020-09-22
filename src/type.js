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


module.exports = {
	RProxy: RProxy,
	RLProxy: RLProxy
};