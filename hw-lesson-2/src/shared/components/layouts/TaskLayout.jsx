import { THEME } from "../../constants/index.js";

const TaskLayout = ({ children }) => {
  return (
    <div className={`min-h-screen ${THEME.background}`}>
      <div className={THEME.container}>
        {children}
      </div>
    </div>
  );
};

export default TaskLayout;
