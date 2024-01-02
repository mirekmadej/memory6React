import React from 'react';
import { useState } from 'react';
import './App.css';
import tyl from './img/tyl.png';
import k1 from './img/k1.png';
import k2 from './img/k2.png';
import k3 from './img/k3.png';

const Karty = [tyl, k1, k2, k3];
let los = [1,3,3,2,1,2];
let kp=-1;
let kd=-1;
let kt = [0,0,0,0,0,0];
let lp = 0;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function Karta({k, klik}){

  return(
    <button className='obrazek' onClick={klik}>
      <img src={k} alt="obrazek" />
    </button>
  );
}


function App() {
  
  let [karty, setKarty] = useState(Array(6).fill(tyl));

  async function obslugaKlik(i)
  {
    if(kt[i]==-1) return;
    const k = karty.slice();
    console.log(i, kp, kd, kt);
    if(kp > -1 && kd === -1)
    {
      lp++;
      kd = i;
      kt[i] = los[i];     
      console.log(i);
      k[i] = Karty[los[i]];
      setKarty(k);
      console.log('druga ', i, kp, kd, kt);
      await delay(3000);
      

      if(kt[kp] == kt[kd] )
      {
          console.log('rowne');
          kt[kp] = -1;
          kt[kd] = -1;
          kp = -1;
          kd = -1;
          return;
      }
      else
      {
        console.log('rozne');
        const k2 = karty.slice();
        k2[kp] = tyl;
        k2[kd] = tyl;
        setKarty(k2);
        kt[kp] = 0;
        kt[kd] = 0;
        kp = -1;
        kd = -1;
        return;
        
      }
    }
    if(kp === -1)
    {
      kt[i] = los[i];
      kp = i;
      console.log('pierwsza ', i, kp, kd, kt);
      k[i] = Karty[los[i]];
      setKarty(k); 
    }

    console.log('po f ',i, kp, kd, kt);

    
  }
  function Proby() {
    return(
      <>
        <h2>liczba prób: {lp}</h2>
      </>
    );
  }

  return (
    <div className="App">
      <h1>Memory</h1>
      {kt}
      <div className='wiersz'>
        <Karta k={karty[0]} klik={()=>obslugaKlik(0)} />
        <Karta k={karty[1]} klik={()=>obslugaKlik(1)} />
        <Karta k={karty[2]} klik={()=>obslugaKlik(2)} />
      </div>
      <div className='wiersz'>
        <Karta k={karty[3]}  klik={()=>obslugaKlik(3)} />
        <Karta k={karty[4]}  klik={()=>obslugaKlik(4)} />
        <Karta k={karty[5]}  klik={()=>obslugaKlik(5)} />
      </div>
      <div className='proby'>
        <Proby />
      </div>
      <div>
        
      </div>
      
    </div>
  );
}

export default App;
