// Server-rendered and driven by a tiny inline script, so it opens the moment the hero image is in
// instead of waiting for React to hydrate. Styles live in globals.scss (#pl).
const markup = `<div class="pl-circle"><img src="/icons/dsu-lockup.png" alt="" width="376" height="122"></div>`;

const script = `(function(){var s=document.getElementById("pl");if(!s)return;var o=0;
function go(){if(o)return;o=1;s.classList.add("pl-open")}
s.addEventListener("animationend",function(e){if(e.target===s)s.style.display="none"});
document.addEventListener("load",function(e){var t=e.target;if(t&&t.tagName==="IMG"&&t.closest&&t.closest("main"))go()},true);
function arm(){var i=document.querySelector("main img");if(!i||i.complete)go();else i.addEventListener("load",go,{once:true})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",arm);else arm();
window.addEventListener("load",go);setTimeout(go,8000)})()`;

/** Burgundy screen with the logo in a still white circle; once the hero is in, the circle floods the screen and lifts away. */
export function Preloader() {
  return (
    <>
      <div id="pl" role="status" aria-label="Loading CDSIMER" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: markup }} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <style>{"#pl{display:none}"}</style>
      </noscript>
    </>
  );
}
