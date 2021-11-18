(this.webpackJsonpsnake=this.webpackJsonpsnake||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var i=n(1),s=n.n(i),a=n(7),r=n.n(a),c=(n(12),n(13),n(0)),o=function(){return Object(c.jsxs)("section",{className:"topic",children:[Object(c.jsx)("h1",{children:"Snake Game"}),Object(c.jsx)("p",{children:"Cool retro video game from our childhood"})]})},d=n(4),u=function(e){var t=e.children;return Object(c.jsxs)("section",{className:"nes-container with-title",children:[Object(c.jsx)("h3",{className:"title",children:"Let's play"}),t]})},l=function(){return Object(c.jsx)("p",{children:"Use keyboard arrows to play"})},h=function(e){var t=e.status;return Object(c.jsxs)("div",{children:["unstarted"===t&&Object(c.jsx)("span",{className:"nes-badge",children:Object(c.jsx)("span",{className:"is-dark",children:"Waiting"})}),"active"===t&&Object(c.jsx)("span",{className:"nes-badge",children:Object(c.jsx)("span",{className:"is-primary",children:"Active"})}),"pause"===t&&Object(c.jsx)("span",{className:"nes-badge",children:Object(c.jsx)("span",{className:"is-warning",children:"Pause"})}),"game over"===t&&Object(c.jsx)("span",{className:"nes-badge",children:Object(c.jsx)("span",{className:"is-error",children:"Game Over"})})]})},f=function(e){var t=e.icon,n=e.value;return Object(c.jsxs)("span",{className:"scoreboard-item",children:[Object(c.jsx)("i",{className:"nes-icon ".concat(t," is-medium")}),Object(c.jsx)("span",{className:"scoreboard-item__value",children:n})]})},v=function(e){var t=e.record,n=e.score;return Object(c.jsxs)("div",{className:"scoreboard",children:[Object(c.jsx)(f,{icon:"trophy",value:t}),Object(c.jsx)(f,{icon:"coin",value:n})]})},j=Object(i.forwardRef)((function(e,t){return Object(c.jsx)("div",{className:"nes-container is-rounded",style:{marginBottom:"20px"},children:Object(c.jsx)("canvas",{ref:t,width:"660",height:"440",style:{margin:"0 auto"}})})})),b=function(e){var t=e.status,n=e.generateNewGame,i=e.pauseGame,s=e.continueGame;return Object(c.jsxs)("div",{className:"controls-row",children:[Object(c.jsx)("button",{type:"button",className:"nes-btn",onClick:n,children:"Play new game"}),"active"===t&&Object(c.jsx)("button",{type:"button",className:"nes-btn is-warning",onClick:i,children:"Pause"}),"pause"===t&&Object(c.jsx)("button",{type:"button",className:"nes-btn is-primary",onClick:s,children:"Continue"})]})},m=n(2),x=n(3),y=n(5),g=function(e,t){var n=Math.ceil(e),i=Math.floor(t);return Math.floor(Math.random()*(i-n+1)+n)},p=function(){function e(t,n){Object(m.a)(this,e),this.field=void 0,this.food=void 0,this.snake=void 0,this.direction=void 0,this.score=void 0,this.score=0,this.direction="up",this.generateField(t,n),this.generateFood(),this.setFoodIntoField(),this.generateSnakeCoord(),this.setSnakeIntoField()}return Object(x.a)(e,[{key:"generateField",value:function(e,t){this.field=[];for(var n=0;n<e;n++)for(var i=0;i<t;i++)this.field[n]||(this.field[n]=[]),this.field[n][i]="empty"}},{key:"updateDirection",value:function(e){"up"!==e||"down"===this.direction?"right"!==e||"left"===this.direction?"down"!==e||"up"===this.direction?"left"===e&&"right"!==this.direction&&(this.direction="left"):this.direction="down":this.direction="right":this.direction="up"}},{key:"getRandomEmptyPoint",value:function(){for(var e=[],t=0;t<this.field.length;t++)for(var n=0;n<this.field[0].length;n++)"empty"===this.field[t][n]&&e.push({x:t,y:n});return e[g(0,e.length-1)]}},{key:"generateFood",value:function(){this.food=this.getRandomEmptyPoint()}},{key:"generateSnakeCoord",value:function(){var e=this.getRandomEmptyPoint();this.snake=[e,Object(y.a)(Object(y.a)({},e),{},{y:e.y+1}),Object(y.a)(Object(y.a)({},e),{},{y:e.y+2})]}},{key:"setFoodIntoField",value:function(){this.field[this.food.x][this.food.y]="food"}},{key:"setSnakeIntoField",value:function(){var e=this;this.snake.forEach((function(t,n){var i=t.x,s=t.y;e.field[i][s]=0===n?"snakeHead":"snakeBody"}))}},{key:"getNextHeadPoint",value:function(){var e=this.snake[0].x,t=this.field.length-1,n=this.snake[0].y,i=this.field[0].length-1;if("up"===this.direction){var s=n-1;return{x:e,y:s<0?i:s}}if("right"===this.direction){var a=e+1;return{x:a>t?0:a,y:n}}if("down"===this.direction){var r=n+1;return{x:e,y:r>i?0:r}}var c=e-1;return{x:c<0?t:c,y:n}}},{key:"getField",value:function(){return this.field}},{key:"getScore",value:function(){return this.score}},{key:"updateField",value:function(){var e=this.getNextHeadPoint();if("snakeBody"===this.field[e.x][e.y])return!1;if(this.snake.unshift(e),e.x===this.food.x&&e.y===this.food.y)this.score+=1,this.generateFood(),this.setFoodIntoField();else{var t=this.snake.pop();this.field[t.x][t.y]="empty"}return this.setSnakeIntoField(),!0}}]),e}(),O=10,k={empty:"#333",food:"#fc0",snakeHead:"#fff",snakeBody:"#bbb"},w=function(){function e(t,n){Object(m.a)(this,e),this.ctx=void 0,this.scaleIndex=void 0,this.ctx=t,this.scaleIndex=n,this.scaleCanvas()}return Object(x.a)(e,[{key:"drawField",value:function(e){for(var t=e.length,n=e[0].length,i=0;i<t;i++)for(var s=0;s<n;s++)this.drawCell(i,s,e[i][s])}},{key:"drawCell",value:function(e,t,n){this.ctx.fillStyle=k[n],this.ctx.fillRect(e*O,t*O,O,O)}},{key:"scaleCanvas",value:function(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.scale(this.scaleIndex,this.scaleIndex)}}]),e}(),S=function(){function e(t,n,i,s,a){Object(m.a)(this,e),this.data=void 0,this.view=void 0,this.status=void 0,this.intervalId=void 0,this.callbacks=void 0,this.data=new p(i,s),this.view=new w(t,n),this.callbacks=a,this.setStatus("unstarted")}return Object(x.a)(e,[{key:"init",value:function(){this.view.drawField(this.data.getField())}},{key:"start",value:function(){this.setStatus("active"),this.go()}},{key:"setStatus",value:function(e){this.status=e,this.callbacks.onStatusChange(e)}},{key:"go",value:function(){var e=this,t=this.data.getScore();this.intervalId=setInterval((function(){if(e.data.updateField()){var n=e.data.getScore();n>t&&(t=n,e.callbacks.onScoreChange(t),e.increaseSpeed()),e.view.drawField(e.data.getField())}else e.gameOver()}),this.getSpeed())}},{key:"increaseSpeed",value:function(){clearInterval(this.intervalId),this.go()}},{key:"getSpeed",value:function(){return Math.max(50,3e3/(this.data.getScore()+10))}},{key:"gameOver",value:function(){this.setStatus("game over"),clearInterval(this.intervalId)}},{key:"pause",value:function(){this.setStatus("pause"),clearInterval(this.intervalId)}},{key:"continue",value:function(){this.start()}},{key:"reset",value:function(){clearInterval(this.intervalId)}},{key:"updateDirection",value:function(e){this.data.updateDirection(e)}},{key:"getStatus",value:function(){return this.status}}]),e}(),N={38:"up",39:"right",40:"down",37:"left"},I=Object.keys(N).map((function(e){return Number(e)})),F=function(){var e=Object(i.useRef)(null),t=Object(i.useRef)(null),n=Object(i.useState)(window.devicePixelRatio),s=Object(d.a)(n,2),a=s[0],r=s[1],o=Object(i.useState)(0),f=Object(d.a)(o,2),m=f[0],x=f[1],y=Object(i.useState)(Number(window.localStorage.getItem("record"))),g=Object(d.a)(y,2),p=g[0],k=g[1],w=Object(i.useState)("unstarted"),F=Object(d.a)(w,2),C=F[0],E=F[1],L=function(){var n=e.current;if(n){var i=n.getContext("2d");t.current&&"unstarted"!==t.current.getStatus()&&t.current.reset();var s=new S(i,a,n.width/O/a,n.height/O/a,{onScoreChange:x,onStatusChange:E});s.init(),t.current=s,x(0),E("unstarted")}};return Object(i.useLayoutEffect)((function(){var e=window.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-resolution: 2dppx)"),t=function(){r(window.devicePixelRatio),L()};return e.addEventListener&&e.removeEventListener?(e.addEventListener("change",t),function(){e.removeEventListener("change",t)}):(e.addListener(t),function(){e.removeListener(t)})}),[]),Object(i.useLayoutEffect)((function(){L()}),[]),Object(i.useEffect)((function(){m>p&&(k(m),window.localStorage.setItem("record",m.toString()))}),[m,p]),Object(i.useEffect)((function(){var e=function(e){var n=e.keyCode;if(I.includes(n)){e.preventDefault();var i=t.current;"unstarted"===i.getStatus()&&i.start(),i.updateDirection(N[n])}};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[]),Object(c.jsxs)(u,{children:[Object(c.jsx)(l,{}),Object(c.jsxs)("div",{className:"info-row",children:[Object(c.jsx)(h,{status:C}),Object(c.jsx)(v,{record:p,score:m})]}),Object(c.jsx)(j,{ref:e}),Object(c.jsx)(b,{status:C,generateNewGame:L,pauseGame:function(){t.current.pause()},continueGame:function(){t.current.continue()}})]})},C=function(){return Object(c.jsxs)("div",{className:"content-wrapper",children:[Object(c.jsx)(o,{}),Object(c.jsx)(F,{})]})},E=function(){return Object(c.jsx)(C,{})};r.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.54151835.chunk.js.map