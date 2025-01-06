import { useEffect, useState } from 'react';
import './Button.css';
import { use } from 'react';


export default function Button() {
 
const [Font, setFont] = useState('20px');

useState(()=>{

const interval = setInterval(()=>{

setFont((prevFont)=> (prevFont == '20px' ? '18px' : '20px'))



}, 500)



return () => clearInterval(interval)

})

    return (
        <div>

            <div className='Button'>
                <h2 className='GarantaJa'>Garanta já o seu!</h2>
                <h3 className='Promo'>De $29,90 por</h3>
                <div className='Apenas'>
                <h3 style={{fontSize: Font, position:'relative', transition: `font-size 0.5s ease-in-out`, display: 'inline-block'}} className='Apenas499'>APENAS $4,99</h3>
                </div>
                <p className='textBottom'>Adquira o Seu eBook Agora e Comece a Mudar Sua Vida Financeira!
                    Por apenas R$4,99, você terá acesso ao passo a passo das três melhores formas de ganhar dinheiro na internet.</p>

                <div className='Botao'>
                    <button  target="blank_" onClick={() => ConnectGetway()}>COMPRAR AGORA</button>
                </div>
            </div>
        </div>
    )

    function ConnectGetway() {
        window.location.href = "https://techouseofc.pay.yampi.com.br/r/9ICECVUDD3"
    }

}