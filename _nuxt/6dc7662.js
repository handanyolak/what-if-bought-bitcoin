(window.webpackJsonp=window.webpackJsonp||[]).push([[8,5],{452:function(t,e,n){"use strict";n.r(e);var r=n(57),o=Object(r.a)({props:{minDate:{type:String,default:function(){return""},required:!0},maxDate:{type:String,default:function(){return""},required:!0}},emits:["selected-time"],setup:function(t,e){var n=e.emit,o=Object(r.g)(null);return{startTime:o,onChange:function(){n("selected-time",o)}}}}),l=n(113),c=n(181),d=n.n(c),m=n(887),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-date-picker",{staticClass:"border-none",attrs:{"full-width":"",max:t.maxDate,min:t.minDate,"show-adjacent-months":""},on:{change:t.onChange},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})}),[],!1,null,null,null);e.default=component.exports;d()(component,{VDatePicker:m.a})},553:function(t,e,n){t.exports={}},876:function(t,e,n){"use strict";n(553)},877:function(t,e,n){t.exports={}},878:function(t,e,n){t.exports={}},889:function(t,e,n){"use strict";n.r(e);var r=n(14),o=(n(77),n(27),n(85),n(36),n(9),n(57)),l=n(53),c=n(544),d=n(452),m={setup:function(t,e){var n=Object(o.i)(),l=n.$axios,d=n.$recaptcha,m=Object(o.c)().proxy.$vToastify,f=Object(o.g)(null),h=Object(o.g)(null),v=(new Date).toISOString().split("T")[0],x="https://api.binance.com/api/v3",y="BTCUSDT",C=Object(o.g)(null),O=Object(o.g)(null),j=Object(o.g)(!1),k=Object(o.g)(null),_=Object(o.g)(""),w=Object(o.g)(""),V=Object(o.g)(null),S=Object(o.g)(null);Object(o.f)(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.init();case 2:case"end":return t.stop()}}),t)})))),Object(o.e)((function(){d.destroy()}));var D=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.execute("login");case 3:return t.next=5,f.value.validate();case 5:if(t.sent){t.next=8;break}throw new Error("Validation Error.");case 8:if(null!==h.value){t.next=10;break}throw new Error("Please Select a Date");case 10:return t.next=12,P();case 12:return t.next=14,I();case 14:if(!j.value){t.next=19;break}return t.next=17,T();case 17:t.next=20;break;case 19:k.value=null;case 20:return t.next=22,A();case 22:m.success("Success"),t.next=28;break;case 25:t.prev=25,t.t0=t.catch(0),t.t0&&m.error(String(null===t.t0||void 0===t.t0?void 0:t.t0.message));case 28:case"end":return t.stop()}}),t,null,[[0,25]])})));return function(){return t.apply(this,arguments)}}(),P=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.$get("".concat(x,"/aggTrades"),{params:{symbol:y,startTime:$(h.value),endTime:R(h.value)}}).then((function(data){C.value=data.filter((function(t){return!0===t.m}))[0].p}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),I=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.$get("".concat(x,"/avgPrice"),{params:{symbol:y}}).then((function(data){O.value=data.price}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),T=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.$get("".concat("https://www.statbureau.org","/calculate-inflation-price-jsonp"),{params:{country:"united-states",start:h.value,end:v,amount:100,format:!1}}).then((function(data){k.value=100/+data.substring(0,data.length-2).substring(2)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=function(){S.value=O.value/C.value,w.value=_.value*S.value*(k.value?k.value:1),V.value=(w.value-_.value)/_.value*100},$=function(t){return Date.parse(t)},R=function(t){return Date.parse(t)+3e5};return{mdiCurrencyUsd:c.a,observer:f,startTime:h,maxDate:v,minDate:"2017-08-18",oldPrice:C,currentPrice:O,inflation:j,inflationRate:k,amount:_,currentAmount:w,profit:V,onSubmit:D,selectedTime:function(t){h.value=t.value}}}};m.components=Object.assign({ValidationObserver:l.a,ValidationProvider:l.b,DatePicker:d.default},m.components);var f=m,h=(n(876),n(113)),v=n(181),x=n.n(v),y=(n(30),n(31),n(39),n(29),n(40),n(109)),C=n(13),O=(n(65),n(877),n(878),n(418)),j=n(453),k=n(417),_=n(1),w=_.default.extend({name:"rippleable",directives:{ripple:k.a},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(data.staticClass="v-input--selection-controls__ripple",data.directives=data.directives||[],data.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",data)):null}}}),V=n(26),S=_.default.extend({name:"comparable",props:{valueComparator:{type:Function,default:V.f}}}),D=n(178);function P(t){t.preventDefault()}var I=Object(D.a)(j.a,w,S).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,input=this.internalValue;return this.isMultiple?!!Array.isArray(input)&&input.some((function(n){return t.valueComparator(n,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,input):Boolean(input):this.valueComparator(input,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var label=j.a.options.methods.genLabel.call(this);return label?(label.data.on={click:P},label):label},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:P},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,input=this.internalValue;if(this.isMultiple){Array.isArray(input)||(input=[]);var n=input.length;(input=input.filter((function(n){return!t.valueComparator(n,e)}))).length===n&&input.push(e)}else input=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(input,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(input,e)?null:e:!input;this.validate(!0,input),this.internalValue=input,this.hasColor=input}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),T=["title"];function A(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function $(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?A(Object(source),!0).forEach((function(e){Object(C.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):A(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var R=I.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return $($({},j.a.options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var t=this.attrs$,e=(t.title,Object(y.a)(t,T));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(O.a,this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",$($({},e),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}),E=n(888),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"min-h-screen items-center justify-center"},[n("div",{staticClass:"flex items-center justify-center"},[n("div",{staticClass:"glass mx-5 w-full max-w-screen-2xl rounded-2xl p-5 md:mx-20"},[n("ValidationObserver",{ref:"observer",scopedSlots:t._u([{key:"default",fn:function(e){var r=e.invalid;return[n("div",{staticClass:"flex flex-col items-center space-y-5 py-10 lg:px-20"},[n("ValidationProvider",{staticClass:"flex justify-center",attrs:{name:"amount",rules:{required:!0,min:10,max:10}},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[n("DatePicker",{attrs:{"error-messages":r,"max-date":t.maxDate,"min-date":t.minDate},on:{"selected-time":function(e){return t.selectedTime(e)}},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})]}}],null,!0)}),t._v(" "),n("ValidationProvider",{staticClass:"flex justify-center",attrs:{name:"amount",rules:{required:!0,decimal:!0,min:1,max:15,min_value:1,max_value:1e14}},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[n("v-text-field",{attrs:{counter:15,"error-messages":r,label:"Amount",name:"amount","prepend-inner-icon":t.mdiCurrencyUsd,success:!Boolean(Object.keys(r).length)&&Boolean(t.amount)},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})]}}],null,!0)}),t._v(" "),n("v-checkbox",{attrs:{color:"cyan accent-4",dense:"","hide-details":"",label:"Inflation",name:"inflation"},model:{value:t.inflation,callback:function(e){t.inflation=e},expression:"inflation"}}),t._v(" "),n("button",{staticClass:"try-button mt-10 rounded-xl border-[#f13d7d] py-1 px-28 outline-none",attrs:{disabled:r},on:{click:t.onSubmit}},[t._v("\n            Try\n          ")]),t._v(" "),n("div",{staticClass:"grid grid-cols-1 justify-center gap-x-10 gap-y-5 md:grid-cols-2"},[t.oldPrice?n("div",{staticClass:"rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"},[n("label",{staticClass:"font-medium"},[t._v("Old Price: ")]),t._v(" "),n("span",{staticClass:"font-medium"},[t._v(t._s(parseFloat(t.oldPrice).toFixed(2)))])]):t._e(),t._v(" "),t.currentPrice?n("div",{staticClass:"rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"},[n("label",{staticClass:"font-medium"},[t._v("Current Price:")]),t._v(" "),n("span",{staticClass:"font-medium"},[t._v(t._s(parseFloat(t.currentPrice).toFixed(2)))])]):t._e()]),t._v(" "),n("div",{staticClass:"grid grid-cols-1 justify-center gap-x-10 gap-y-5"},[t.inflationRate?n("div",{staticClass:"rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"},[n("label",{staticClass:"font-medium"},[t._v("Inflation Rate: ")]),t._v(" "),n("span",{staticClass:"font-medium"},[t._v(t._s(t.inflationRate.toFixed(2)))])]):t._e()]),t._v(" "),n("div",{staticClass:"grid grid-cols-1 justify-center gap-x-10 gap-y-5 md:grid-cols-2"},[t.profit?n("div",{staticClass:"rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"},[n("label",{staticClass:"font-medium"},[t._v("Profit: ")]),t._v(" "),n("span",{staticClass:"font-medium"},[t._v("%"+t._s(parseInt(t.profit)))])]):t._e(),t._v(" "),t.currentAmount?n("div",{staticClass:"rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"},[n("label",{staticClass:"font-medium"},[t._v("Current Amount:")]),t._v(" "),n("span",{staticClass:"font-medium"},[t._v(t._s(t.currentAmount.toFixed(2)))])]):t._e()])],1)]}}])})],1)])])}),[],!1,null,null,null);e.default=component.exports;x()(component,{DatePicker:n(452).default}),x()(component,{VCheckbox:R,VTextField:E.a})}}]);