const control = require('../control');
let Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans/index.js");
let Control_Monad_Maybe_Trans = require("../Control.Monad.Maybe.Trans/index.js");
let Control_Monad_Reader_Trans = require("../Control.Monad.Reader.Trans/index.js");
let Control_Monad_Writer_Trans = require("../Control.Monad.Writer.Trans/index.js");
let Data_Either = require("../Data.Either/index.js");
const data = require('../data');
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Effect_Class = require("../Effect.Class/index.js");
let Effect_Ref = require("../Effect.Ref/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}

class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}

class Applicative {
	constructor(Apply0, pure) {
		this.Apply0 = Apply0;
		this.pure = pure;
	}
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

class Parallel {
	constructor(Applicative1, Monad0, parallel, sequential) {
		this.Applicative1 = Applicative1;
		this.Monad0 = Monad0;
		this.parallel = parallel;
		this.sequential = sequential;
	}
}

let runContT = function (v) {
	return function (k) {
		return v(k);
	};
};


let functorContT = function () {
	return new data.Functor(function (f) {
		return function (v) {
			return function (k) {
				return v(function (a) {
					return k(f(a));
				});
			};
		};
	});
};

let applyContT = function (dictApply) {
	return new Apply(function () {
		return functorContT(dictApply.Functor0());
	}, function (v) {
		return function (v1) {
			return function (k) {
				return v(function (g) {
					return v1(function (a) {
						return k(g(a));
					});
				});
			};
		};
	});
};

let bindContT = function (dictBind) {
	return new control.Bind(function () {
		return applyContT(dictBind.Apply0());
	}, function (v) {
		return function (k) {
			return function (k$prime) {
				return v(function (a) {
					let v1 = k(a);
					return v1(k$prime);
				});
			};
		};
	});
};

let applicativeContT = function (dictApplicative) {
	return new Applicative(function () {
		return applyContT(dictApplicative.Apply0());
	}, function (a) {
		return function (k) {
			return k(a);
		};
	});
};

let monadContT = function (dictMonad) {
	return new control.Monad(function () {
		return applicativeContT(dictMonad.Applicative0());
	}, function () {
		return bindContT(dictMonad.Bind1());
	});
};


let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(() => {
	return semigroupoidFn;
}, function (x) {
	return x;
});

function alt(dict) {
	return dict.alt;
}

function identity(dict) {
	return dict.identity;
}

let apply = function (dict) {
	return dict.apply;
};

let Compose = function (x) {
	return x;
};

let functorCompose = function (dictFunctor) {
	return function (dictFunctor1) {
		return new data.Functor(function (f) {
			return function (v) {
				return Compose(data.map(dictFunctor)(data.map(dictFunctor1)(f))(v));
			};
		});
	};
};

let foldableCompose = function (dictFoldable) {
	return function (dictFoldable1) {
		return new Data_Foldable.Foldable(function (dictMonoid) {
			return function (f) {
				return function (v) {
					return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(Data_Foldable.foldMap(dictFoldable1)(dictMonoid)(f))(v);
				};
			};
		}, function (f) {
			return function (i) {
				return function (v) {
					return Data_Foldable.foldl(dictFoldable)(Data_Foldable.foldl(dictFoldable1)(f))(i)(v);
				};
			};
		}, function (f) {
			return function (i) {
				return function (v) {
					return Data_Foldable.foldr(dictFoldable)(data.flip(Data_Foldable.foldr(dictFoldable1)(f)))(i)(v);
				};
			};
		});
	};
};

let traversableCompose = function (dictTraversable) {
	return function (dictTraversable1) {
		return new Data_Traversable.Traversable(() => {
			return foldableCompose(dictTraversable.Foldable1())(dictTraversable1.Foldable1());
		}, () => {
			return functorCompose(dictTraversable.Functor0())(dictTraversable1.Functor0());
		}, function (dictApplicative) {
			return Data_Traversable.traverse(traversableCompose(dictTraversable)(dictTraversable1))(dictApplicative)(identity(categoryFn));
		}, function (dictApplicative) {
			return function (f) {
				return function (v) {
					return data.map((dictApplicative.Apply0()).Functor0())(Compose)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(Data_Traversable.traverse(dictTraversable1)(dictApplicative)(f))(v));
				};
			};
		});
	};
};

