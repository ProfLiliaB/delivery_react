import { FaSpinner } from 'react-icons/fa';
import '../styles/Spinner.css';

function Spinner({ tamanho = 20 }) {
  return (
    <FaSpinner
      className="spinner"
      size={tamanho}
      aria-label="Carregando"
      role="status"
    />
  );
}

export default Spinner;
