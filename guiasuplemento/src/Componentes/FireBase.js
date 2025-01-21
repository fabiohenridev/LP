import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onDisconnect } from "firebase/database"; // Importando funções do Firebase

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIRvIecgxWjdpQ-So34HMQd43p9hodLzQ",
  authDomain: "henriquelima-e3e88.firebaseapp.com",
  projectId: "henriquelima-e3e88",
  storageBucket: "henriquelima-e3e88.firebasestorage.app",
  messagingSenderId: "473781875946",
  appId: "1:473781875946:web:1dea7875cf570f13761393",
  measurementId: "G-F02G7EDC98",
  databaseURL: "https://henriquelima-e3e88-default-rtdb.firebaseio.com/" // Adicionando a URL do Realtime Database
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para registrar um usuário como online
export const registerUser = (userId) => {
  // Ref para o usuário específico no Realtime Database
  const userRef = ref(database, 'onlineUsers/' + userId);
  
  // Registrar o usuário como online
  set(userRef, {
    isOnline: true,
  });

  // Garantir que o status "offline" seja atribuído quando a conexão for perdida
  onDisconnect(userRef).set({
    isOnline: false,
  });
};

// Função para remover um usuário manualmente (quando necessário)
export const removeUser = (userId) => {
  set(ref(database, 'onlineUsers/' + userId), {
    isOnline: false,
  });
};

const getOnlineUsers = (setOnlineUsers, database) => {
  const usersRef = ref(database, 'onlineUsers');
  onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    if (users) {
      const onlineUsers = Object.keys(users).filter(userId => {
        const user = users[userId];
        // Considera usuário online apenas se ele foi ativo nos últimos 5 minutos
        return user.isOnline && (Date.now() - user.lastSeen < 5 * 60 * 1000);
      }).length;

      setOnlineUsers(onlineUsers);  // Atualiza o estado com o número de online
    } else {
      setOnlineUsers(0);  // Caso não haja usuários online
    }
  });
};