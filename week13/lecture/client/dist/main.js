(()=>{"use strict";class e extends HTMLAnchorElement{constructor(){super()}clickHandler(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("app-render",{detail:this.href.replace(window.location.origin,""),bubbles:!0}))}connectedCallback(){this.addEventListener("click",this.clickHandler)}disconnectedCallback(){this.removeEventListener("click",this.clickHandler)}}customElements.define("app-anchor",e,{extends:"a"});const t=function(){const e=document.createElement("template");return e.innerHTML='\n    <style>\n      #loading:not(.visible) {\n        display: none;\n      }\n    </style>\n    <div id="content">\n      <div id="loading" class="visible">Loading...</div>\n      <ul id="user-list"></ul>\n    </div>',e}();class n extends HTMLElement{#e=null;#t=null;constructor(){super(),this.#e=this.attachShadow({mode:"closed"}),this.#e.appendChild(t.content.cloneNode(!0)),this.#t=function(e){return this.#e.querySelectorAll(e)}}renderUsers(e){const[t]=this.#t("#user-list");t.innerHTML="";let n=0;for(const o of e){const e=document.createElement("li"),s=document.createElement("a");s.setAttribute("is","app-anchor"),s.href="/edit/"+n++,s.innerHTML=o,e.appendChild(s),t.appendChild(e)}}loadUsers(){const[e]=this.#t("#loading");e.classList.add("visible"),fetch("/users").then((e=>e.ok?e.json():Promise.reject(new Error("Error loading users")))).then((e=>this.renderUsers(e))).catch((e=>console.error(e))).finally((()=>e.classList.remove("visible")))}connectedCallback(){this.loadUsers()}}customElements.define("app-user-list",n);class o extends HTMLElement{#e=null;constructor(){super(),this.#e=this.attachShadow({mode:"closed"})}}customElements.define("app-edit-user",o);class s extends HTMLElement{#e=null;#n=null;config={"/edit/:id":o,"/":n};constructor(){super(),this.#e=this.attachShadow({mode:"closed"})}render(e,t=!1){let n=null;for(const[t,o]of Object.entries(this.config))if(exports.pathToRegexp(t).test(e)){n=o;break}if(n||console.error("Route not found!"),this.#n===e)return;this.#n=e;const o=new n;this.#e.children[0]&&this.#e.removeChild(this.#e.children[0]),this.#e.appendChild(o),t||history.pushState("","",e)}popstateHandler=e=>{e.preventDefault(),this.render(location.pathname,!0)};connectedCallback(){this.render(location.pathname),window.addEventListener("popstate",this.popstateHandler)}disconnectedCallback(){window.removeEventListener("popstate",this.popstateHandler)}}customElements.define("app-router",s);const a=function(){const e=document.createElement("template");return e.innerHTML='\n    <nav id="nav">\n      <a href="/" is="app-anchor">User List</a>\n      <a href="/edit/1" is="app-anchor">Edit User 1</a>\n    </nav>\n    <app-slot>AAAAAAAAAAAAAAA</app-slot>\n    ',e}();class l extends HTMLElement{#e=null;constructor(){super(),this.#e=this.attachShadow({mode:"closed"});const e=new s;this.#e.appendChild(a.content.cloneNode(!0)),this.#e.appendChild(e),this.#e.querySelector("#nav").addEventListener("app-render",(t=>{e.render(t.detail)}))}}customElements.define("app-root",l);const d=function(){const e=document.createElement("template");return e.innerHTML="\n    <slot></slot>\n    ",e}();class i extends HTMLElement{#e=null;constructor(){super(),this.#e=this.attachShadow({mode:"closed"}),this.#e.appendChild(d.content.cloneNode(!0))}}customElements.define("app-slot",i);const r=new l;document.body.appendChild(r)})();