let applyCompose = function (dictApply) {
	return function (dictApply1) {
		return new Apply(() => {
			return functorCompose(dictApply.Functor0())(dictApply1.Functor0());
		}, function (v) {
			return function (v1) {
				return Compose(apply(dictApply)(data.map(dictApply.Functor0())(apply(dictApply1))(v))(v1));
			};
		});
	};
};

let applicativeCompose = function (dictApplicative) {
	return function (dictApplicative1) {
		return new control.Applicative(() => {
			return applyCompose(dictApplicative.Apply0())(dictApplicative1.Apply0());
		}, (() => {
			let $112 = control.pure(dictApplicative);
			let $113 = control.pure(dictApplicative1);
			return function ($114) {
				return Compose($112($113($114)));
			};
		})());
	};
};

let ParCont = function (x) {
	return x;
};

let sequential = function (dict) {
	return dict.sequential;
};

let parallel = function (dict) {
	return dict.parallel;
};

let newtypeParCont = new Data_Newtype.Newtype(function (n) {
	return n;
}, ParCont);

let monadParWriterT = function (dictMonoid) {
	return function (dictParallel) {
		return new Parallel(() => {
			return Control_Monad_Writer_Trans.applicativeWriterT(dictMonoid)(dictParallel.Applicative1());
		}, () => {
			return Control_Monad_Writer_Trans.monadWriterT(dictMonoid)(dictParallel.Monad0());
		}, Control_Monad_Writer_Trans.mapWriterT(parallel(dictParallel)), Control_Monad_Writer_Trans.mapWriterT(sequential(dictParallel)));
	};
};

let monadParReaderT = function (dictParallel) {
	return new Parallel(() => {
		return Control_Monad_Reader_Trans.applicativeReaderT(dictParallel.Applicative1());
	}, () => {
		return Control_Monad_Reader_Trans.monadReaderT(dictParallel.Monad0());
	}, Control_Monad_Reader_Trans.mapReaderT(parallel(dictParallel)), Control_Monad_Reader_Trans.mapReaderT(sequential(dictParallel)));
};

let monadParMaybeT = function (dictParallel) {
	return new Parallel(() => {
		return applicativeCompose(dictParallel.Applicative1())(Data_Maybe.applicativeMaybe);
	}, () => {
		return Control_Monad_Maybe_Trans.monadMaybeT(dictParallel.Monad0());
	}, function (v) {
		return parallel(dictParallel)(v);
	}, function (v) {
		return sequential(dictParallel)(v);
	});
};

let monadParExceptT = function (dictParallel) {
	return new Parallel(() => {
		return applicativeCompose(dictParallel.Applicative1())(Data_Either.applicativeEither);
	}, () => {
		return Control_Monad_Except_Trans.monadExceptT(dictParallel.Monad0());
	}, function (v) {
		return parallel(dictParallel)(v);
	}, function (v) {
		return sequential(dictParallel)(v);
	});
};

let monadParParCont = function (dictMonadEffect) {
	return new Parallel(() => {
		return applicativeParCont(dictMonadEffect);
	}, () => {
		return monadContT(dictMonadEffect.Monad0());
	}, ParCont, function (v) {
		return v;
	});
};

let functorParCont = function (dictMonadEffect) {
	return new data.Functor(function (f) {
		let $40 = parallel(monadParParCont(dictMonadEffect));
		let $41 = data.map(functorContT((((dictMonadEffect.Monad0()).Bind1()).Apply0()).Functor0()))(f);
		let $42 = sequential(monadParParCont(dictMonadEffect));
		return function ($43) {
			return $40($41($42($43)));
		};
	});
};

