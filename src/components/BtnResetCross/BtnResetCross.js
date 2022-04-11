import './BtnResetCross.css';

function BtnResetCross({ hStyle, handleReset }) {
  return (
    <span className='btn-reset-cross' style={hStyle} onClick={handleReset} />
  );
}

export default BtnResetCross;