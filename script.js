.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* important pour passer au-dessus */
}

.popup.hidden {
  display: none;
}

.popup-content {
  background: #fff;
  color: #000;
  padding: 20px;
  border-radius: 15px;
  width: 80%;
  max-width: 300px;
  text-align: center;
  animation: pop 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2); /* effet plus propre */
}

/* Animation corrigée + fluide */
@keyframes pop {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
