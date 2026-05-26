import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
}

function PageHeader({
  title,
  subtitle,
  extra,
}: PageHeaderProps) {
  return (
    <Flex
      justify="space-between"
      align="flex-start"
      gap={16}
      wrap
      style={{
        marginBottom: 24,
      }}
    >
      <div>
        <Title
          level={2}
          style={{
            margin: 0,
            color: "#20304d",
          }}
        >
          {title}
        </Title>

        {subtitle && (
          <Text
            style={{
              color: "#6b7280",
              fontSize: 14,
              marginTop: 4,
              display: "block",
            }}
          >
            {subtitle}
          </Text>
        )}
      </div>

      {extra && <div>{extra}</div>}
    </Flex>
  );
}

export default PageHeader;