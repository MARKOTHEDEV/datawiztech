import React from "react";
import Header from "../Header/Header";
import './Forbidden.css'

export default function Forbidden() {
  return (
    <div>
      {/* forbidden- */}
      <Header />
      <div id="forbidden-app">
        <div>403</div>
        <div class="forbidden-txt">
          Forbidden<span class="forbidden-blink">_</span>
        </div>
      </div>
    </div>
  );
}
