import './BtnResetCross.css';

function BtnResetCross({ theme, hStyle, onClick }) {
  return (
    <span 
      className={`btn-reset-cross btn-reset-cross_theme-${theme}`} 
      style={hStyle} 
      onClick={onClick}
    />
  );
}

export default BtnResetCross;