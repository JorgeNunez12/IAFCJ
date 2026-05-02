import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjH9koVLmJrklBq4me11NDkDCCBqll3IE",
  authDomain: "iafcj-eldorado.firebaseapp.com",
  projectId: "iafcj-eldorado",
  storageBucket: "iafcj-eldorado.firebasestorage.app",
  messagingSenderId: "607845285014",
  appId: "1:607845285014:web:8a1148f7511844fe2dd6b7"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

window.guardarVisita = function (datos) {
  return addDoc(collection(db, 'visitas'), { ...datos, registrado: serverTimestamp() });
};

window.guardarOracion = function (datos) {
  return addDoc(collection(db, 'oraciones'), { ...datos, fecha: serverTimestamp() });
};
