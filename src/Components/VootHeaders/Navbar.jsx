import React from "react";
import "./header.css"
import VootMenu from "./VootMenu";
const Navbar = (props) => {
  return (
    <div>
      <section id="vootHeaders">
        <article>
          <div className="vootLogo">
            <a href="/">
              <img src="Voot-Logo.svg" alt="logo" />
            </a>
         
            <img src="./upgrade-line.svg" alt="Voot Upgrade" title="Upgrade" class="jss22"></img>
           <a href="/login"><button>upgrade</button></a>
           
          </div>
          <div className="vootMenu">
            <VootMenu users={props.users}/>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Navbar;