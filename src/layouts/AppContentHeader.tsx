import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import { navigationItems } from "../data/navigation";



const { Title } = Typography;

function AppContentHeader() {
  const location = useLocation();

  const currentPage = navigationItems.find(
    (item) => item.path === location.pathname
  );

  if (!currentPage) return null;

  return (
    <div
      style={{
        marginBottom: 24,
      }}
    >
      <Title
        level={2}
        style={{
          margin: 0,
          color: "#20304d",
        }}
      >
        {currentPage.title}
      </Title>
    </div>
  );
}

export default AppContentHeader;