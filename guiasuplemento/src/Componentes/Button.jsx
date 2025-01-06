import { useEffect, useState } from 'react';
import './Button.css';


export default function Button() {

    const [tamButton, setTamButton] = useState(200);
  
    // Tamanho Botao alternando

    useEffect(()=>{

     const interval = setInterval(()=>{

      setTamButton((prevTam) => (prevTam==200? 190 : 200))

     },500)



        return () => clearInterval(interval)

    }, [])

    return (
        <div>

            <div className='Button'>
                <h2 className='GarantaJa'>Garanta já o seu!</h2>
                <h3 className='Promo'>De $29,90 por</h3>
                <h3 className='Apenas499'>APENAS $4,99</h3>
                <p className='textBottom'>Adquira o Seu eBook Agora e Comece a Mudar Sua Vida Financeira!
                    Por apenas R$4,99, você terá acesso ao passo a passo das três melhores formas de ganhar dinheiro na internet.</p>

                <div className='Botao'>
                    <button style={{

                         border: tamButton, transition: `width 0.5s ease-in-out` 


                    }} target="blank_" onClick={() => ConnectGetway()}>COMPRAR AGORA</button>
                </div>
            </div>
        </div>
    )

    function ConnectGetway() {
        window.location.href = "https://techouseofc.pay.yampi.com.br/r/9ICECVUDD3"
    }

}