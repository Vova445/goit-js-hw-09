function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},u=t.parcelRequired7c6;null==u&&((u=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var u={id:e,exports:{}};return o[e]=u,t.call(u.exports,u,u.exports),u.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequired7c6=u);var r=u("7Y9D8");const i={delayInput:document.querySelector("input[name=delay]"),stepInput:document.querySelector("input[name=step]"),amountInput:document.querySelector("input[name=amount]"),submitButton:document.querySelector("button[type=submit]"),form:document.querySelector(".form")};function l(e,t){return new Promise(((o,n)=>{const u=Math.random()>.3;setTimeout((()=>{u?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}i.form.addEventListener("submit",(t=>{t.preventDefault();const o=Number(i.delayInput.value),n=Number(i.stepInput.value),u=Number(i.amountInput.value),s=[],a=[],d=[];for(let t=0;t<u;t++){const u=l(t+1,o+n*t);u.then((({position:t,delay:o})=>{e(r).Notify.success(`✅ Fulfilled promise ${t} in ${o}ms`),a.push({position:t,delay:o})})).catch((({position:t,delay:o})=>{e(r).Notify.failure(`❌ Rejected promise ${t} in ${o}ms`),d.push({position:t,delay:o})})),s.push(u)}Promise.all(s).then((()=>{i.form.reset()})).catch((e=>{console.error(e)}))}));
//# sourceMappingURL=03-promises.8c19b89f.js.map