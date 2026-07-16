import './style.css'
import javascriptLogo from './assets/javascript.svg'
import { enviromentsComponent } from './concepts/01-env';
import { callbacksComponent } from './concepts/02-callbacks';
import { promisesComponent } from './concepts/03-promesas';





document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
  
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
  
  </div>
  <div>
    <h1>ADVANCED JAVASCRIPT</h1>

  </div>
</section>

<section id="next-steps">
  <div id="docs">
  </div>
  <div id="social">
    <h2>DAVID LOPEZ</h2>
  </div>





  <div class="card">
  
    <h2 class="card__title">Card title</h2>

  </div>


</section>


<section id="spacer">
</section>
`
;



const elemnt=document.querySelector('.card');//obtengo el div

//enviromentsComponent(elemnt);//llamo a la función enviromentsComponent

//callbacksComponent(elemnt);//llamo a la función callbacksComponent

promisesComponent(elemnt);//llamo a la función promisesComponent