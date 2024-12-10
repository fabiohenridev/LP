import './Button.css';

export default function Button(){
    return(
        <div>
         <div className='Button'>
            <h2>Garanta já o seu!</h2>
            <p>Não perca tempo! Invista na sua saúde e transforme seus resultados hoje mesmo. Clique no botão abaixo e adquira o Guia Prático de Suplementação agora.</p>
            <div className='Botao'>
            <button onClick={()=>ConnectGetway()}>COMPRAR AGORA</button>
            </div>
         </div>
        </div>
    )

    function ConnectGetway(){
        window.location.href="https://techouseofc.pay.yampi.com.br/r/MRYBDDHPFP"
    }
}