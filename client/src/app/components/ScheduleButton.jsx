import API from '../../utils/api';

const ScheduleButton = ({ token, network }) => {
  const handleClick = async () => {
    try {
      await API.post('/schedule', { token, network });
      alert('🟢 Job scheduled!');
    } catch {
      alert('❌ Schedule failed');
    }
  };

  return (
    <button onClick={handleClick} className="btn mt-2">
      Schedule Full History
    </button>
  );
};

export default ScheduleButton;
