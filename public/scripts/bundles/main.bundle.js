!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(e){e.socket=io();n(2);var t=n(3);n(4);setInterval((function(){socket.emit("playerMovement",t.getMovement())}),1e3/60)}).call(this,n(0))},function(e,t){var n=document.getElementById("chat-text"),o=document.getElementById("chat-input"),r=document.getElementById("chat-form"),a=!1;r.onsubmit=function(e){e.preventDefault(),socket.emit("sendMsgToServer",o.value),o.value=""},socket.on("addToChat",(function(e){console.log("CLIENT: Received chat message."),n.innerHTML+='<div class="chatCell">'+e+"</div>",n.scrollTop=n.scrollHeight})),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("chat-input").addEventListener("focus",(function(){a=!0})),document.getElementById("chat-input").addEventListener("blur",(function(){a=!1}))})),document.onkeyup=function(e){13===e.keyCode&&(a?o.blur():o.focus())}},function(e,t){var n={up:!1,down:!1,left:!1,right:!1};document.addEventListener("keydown",(function(t){switch(t.keyCode){case 65:e.exports.updateMovement("left",!0);break;case 87:e.exports.updateMovement("up",!0);break;case 68:e.exports.updateMovement("right",!0);break;case 83:e.exports.updateMovement("down",!0)}})),document.addEventListener("keyup",(function(t){switch(t.keyCode){case 65:e.exports.updateMovement("left",!1);break;case 87:e.exports.updateMovement("up",!1);break;case 68:e.exports.updateMovement("right",!1);break;case 83:e.exports.updateMovement("down",!1)}})),e.exports.updateMovement=function(e,t){n[e]=t},e.exports.getMovement=function(){return n}},function(e,t,n){var o=document.getElementById("gameContainer");o.width=950,o.height=750;var r=o.getContext("2d"),a=n(5);socket.on("playersState",(function(e){a.updatePlayersState(r,e)}))},function(e,t,n){var o=n(6);e.exports.updatePlayersState=function(e,t){for(var n in e.clearRect(0,0,950,750),e.fillStyle="green",console.log(t),t){var r=t[n];e.beginPath(),o.drawPlayer(e,r)}}},function(e,t){var n=0,o=0,r=new Image;r.src="./public/images/characters/male-01-1.png",e.exports.drawPlayer=function(t,n){e.exports.updateSpriteFrame(t,n),t.drawImage(r,o,0,32,32,n.x,n.y,32,32),t.fill()},e.exports.updateSpriteFrame=function(e,t){n=++n%3,o=32*n,e.clearRect(t.x,t.y,32,32)}}]);