let applyParCont = function (dictMonadEffect) {
	return new Apply(() => {
		return functorParCont(dictMonadEffect);
	}, function (v) {
		return function (v1) {
			return ParCont(function (k) {
				return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref["new"](Data_Maybe.Nothing.value)))(function (ra) {
					return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref["new"](Data_Maybe.Nothing.value)))(function (rb) {
						return control.discard(control.discardUnit)((dictMonadEffect.Monad0()).Bind1())(runContT(v)(function (a) {
							return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(rb)))(function (mb) {
								if (mb instanceof Data_Maybe.Nothing) {
									return Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(new Data_Maybe.Just(a))(ra));
								};
								if (mb instanceof Data_Maybe.Just) {
									return k(a(mb.value0));
								};
								throw new Error("Failed pattern match at Control.Parallel.Class (line 71, column 7 - line 73, column 26): " + [mb.constructor.name]);
							});
						}))(() => {
							return runContT(v1)(function (b) {
								return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(ra)))(function (ma) {
									if (ma instanceof Data_Maybe.Nothing) {
										return Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(new Data_Maybe.Just(b))(rb));
									};
									if (ma instanceof Data_Maybe.Just) {
										return k(ma.value0(b));
									};
									throw new Error("Failed pattern match at Control.Parallel.Class (line 77, column 7 - line 79, column 26): " + [ma.constructor.name]);
								});
							});
						});
					});
				});
			});
		};
	});
};

let applicativeParCont = function (dictMonadEffect) {
	return new control.Applicative(() => {
		return applyParCont(dictMonadEffect);
	}, (() => {
		let $44 = parallel(monadParParCont(dictMonadEffect));
		let $45 = control.pure(applicativeContT((dictMonadEffect.Monad0()).Applicative0()));
		return function ($46) {
			return $44($45($46));
		};
	})());
};

let altParCont = function (dictMonadEffect) {
	return new Alt(() => {
		return functorParCont(dictMonadEffect);
	}, function (v) {
		return function (v1) {
			return ParCont(function (k) {
				return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref["new"](false)))(function (done) {
					return control.discard(control.discardUnit)((dictMonadEffect.Monad0()).Bind1())(runContT(v)(function (a) {
						return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(done)))(function (b) {
							if (b) {
								return control.pure((dictMonadEffect.Monad0()).Applicative0())({});
							};
							return control.discard(control.discardUnit)((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(true)(done)))(() => {
								return k(a);
							});
						});
					}))(() => {
						return runContT(v1)(function (a) {
							return control.bind((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.read(done)))(function (b) {
								if (b) {
									return control.pure((dictMonadEffect.Monad0()).Applicative0())({});
								};
								return control.discard(control.discardUnit)((dictMonadEffect.Monad0()).Bind1())(Effect_Class.liftEffect(dictMonadEffect)(Effect_Ref.write(true)(done)))(() => {
									return k(a);
								});
							});
						});
					});
				});
			});
		};
	});
};

let plusParCont = function (dictMonadEffect) {
	return new control.Plus(() => {
		return altParCont(dictMonadEffect);
	}, ParCont(function (v) {
		return control.pure((dictMonadEffect.Monad0()).Applicative0())({});
	}));
};

let alternativeParCont = function (dictMonadEffect) {
	return new Alternative(() => {
		return applicativeParCont(dictMonadEffect);
	}, () => {
		return plusParCont(dictMonadEffect);
	});
};

module.exports = {
	parallel: parallel,
	sequential: sequential,
	Parallel: Parallel,
	ParCont: ParCont,
	monadParExceptT: monadParExceptT,
	monadParReaderT: monadParReaderT,
	monadParWriterT: monadParWriterT,
	monadParMaybeT: monadParMaybeT,
	newtypeParCont: newtypeParCont,
	functorParCont: functorParCont,
	applyParCont: applyParCont,
	applicativeParCont: applicativeParCont,
	altParCont: altParCont,
	plusParCont: plusParCont,
	alternativeParCont: alternativeParCont,
	monadParParCont: monadParParCont
};
