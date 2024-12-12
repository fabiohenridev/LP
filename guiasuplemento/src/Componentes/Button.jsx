import './Button.css';

export default function Button(){
    return(
        <div>   
            
         <div className='Button'>
            <h2>Garanta já o seu!</h2>
            <h3>APENAS $9,90</h3>
            <p>Adquira o Seu eBook Agora e Comece a Mudar Sua Vida Financeira!
            Por apenas R$9,90, você terá acesso ao passo a passo das três melhores formas de ganhar dinheiro na internet.</p>
         
            <div className='Botao'>
                <button target="blank_" onClick={()=>ConnectGetway()}>COMPRAR AGORA</button>
            </div>
          </div>
        </div>
    )

    function ConnectGetway(){
        window.location.href="https://techouseofc.pay.yampi.com.br/r/MRYBDDHPFP"
    }
}