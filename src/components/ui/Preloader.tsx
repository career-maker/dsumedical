// Server-rendered and driven by a tiny inline script, and opens at DOMContentLoaded (never waits on images, which would hold back FCP/LCP). Styles live in globals.scss (#pl).
const markup = `<div class="pl-circle"><img src="/icons/dsu-lockup.png" alt="" width="376" height="122"></div>`;

const script = `(function(){var s=document.getElementById("pl");if(!s)return;var o=0;
function go(){if(o)return;o=1;s.classList.add("pl-open")}
s.addEventListener("animationend",function(e){if(e.target===s)s.style.display="none"});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
window.addEventListener("load",go);setTimeout(go,1500)})()`;

/** Burgundy screen with the logo in a still white circle; once the hero is in, the circle floods the screen and lifts away. */
export function Preloader() {
  return (
    <>
      <div id="pl" role="status" aria-label="Loading CDSIMER" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: markup }} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
