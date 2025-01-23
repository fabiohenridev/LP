import { useState, useEffect } from 'react'; 
import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, set, get, onDisconnect, onValue } from 'firebase/database'; 
import { getAnalytics } from 'firebase/analytics'; 
import './Footer.css'; 
import axios from 'axios';

// Função para registrar o usuário online
const registerUser = (userId, database) => {
  const userRef = ref(database, 'onlineUsers/' + userId);
  set(userRef, {
    isOnline: true,
    lastSeen: Date.now()  // Marca o horário da última interação
  });

  // Garantir que o status "offline" seja atribuído quando a conexão for perdida
  onDisconnect(userRef).set({
    isOnline: false,
    lastSeen: Date.now(),
  });
};

// Função para remover o usuário online
const removeUser = (userId, database) => {
  const userRef = ref(database, 'onlineUsers/' + userId);
  set(userRef, {
    isOnline: false,
    lastSeen: Date.now(),
  });
};

// Função para verificar e contar o número de usuários online (baseado no timestamp)
const getOnlineUsers = (setOnlineUsers, database) => {
  const usersRef = ref(database, 'onlineUsers');
  onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    if (users) {
      const onlineUsers = Object.keys(users).filter(userId => {
        const user = users[userId];
        return user.isOnline && (Date.now() - user.lastSeen < 5 * 60 * 1000);  // Considera online se a última atividade foi nos últimos 5 minutos
      }).length;

      setOnlineUsers(onlineUsers);  // Atualiza o estado com a quantidade de online
    } else {
      setOnlineUsers(0);  // Caso não haja nenhum usuário online
    }
  });
};

const handleDownload = async () => {
  try {
    const response = await axios.get('http://localhost:3000/download', {
      responseType: 'blob',  // Indicamos que esperamos um arquivo binário
    });

    // Criando um link temporário para o arquivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'meuarquivo.pdf');  // Nome do arquivo no download

    // Simula o clique no link para iniciar o download
    document.body.appendChild(link);
    link.click();

    // Limpeza do link temporário
    document.body.removeChild(link);
  } catch (error) {
    console.error("Erro ao baixar o arquivo:", error);
  }
};

export default function Footer() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);
  const [largura, setLargura] = useState(0);
  const [adm, setAdm] = useState(false);
  const [senha, setSenha] = useState('');
  const [divSenha, setDivSenha] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [corOlho, setCorOlho] = useState('rgb(0, 255, 60)');

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCIRvIecgxWjdpQ-So34HMQd43p9hodLzQ",
      authDomain: "henriquelima-e3e88.firebaseapp.com",
      projectId: "henriquelima-e3e88",
      storageBucket: "henriquelima-e3e88.firebasestorage.app",
      messagingSenderId: "473781875946",
      appId: "1:473781875946:web:1dea7875cf570f13761393",
      measurementId: "G-F02G7EDC98",
      databaseURL: "https://henriquelima-e3e88-default-rtdb.firebaseio.com/"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const analytics = getAnalytics(app);

    const userId = Date.now();  // Gerando um ID único com o timestamp

    registerUser(userId, database);
    getOnlineUsers(setOnlineUsers, database);

    return () => {
      removeUser(userId, database);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCorOlho((prevCor) => (prevCor === 'rgb(0, 255, 60)' ? 'white' : 'rgb(0, 255, 60)'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const OpenDivSenha = () => {
    setDivSenha(true);
  };

  const OpenAdm = () => {
    setAdm(true);
  };

  const CloseAdm = () => {
    setAdm(false);
    setDivSenha(false);
  };

  const SenhaMen = () => {
    if (senha === 'dhs6hsj') {
      alert('Login bem-sucedido!');
      OpenDivSenha();  // Libera o acesso ao conteúdo após a senha correta
    } else {
      alert('Senha incorreta');
    }
  };

  const AbrirMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const Whatsapp = () => {
    window.location.href = 'https://wa.me/5584991562754?text=Ol%C3%A1,%20Gostaria%20de%20saber%20mais%20sobre%20o%20e-book...';
  };

  const AbrirPrivacidade = () => {
    setPrivacidade(!privacidade);
    setLargura(500);
    if (privacidade) {
      setLargura(0);
    }
  };

  return (
    <div className="BoxF1">
      <div style={{ marginTop: largura }} className="BoxF2">
        <h4>TODOS OS DIREITOS RESERVADOS</h4>
        <h4 className="Sobre" onClick={AbrirMenu}>SOBRE NÓS</h4>
        {menuAberto && (
          <div className="TextSobre">
            <p>Bem-vindo à nossa loja de eBooks! Há três anos, estamos no mercado oferecendo uma experiência de leitura digital de alta qualidade para nossos clientes. Com um compromisso constante com a excelência, nossa missão é fornecer eBooks diversificados e enriquecedores que atendam aos mais variados interesses e necessidades.</p>
          </div>
        )}
        <h4 onClick={AbrirPrivacidade} className="Sobre">POLÍTICAS DE PRIVACIDADE</h4>
        {privacidade && (
          <div className="TextSobre">
            <p>Política de privacidade...</p>
          </div>
        )}
        <h4 className="Sobre" onClick={Whatsapp}>WHATSAPP</h4>
        <h4 onClick={OpenAdm} className="Sobre">ADM</h4>
        {adm && (
          <div>
            <div className="password">
              <button onClick={CloseAdm} className="ClosePass">x</button>
              <h2>Login</h2>
              <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
              />
              <button onClick={SenhaMen}>Entrar</button>
              {divSenha && (
                <div>
                  <div className='baixar'>
                    <h3 style={{ color: 'white', fontFamily: 'monospace', fontSize: '12px' }}>
                      <i style={{ fontSize: '10px', color: corOlho }} className="bi bi-eye-fill"></i> Pessoas online: {onlineUsers}
                    </h3>
                    <button className='e-book' onClick={handleDownload}>Baixar e-book</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <img src="/pagamentos-2.png" alt="Pagamentos" />
      </div>
    </div>
  );
}
