(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports,__webpack_require__){var index_1=__webpack_require__(20);window.money=index_1["default"]},function(module,exports){var $Object=Object;module.exports={create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach}},function(module,exports){var core=module.exports={version:"2.0.3"};"number"==typeof __e&&(__e=core)},function(module,exports){module.exports=function(exec){try{return!!exec()}catch(e){return!0}}},function(module,exports){var global=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=global)},function(module,exports,__webpack_require__){var $=__webpack_require__(1),createDesc=__webpack_require__(15);module.exports=__webpack_require__(11)?function(object,key,value){return $.setDesc(object,key,createDesc(1,value))}:function(object,key,value){return object[key]=value,object}},function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;!function(global){"use strict";function bigFactory(){function Big(n){var x=this;return x instanceof Big?(n instanceof Big?(x.s=n.s,x.e=n.e,x.c=n.c.slice()):parse(x,n),void(x.constructor=Big)):void 0===n?bigFactory():new Big(n)}return Big.prototype=P,Big.DP=DP,Big.RM=RM,Big.E_NEG=E_NEG,Big.E_POS=E_POS,Big}function format(x,dp,toE){var Big=x.constructor,i=dp-(x=new Big(x)).e,c=x.c;for(c.length>++dp&&rnd(x,i,Big.RM),c[0]?toE?i=dp:(c=x.c,i=x.e+i+1):++i;c.length<i;c.push(0));return i=x.e,1===toE||toE&&(i>=dp||i<=Big.E_NEG)?(x.s<0&&c[0]?"-":"")+(c.length>1?c[0]+"."+c.join("").slice(1):c[0])+(0>i?"e":"e+")+i:x.toString()}function parse(x,n){var e,i,nL;for(0===n&&0>1/n?n="-0":isValid.test(n+="")||throwErr(NaN),x.s="-"==n.charAt(0)?(n=n.slice(1),-1):1,(e=n.indexOf("."))>-1&&(n=n.replace(".","")),(i=n.search(/e/i))>0?(0>e&&(e=i),e+=+n.slice(i+1),n=n.substring(0,i)):0>e&&(e=n.length),i=0;"0"==n.charAt(i);i++);if(i==(nL=n.length))x.c=[x.e=0];else{for(;"0"==n.charAt(--nL););for(x.e=e-i-1,x.c=[],e=0;nL>=i;x.c[e++]=+n.charAt(i++));}return x}function rnd(x,dp,rm,more){var u,xc=x.c,i=x.e+dp+1;if(1===rm?more=xc[i]>=5:2===rm?more=xc[i]>5||5==xc[i]&&(more||0>i||xc[i+1]!==u||1&xc[i-1]):3===rm?more=more||xc[i]!==u||0>i:(more=!1,0!==rm&&throwErr("!Big.RM!")),1>i||!xc[0])more?(x.e=-dp,x.c=[1]):x.c=[x.e=0];else{if(xc.length=i--,more)for(;++xc[i]>9;)xc[i]=0,i--||(++x.e,xc.unshift(1));for(i=xc.length;!xc[--i];xc.pop());}return x}function throwErr(message){var err=new Error(message);throw err.name="BigError",err}var Big,DP=20,RM=1,MAX_DP=1e6,MAX_POWER=1e6,E_NEG=-7,E_POS=21,P={},isValid=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;P.abs=function(){var x=new this.constructor(this);return x.s=1,x},P.cmp=function(y){var xNeg,x=this,xc=x.c,yc=(y=new x.constructor(y)).c,i=x.s,j=y.s,k=x.e,l=y.e;if(!xc[0]||!yc[0])return xc[0]?i:yc[0]?-j:0;if(i!=j)return i;if(xNeg=0>i,k!=l)return k>l^xNeg?1:-1;for(i=-1,j=(k=xc.length)<(l=yc.length)?k:l;++i<j;)if(xc[i]!=yc[i])return xc[i]>yc[i]^xNeg?1:-1;return k==l?0:k>l^xNeg?1:-1},P.div=function(y){var x=this,Big=x.constructor,dvd=x.c,dvs=(y=new Big(y)).c,s=x.s==y.s?1:-1,dp=Big.DP;if((dp!==~~dp||0>dp||dp>MAX_DP)&&throwErr("!Big.DP!"),!dvd[0]||!dvs[0])return dvd[0]==dvs[0]&&throwErr(NaN),dvs[0]||throwErr(s/0),new Big(0*s);var dvsL,dvsT,next,cmp,remI,u,dvsZ=dvs.slice(),dvdI=dvsL=dvs.length,dvdL=dvd.length,rem=dvd.slice(0,dvsL),remL=rem.length,q=y,qc=q.c=[],qi=0,digits=dp+(q.e=x.e-y.e)+1;for(q.s=s,s=0>digits?0:digits,dvsZ.unshift(0);remL++<dvsL;rem.push(0));do{for(next=0;10>next;next++){if(dvsL!=(remL=rem.length))cmp=dvsL>remL?1:-1;else for(remI=-1,cmp=0;++remI<dvsL;)if(dvs[remI]!=rem[remI]){cmp=dvs[remI]>rem[remI]?1:-1;break}if(!(0>cmp))break;for(dvsT=remL==dvsL?dvs:dvsZ;remL;){if(rem[--remL]<dvsT[remL]){for(remI=remL;remI&&!rem[--remI];rem[remI]=9);--rem[remI],rem[remL]+=10}rem[remL]-=dvsT[remL]}for(;!rem[0];rem.shift());}qc[qi++]=cmp?next:++next,rem[0]&&cmp?rem[remL]=dvd[dvdI]||0:rem=[dvd[dvdI]]}while((dvdI++<dvdL||rem[0]!==u)&&s--);return qc[0]||1==qi||(qc.shift(),q.e--),qi>digits&&rnd(q,dp,Big.RM,rem[0]!==u),q},P.eq=function(y){return!this.cmp(y)},P.gt=function(y){return this.cmp(y)>0},P.gte=function(y){return this.cmp(y)>-1},P.lt=function(y){return this.cmp(y)<0},P.lte=function(y){return this.cmp(y)<1},P.sub=P.minus=function(y){var i,j,t,xLTy,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;if(a!=b)return y.s=-b,x.plus(y);var xc=x.c.slice(),xe=x.e,yc=y.c,ye=y.e;if(!xc[0]||!yc[0])return yc[0]?(y.s=-b,y):new Big(xc[0]?x:0);if(a=xe-ye){for((xLTy=0>a)?(a=-a,t=xc):(ye=xe,t=yc),t.reverse(),b=a;b--;t.push(0));t.reverse()}else for(j=((xLTy=xc.length<yc.length)?xc:yc).length,a=b=0;j>b;b++)if(xc[b]!=yc[b]){xLTy=xc[b]<yc[b];break}if(xLTy&&(t=xc,xc=yc,yc=t,y.s=-y.s),(b=(j=yc.length)-(i=xc.length))>0)for(;b--;xc[i++]=0);for(b=i;j>a;){if(xc[--j]<yc[j]){for(i=j;i&&!xc[--i];xc[i]=9);--xc[i],xc[j]+=10}xc[j]-=yc[j]}for(;0===xc[--b];xc.pop());for(;0===xc[0];)xc.shift(),--ye;return xc[0]||(y.s=1,xc=[ye=0]),y.c=xc,y.e=ye,y},P.mod=function(y){var yGTx,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;return y.c[0]||throwErr(NaN),x.s=y.s=1,yGTx=1==y.cmp(x),x.s=a,y.s=b,yGTx?new Big(x):(a=Big.DP,b=Big.RM,Big.DP=Big.RM=0,x=x.div(y),Big.DP=a,Big.RM=b,this.minus(x.times(y)))},P.add=P.plus=function(y){var t,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;if(a!=b)return y.s=-b,x.minus(y);var xe=x.e,xc=x.c,ye=y.e,yc=y.c;if(!xc[0]||!yc[0])return yc[0]?y:new Big(xc[0]?x:0*a);if(xc=xc.slice(),a=xe-ye){for(a>0?(ye=xe,t=yc):(a=-a,t=xc),t.reverse();a--;t.push(0));t.reverse()}for(xc.length-yc.length<0&&(t=yc,yc=xc,xc=t),a=yc.length,b=0;a;)b=(xc[--a]=xc[a]+yc[a]+b)/10|0,xc[a]%=10;for(b&&(xc.unshift(b),++ye),a=xc.length;0===xc[--a];xc.pop());return y.c=xc,y.e=ye,y},P.pow=function(n){var x=this,one=new x.constructor(1),y=one,isNeg=0>n;for((n!==~~n||-MAX_POWER>n||n>MAX_POWER)&&throwErr("!pow!"),n=isNeg?-n:n;1&n&&(y=y.times(x)),n>>=1;)x=x.times(x);return isNeg?one.div(y):y},P.round=function(dp,rm){var x=this,Big=x.constructor;return null==dp?dp=0:(dp!==~~dp||0>dp||dp>MAX_DP)&&throwErr("!round!"),rnd(x=new Big(x),dp,null==rm?Big.RM:rm),x},P.sqrt=function(){var estimate,r,approx,x=this,Big=x.constructor,xc=x.c,i=x.s,e=x.e,half=new Big("0.5");if(!xc[0])return new Big(x);0>i&&throwErr(NaN),i=Math.sqrt(x.toString()),0===i||i===1/0?(estimate=xc.join(""),estimate.length+e&1||(estimate+="0"),r=new Big(Math.sqrt(estimate).toString()),r.e=((e+1)/2|0)-(0>e||1&e)):r=new Big(i.toString()),i=r.e+(Big.DP+=4);do approx=r,r=half.times(approx.plus(x.div(approx)));while(approx.c.slice(0,i).join("")!==r.c.slice(0,i).join(""));return rnd(r,Big.DP-=4,Big.RM),r},P.mul=P.times=function(y){var c,x=this,Big=x.constructor,xc=x.c,yc=(y=new Big(y)).c,a=xc.length,b=yc.length,i=x.e,j=y.e;if(y.s=x.s==y.s?1:-1,!xc[0]||!yc[0])return new Big(0*y.s);for(y.e=i+j,b>a&&(c=xc,xc=yc,yc=c,j=a,a=b,b=j),c=new Array(j=a+b);j--;c[j]=0);for(i=b;i--;){for(b=0,j=a+i;j>i;)b=c[j]+yc[i]*xc[j-i-1]+b,c[j--]=b%10,b=b/10|0;c[j]=(c[j]+b)%10}for(b&&++y.e,c[0]||c.shift(),i=c.length;!c[--i];c.pop());return y.c=c,y},P.toString=P.valueOf=P.toJSON=function(){var x=this,Big=x.constructor,e=x.e,str=x.c.join(""),strL=str.length;if(e<=Big.E_NEG||e>=Big.E_POS)str=str.charAt(0)+(strL>1?"."+str.slice(1):"")+(0>e?"e":"e+")+e;else if(0>e){for(;++e;str="0"+str);str="0."+str}else if(e>0)if(++e>strL)for(e-=strL;e--;str+="0");else strL>e&&(str=str.slice(0,e)+"."+str.slice(e));else strL>1&&(str=str.charAt(0)+"."+str.slice(1));return x.s<0&&x.c[0]?"-"+str:str},P.toExponential=function(dp){return null==dp?dp=this.c.length-1:(dp!==~~dp||0>dp||dp>MAX_DP)&&throwErr("!toExp!"),format(this,dp,1)},P.toFixed=function(dp){var str,x=this,Big=x.constructor,neg=Big.E_NEG,pos=Big.E_POS;return Big.E_NEG=-(Big.E_POS=1/0),null==dp?str=x.toString():dp===~~dp&&dp>=0&&MAX_DP>=dp&&(str=format(x,x.e+dp),x.s<0&&x.c[0]&&str.indexOf("-")<0&&(str="-"+str)),Big.E_NEG=neg,Big.E_POS=pos,str||throwErr("!toFix!"),str},P.toPrecision=function(sd){return null==sd?this.toString():((sd!==~~sd||1>sd||sd>MAX_DP)&&throwErr("!toPre!"),format(this,sd-1,2))},Big=bigFactory(),__WEBPACK_AMD_DEFINE_RESULT__=function(){return Big}.call(exports,__webpack_require__,exports,module),!(void 0!==__WEBPACK_AMD_DEFINE_RESULT__&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}(this)},function(module,exports){module.exports=function(it){if("function"!=typeof it)throw TypeError(it+" is not a function!");return it}},function(module,exports){var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1)}},function(module,exports,__webpack_require__){var aFunction=__webpack_require__(7);module.exports=function(fn,that,length){if(aFunction(fn),void 0===that)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}},function(module,exports){module.exports=function(it){if(void 0==it)throw TypeError("Can't call method on  "+it);return it}},function(module,exports,__webpack_require__){module.exports=!__webpack_require__(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(module,exports,__webpack_require__){var global=__webpack_require__(4),core=__webpack_require__(2),hide=__webpack_require__(5),redefine=__webpack_require__(16),ctx=__webpack_require__(9),PROTOTYPE="prototype",$export=function(type,name,source){var key,own,out,exp,IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,target=IS_GLOBAL?global:IS_STATIC?global[name]||(global[name]={}):(global[name]||{})[PROTOTYPE],exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports[PROTOTYPE]||(exports[PROTOTYPE]={});IS_GLOBAL&&(source=name);for(key in source)own=!IS_FORCED&&target&&void 0!==target[key],out=(own?target:source)[key],exp=IS_BIND&&own?ctx(out,global):IS_PROTO&&"function"==typeof out?ctx(Function.call,out):out,target&&!own&&redefine(target,key,out,type&$export.U),exports[key]!=out&&hide(exports,key,exp),IS_PROTO&&expProto[key]!=out&&(expProto[key]=out)};global.core=core,$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128,module.exports=$export},function(module,exports,__webpack_require__){var cof=__webpack_require__(8);module.exports=Object("z").propertyIsEnumerable(0)?Object:function(it){return"String"==cof(it)?it.split(""):Object(it)}},function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(1),toObject=__webpack_require__(17),IObject=__webpack_require__(13);module.exports=__webpack_require__(3)(function(){var a=Object.assign,A={},B={},S=Symbol(),K="abcdefghijklmnopqrst";return A[S]=7,K.split("").forEach(function(k){B[k]=k}),7!=a({},A)[S]||Object.keys(a({},B)).join("")!=K})?function(target,source){for(var T=toObject(target),aLen=arguments.length,index=1,getKeys=$.getKeys,getSymbols=$.getSymbols,isEnum=$.isEnum;aLen>index;)for(var key,S=IObject(arguments[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0;length>j;)isEnum.call(S,key=keys[j++])&&(T[key]=S[key]);return T}:Object.assign},function(module,exports){module.exports=function(bitmap,value){return{enumerable:!(1&bitmap),configurable:!(2&bitmap),writable:!(4&bitmap),value:value}}},function(module,exports,__webpack_require__){var global=__webpack_require__(4),hide=__webpack_require__(5),SRC=__webpack_require__(18)("src"),TO_STRING="toString",$toString=Function[TO_STRING],TPL=(""+$toString).split(TO_STRING);__webpack_require__(2).inspectSource=function(it){return $toString.call(it)},(module.exports=function(O,key,val,safe){"function"==typeof val&&(val.hasOwnProperty(SRC)||hide(val,SRC,O[key]?""+O[key]:TPL.join(String(key))),val.hasOwnProperty("name")||hide(val,"name",key)),O===global?O[key]=val:safe?O[key]?O[key]=val:hide(O,key,val):(delete O[key],hide(O,key,val))})(Function.prototype,TO_STRING,function(){return"function"==typeof this&&this[SRC]||$toString.call(this)})},function(module,exports,__webpack_require__){var defined=__webpack_require__(10);module.exports=function(it){return Object(defined(it))}},function(module,exports){var id=0,px=Math.random();module.exports=function(key){return"Symbol(".concat(void 0===key?"":key,")_",(++id+px).toString(36))}},function(module,exports,__webpack_require__){var $export=__webpack_require__(12);$export($export.S+$export.F,"Object",{assign:__webpack_require__(14)})},function(module,exports,__webpack_require__){function addDigitGrouping(amountValue,groupDelimiter){return amountValue.replace(/(\d)(?=(\d{3})+\.)/g,"$1"+groupDelimiter)}function replaceDecimalDelimiter(groupedAmountValue,decimalDelimiter){var idx=groupedAmountValue.lastIndexOf(".");return groupedAmountValue.substring(0,idx)+decimalDelimiter+groupedAmountValue.substring(idx+1)}var Big=__webpack_require__(6);__webpack_require__(19);var StutzConfigImpl=function(){function StutzConfigImpl(){this.reset()}return StutzConfigImpl.prototype.reset=function(){this.locale=DEFAULT_LOCALE,this.currencyCode=FALLBACK_CURRENCY_CODE,this.decimalPlaces=DEFAULT_DECIMAL_PLACES,this.groupDelimiter=DEFAULT_GROUP_DELIMITER,this.decimalDelimiter=DEFAULT_DECIMAL_DELIMITER,this.formatter=DEFAULT_FORMATTER},StutzConfigImpl.from=function(other){var newConfig=Object.assign(new StutzConfigImpl,other);return newConfig.formatter=other.formatter,newConfig},StutzConfigImpl}(),FALLBACK_CURRENCY_CODE="-$-",DEFAULT_DECIMAL_DELIMITER=".",DEFAULT_GROUP_DELIMITER="'",DEFAULT_DECIMAL_PLACES=2,DEFAULT_FORMATTER=function(amount,currencyCode,config){var _config=config||CONFIG_REPOSITORY.configFor(DEFAULT_LOCALE,currencyCode),amountValue=amount.toFixed(_config.decimalPlaces||DEFAULT_DECIMAL_PLACES),groupedAmountValue=addDigitGrouping(amountValue,_config.groupDelimiter),formattedAmount=replaceDecimalDelimiter(groupedAmountValue,_config.decimalDelimiter);return currencyCode+" "+formattedAmount},DEFAULT_LOCALE="_default_locale",ConfigRepository=function(){function ConfigRepository(){this.configs={},this.reset()}return ConfigRepository.prototype.reset=function(){this.configs[DEFAULT_LOCALE]={},this.configs[DEFAULT_LOCALE][FALLBACK_CURRENCY_CODE]=new StutzConfigImpl},ConfigRepository.prototype.configFor=function(locale,currencyCode,forceInit){var _locale=locale||DEFAULT_LOCALE,_currencyCode=currencyCode||FALLBACK_CURRENCY_CODE,isNewLocale=!1;if(this.configs[_locale]||(this.configs[_locale]={},isNewLocale=!0),forceInit||isNewLocale){var newConfig=new StutzConfigImpl;this.configs[_locale][_currencyCode]=newConfig}else if(!this.configs[_locale][_currencyCode]){var newConfig=StutzConfigImpl.from(this.configFor(_locale,FALLBACK_CURRENCY_CODE));newConfig.locale=locale,newConfig.currencyCode=currencyCode,this.configs[_locale][_currencyCode]=newConfig}return this.configs[_locale][_currencyCode]},ConfigRepository}(),CONFIG_REPOSITORY=new ConfigRepository,StutzImpl=function(){function StutzImpl(currencyCode,value){this.currencyCode=currencyCode,this.amount=new Big(value)}return StutzImpl.prototype.getAmount=function(){return this.amount},StutzImpl.prototype.getCurrencyCode=function(){return this.currencyCode},StutzImpl.prototype.formatMoney=function(locale){var _locale=locale||DEFAULT_LOCALE,_config=CONFIG_REPOSITORY.configFor(_locale,this.currencyCode);return _config.formatter(this.amount,this.currencyCode,_config)},StutzImpl}(),ConfigBuilder=function(){function ConfigBuilder(locale,currencyCode,forceInit){this.locale=locale||DEFAULT_LOCALE,this.currencyCode=currencyCode||FALLBACK_CURRENCY_CODE,this.config=CONFIG_REPOSITORY.configFor(this.locale,this.currencyCode,forceInit)}return ConfigBuilder.prototype.reset=function(){CONFIG_REPOSITORY.reset()},ConfigBuilder.prototype.forCurrency=function(currencyCode){return new ConfigBuilder(this.locale,currencyCode,!0)},ConfigBuilder.prototype.useGroupDelimiter=function(groupDelimiter){return this.config.groupDelimiter=groupDelimiter,this},ConfigBuilder.prototype.useDecimalDelimiter=function(decimalDelimiter){return this.config.decimalDelimiter=decimalDelimiter,this},ConfigBuilder.prototype.useFormatter=function(formatter){return this.config.formatter=formatter,this},ConfigBuilder.prototype.useDecimalPlaces=function(decimalPlaces){return this.config.decimalPlaces=decimalPlaces,this},ConfigBuilder}();exports.ConfigBuilder=ConfigBuilder;var StutzFactory=function(){function StutzFactory(){}return StutzFactory.of=function(currencyCode,value){return new StutzImpl(currencyCode,value)},StutzFactory.config=function(locale,currencyCode){return new ConfigBuilder(locale,currencyCode,!0)},StutzFactory.parse=function(formattedMoney,config){var _config=config||CONFIG_REPOSITORY.configFor(),amountValue=formattedMoney.replace(new RegExp("[^\\d"+_config.decimalDelimiter+"]","g"),"");_config.decimalDelimiter!==DEFAULT_DECIMAL_DELIMITER&&(amountValue=amountValue.replace(_config.decimalDelimiter,DEFAULT_DECIMAL_DELIMITER));var currencyCode=formattedMoney.replace(new RegExp("[\\d,'.\\s"+_config.decimalDelimiter+_config.groupDelimiter+"]","g"),"");return new StutzImpl(currencyCode,amountValue)},StutzFactory}();Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=StutzFactory}]);
},{}]},{},[1]);
