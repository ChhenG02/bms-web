import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import { navigationItems } from "../data/navigation";

const { Title } = Typography;

function AppContentHeader() {
  const location = useLocation();

  function findNavigationItem(items: typeof navigationItems): any {
    for (const item of items) {
      if (item.path === location.pathname) {
        return item;
      }

      if (item.children) {
        const found = findNavigationItem(item.children);

        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  const currentPage = findNavigationItem(navigationItems);

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


