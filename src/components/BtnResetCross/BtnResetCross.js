import './BtnResetCross.css';

function BtnResetCross({ theme, hStyle, handleReset }) {
  return (
    <span 
      className={`btn-reset-cross btn-reset-cross_${theme}`} 
      style={hStyle} 
      onClick={handleReset}
    />
  );
}

export default BtnResetCross;