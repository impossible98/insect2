const record = require("../record");
const type = require('../type');


let SProxy = (function () {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();


let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};

let showIntImpl = function (n) {
	return n.toString();
};

let showNumberImpl = function (n) {
	let str = n.toString();
	return isNaN(str + ".0") ? str : str + ".0";
};

let showCharImpl = function (c) {
	let code = c.charCodeAt(0);
	if (code < 0x20 || code === 0x7F) {
		switch (c) {
			case "\x07": return "'\\a'";
			case "\b": return "'\\b'";
			case "\f": return "'\\f'";
			case "\n": return "'\\n'";
			case "\r": return "'\\r'";
			case "\t": return "'\\t'";
			case "\v": return "'\\v'";
		}
		return "'\\" + code.toString(10) + "'";
	}
	return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
};

let showStringImpl = function (s) {
	let l = s.length;
	return "\"" + s.replace(
		/[\0-\x1F\x7F"\\]/g,
		function (c, i) {
			switch (c) {
				case "\"":
				case "\\":
					return "\\" + c;
				case "\x07": return "\\a";
				case "\b": return "\\b";
				case "\f": return "\\f";
				case "\n": return "\\n";
				case "\r": return "\\r";
				case "\t": return "\\t";
				case "\v": return "\\v";
			}
			let k = i + 1;
			let empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
			return "\\" + c.charCodeAt(0).toString(10) + empty;
		}
	) + "\"";
};

let showArrayImpl = function (f) {
	return function (xs) {
		let ss = [];
		for (let i = 0, l = xs.length; i < l; i++) {
			ss[i] = f(xs[i]);
		}
		return "[" + ss.join(",") + "]";
	};
};

let cons = function (head) {
	return function (tail) {
		return [head].concat(tail);
	};
};

let join = function (separator) {
	return function (xs) {
		return xs.join(separator);
	};
};


let ShowRecordFields = function (showRecordFields) {
	this.showRecordFields = showRecordFields;
};
let Show = function (show) {
	this.show = show;
};
let showString = new Show(showStringImpl);
let showRecordFieldsNil = new ShowRecordFields(function (v) {
	return function (v1) {
		return [];
	};
});
let showRecordFields = function (dict) {
	return dict.showRecordFields;
};
let showRecord = function (dictRowToList) {
	return function (dictShowRecordFields) {
		return new Show(function (record2) {
			let v = showRecordFields(dictShowRecordFields)(type.RLProxy.value)(record2);
			if (v.length === 0) {
				return "{}";
			};
			return join(" ")(["{", join(", ")(v), "}"]);
		});
	};
};
let showNumber = new Show(showNumberImpl);
let showInt = new Show(showIntImpl);
let showChar = new Show(showCharImpl);
let showBoolean = new Show(function (v) {
	if (v) {
		return "true";
	};
	if (!v) {
		return "false";
	};
	throw new Error("Failed pattern match at Data.Show (line 20, column 1 - line 22, column 23): " + [v.constructor.name]);
});
let show = function (dict) {
	return dict.show;
};
let showArray = function (dictShow) {
	return new Show(showArrayImpl(show(dictShow)));
};
let showRecordFieldsCons = function (dictIsSymbol) {
	return function (dictShowRecordFields) {
		return function (dictShow) {
			return new ShowRecordFields(function (v) {
				return function (record2) {
					let tail = showRecordFields(dictShowRecordFields)(type.RLProxy.value)(record2);
					let key = reflectSymbol(dictIsSymbol)(SProxy.value);
					let focus = record.unsafeGet(key)(record2);
					return cons(join(": ")([key, show(dictShow)(focus)]))(tail);
				};
			});
		};
	};
};
module.exports = {
	Show: Show,
	show: show,
	ShowRecordFields: ShowRecordFields,
	showRecordFields: showRecordFields,
	showBoolean: showBoolean,
	showInt: showInt,
	showNumber: showNumber,
	showChar: showChar,
	showString: showString,
	showArray: showArray,
	showRecord: showRecord,
	showRecordFieldsNil: showRecordFieldsNil,
	showRecordFieldsCons: showRecordFieldsCons
};
