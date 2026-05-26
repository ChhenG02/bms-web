import {
  CameraOutlined,
  CheckOutlined,
  EditOutlined,
  KeyOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  SafetyOutlined,
  IdcardOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Row,
  Tag,
  Tabs,
  Upload,
  Flex,
  Divider,
  Descriptions,
  ConfigProvider,
} from "antd";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileState {
  name: string;
  nameKh: string;
  email: string;
  phone: string;
  gender: "ប្រុស" | "ស្រី";
  role: string;
  avatar?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ROLE_STYLE: Record<string, { bg: string; color: string }> = {
  "Super Admin": { bg: "#eff2ff", color: "#4f74e8" },
  Admin: { bg: "#f5f3ff", color: "#7c3aed" },
  Staff: { bg: "#ecfeff", color: "#0891b2" },
};

// ─── Main Component ──────────────────────────────────────────────────────────

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [profile, setProfile] = useState<ProfileState>({
    name: "Sokchan",
    nameKh: "សុខចាន់",
    email: "sokchan@gmail.com",
    phone: "012 345 678",
    gender: "ស្រី",
    role: "Admin",
  });

  const [editForm, setEditForm] = useState<ProfileState>({ ...profile });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const set = <K extends keyof ProfileState>(k: K, v: ProfileState[K]) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const handleStartEdit = () => {
    setEditForm({ ...profile });
    setEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setEditingProfile(false);
  };

  const handleSaveProfile = () => {
    setProfile({ ...editForm });
    setProfileSaved(true);
    setEditingProfile(false);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSavePassword = () => {
    if (!passwords.current)
      return setPasswordError("សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន");
    if (passwords.next.length < 6)
      return setPasswordError("ពាក្យសម្ងាត់ថ្មីត្រូវមានយ៉ាងហោចណាស់ ៦ តួ");
    if (passwords.next !== passwords.confirm)
      return setPasswordError("ពាក្យសម្ងាត់មិនដូចគ្នា");
    setPasswordError("");
    setPasswordSaved(true);
    setPasswords({ current: "", next: "", confirm: "" });
    setShowChangePassword(false);
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  const roleStyle = ROLE_STYLE[profile.role] ?? ROLE_STYLE["Staff"];

  const inputStyle = {
    borderRadius: 8,
    borderColor: "#e5e7eb",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: "#4b5563",
    marginBottom: 8,
    display: "block",
  };

  // Tab items configuration
  const tabItems = [
    {
      key: "general",
      label: (
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          <IdcardOutlined style={{ marginRight: 8 }} />
          ព័ត៌មានទូទៅ
        </span>
      ),
      children: (
        <div style={{ marginTop: 8 }}>
          {!editingProfile ? (
            // VIEW MODE - Clean read-only display
            <div>
              <Descriptions
                column={1}
                style={{ marginTop: 8 }}
                labelStyle={{
                  fontWeight: 600,
                  color: "#4b5563",
                  width: 140,
                  display: "inline-block",
                  paddingBottom: 16,
                }}
                contentStyle={{
                  paddingBottom: 16,
                  color: "#374151",
                }}
              >
                <Descriptions.Item label="ឈ្មោះ (ឡាតាំង)">
                  {profile.name}
                </Descriptions.Item>

                <Descriptions.Item label="ឈ្មោះ (ខ្មែរ)">
                  {profile.nameKh}
                </Descriptions.Item>

                <Descriptions.Item label="អ៊ីមែល">
                  {profile.email}
                </Descriptions.Item>

                <Descriptions.Item label="លេខទូរស័ព្ទ">
                  {profile.phone}
                </Descriptions.Item>

                <Descriptions.Item label="ភេទ">
                  {profile.gender}
                </Descriptions.Item>

                <Descriptions.Item label="តួនាទី">
                  <Tag
                    style={{
                      borderRadius: 20,
                      paddingInline: 14,
                      height: 28,
                      display: "inline-flex",
                      alignItems: "center",
                      fontWeight: 600,
                      fontSize: 12,
                      background: roleStyle.bg,
                      color: roleStyle.color,
                      border: "none",
                    }}
                  >
                    {profile.role}
                  </Tag>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                    តួនាទីត្រូវបានគ្រប់គ្រងដោយ Super Admin
                  </div>
                </Descriptions.Item>
              </Descriptions>

              <Divider
                style={{ margin: "24px 0 20px", borderColor: "#f1f5f9" }}
              />

              <Flex justify="flex-end">
                <Button
                  type="primary"
                  size="large"
                  icon={<EditOutlined />}
                  onClick={handleStartEdit}
                  style={{
                    borderRadius: 10,
                    height: 44,
                    paddingInline: 32,
                    fontWeight: 600,
                    background: "#4f74e8",
                    border: "none",
                  }}
                >
                  កែប្រែព័ត៌មាន
                </Button>
              </Flex>
            </div>
          ) : (
            // EDIT MODE - Full form
            <div>
              <div
                style={{
                  marginBottom: 24,
                  padding: "12px 16px",
                  background: "#f8fafc",
                  borderRadius: 8,
                  border: "1px solid #f1f5f9",
                }}
              >
                <Flex align="center" gap={8}>
                  <EditOutlined style={{ color: "#4f74e8" }} />
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    កំពុងកែប្រែព័ត៌មានផ្ទាល់ខ្លួន
                  </span>
                </Flex>
              </div>

              <Row gutter={[32, 16]}>
                <Col xs={24} sm={12}>
                  <label style={labelStyle}>ឈ្មោះ (អក្សរឡាតាំង)</label>
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="បញ្ចូលឈ្មោះជាអក្សរឡាតាំង"
                    size="large"
                    style={inputStyle}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>ឈ្មោះ (អក្សរខ្មែរ)</label>
                  <Input
                    value={editForm.nameKh}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nameKh: e.target.value })
                    }
                    placeholder="បញ្ចូលឈ្មោះជាអក្សរខ្មែរ"
                    size="large"
                    style={inputStyle}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>អ៊ីមែល</label>
                  <Input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    size="large"
                    style={inputStyle}
                    type="email"
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>លេខទូរស័ព្ទ</label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    placeholder="012 345 678"
                    size="large"
                    style={inputStyle}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>ភេទ</label>
                  <Flex gap={12}>
                    {(["ប្រុស", "ស្រី"] as const).map((g) => (
                      <Button
                        key={g}
                        onClick={() => setEditForm({ ...editForm, gender: g })}
                        type={editForm.gender === g ? "primary" : "default"}
                        size="large"
                        style={{
                          flex: 1,
                          height: 40,
                          borderRadius: 8,
                          borderColor:
                            editForm.gender === g ? "#4f74e8" : "#e5e7eb",
                          backgroundColor:
                            editForm.gender === g ? "#4f74e8" : "#fff",
                          color: editForm.gender === g ? "#fff" : "#6b7280",
                          fontWeight: editForm.gender === g ? 600 : 400,
                        }}
                      >
                        {g === "ប្រុស" ? "ប្រុស" : "ស្រី"}
                      </Button>
                    ))}
                  </Flex>
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>តួនាទី</label>
                  <Input
                    value={editForm.role}
                    disabled
                    size="large"
                    style={{ ...inputStyle, background: "#f9fafb" }}
                  />
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                    តួនាទីត្រូវបានគ្រប់គ្រងដោយ Super Admin
                  </div>
                </Col>
              </Row>

              <Divider
                style={{ margin: "28px 0 20px", borderColor: "#f1f5f9" }}
              />

              <Flex gap={12} justify="flex-end">
                <Button
                  size="large"
                  icon={<CloseOutlined />}
                  onClick={handleCancelEdit}
                  style={{
                    borderRadius: 10,
                    height: 44,
                    paddingInline: 28,
                    fontWeight: 600,
                  }}
                >
                  បោះបង់
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={profileSaved ? <CheckOutlined /> : undefined}
                  onClick={handleSaveProfile}
                  style={{
                    borderRadius: 10,
                    height: 44,
                    paddingInline: 32,
                    fontWeight: 600,
                    background: profileSaved ? "#16a34a" : "#4f74e8",
                    border: "none",
                    transition: "all 0.3s",
                  }}
                >
                  {profileSaved ? "រក្សាទុករួចហើយ!" : "រក្សាទុក"}
                </Button>
              </Flex>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "security",
      label: (
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          <SafetyOutlined style={{ marginRight: 8 }} />
          សន្តិសុខ
        </span>
      ),
      children: (
        <div style={{ marginTop: 8 }}>
          {!showChangePassword ? (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
              <LockOutlined
                style={{ fontSize: 56, color: "#d1d5db", marginBottom: 20 }}
              />
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
                ពាក្យសម្ងាត់របស់អ្នកត្រូវបានការពារ
              </div>
              <Button
                type="primary"
                size="large"
                icon={<KeyOutlined />}
                onClick={() => setShowChangePassword(true)}
                style={{
                  borderRadius: 10,
                  height: 44,
                  paddingInline: 32,
                  fontWeight: 600,
                  background: "#4f74e8",
                  border: "none",
                }}
              >
                ផ្លាស់ប្តូរពាក្យសម្ងាត់
              </Button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  marginBottom: 24,
                  padding: "12px 16px",
                  background: "#f8fafc",
                  borderRadius: 8,
                  border: "1px solid #f1f5f9",
                }}
              >
                <Flex align="center" gap={8}>
                  <KeyOutlined style={{ color: "#4f74e8" }} />
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    កំពុងផ្លាស់ប្តូរពាក្យសម្ងាត់
                  </span>
                </Flex>
              </div>

              <Row gutter={[32, 16]}>
                <Col xs={24}>
                  <label style={labelStyle}>ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
                  <Input.Password
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords((p) => ({ ...p, current: e.target.value }))
                    }
                    placeholder="បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន"
                    size="large"
                    style={inputStyle}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>ពាក្យសម្ងាត់ថ្មី</label>
                  <Input.Password
                    value={passwords.next}
                    onChange={(e) =>
                      setPasswords((p) => ({ ...p, next: e.target.value }))
                    }
                    placeholder="យ៉ាងហោចណាស់ ៦ តួ"
                    size="large"
                    style={inputStyle}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <label style={labelStyle}>បញ្ជាក់ពាក្យសម្ងាត់ថ្មី</label>
                  <Input.Password
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((p) => ({ ...p, confirm: e.target.value }))
                    }
                    placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                    size="large"
                    style={inputStyle}
                    status={
                      passwords.confirm && passwords.confirm !== passwords.next
                        ? "error"
                        : ""
                    }
                  />
                </Col>
              </Row>

              {passwordError && (
                <div
                  style={{
                    marginTop: 20,
                    padding: "10px 14px",
                    background: "#fef2f2",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#dc2626",
                    fontWeight: 500,
                  }}
                >
                  ⚠️ {passwordError}
                </div>
              )}

              <Divider
                style={{ margin: "28px 0 20px", borderColor: "#f1f5f9" }}
              />

              <Flex gap={12} justify="flex-end">
                <Button
                  size="large"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordError("");
                    setPasswords({ current: "", next: "", confirm: "" });
                  }}
                  style={{
                    borderRadius: 10,
                    height: 44,
                    paddingInline: 24,
                    fontWeight: 600,
                  }}
                >
                  បោះបង់
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={passwordSaved ? <CheckOutlined /> : <KeyOutlined />}
                  onClick={handleSavePassword}
                  style={{
                    borderRadius: 10,
                    height: 44,
                    paddingInline: 28,
                    fontWeight: 600,
                    background: passwordSaved ? "#16a34a" : "#4f74e8",
                    border: "none",
                    transition: "all 0.3s",
                  }}
                >
                  {passwordSaved ? "រក្សាទុករួចហើយ!" : "រក្សាទុកពាក្យសម្ងាត់"}
                </Button>
              </Flex>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          borderRadiusLG: 8,
          controlHeightLG: 48,
        },
      }}
    >
      <div>
        <PageHeader
          title="គណនីរបស់ខ្ញុំ"
        />

        <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
          {/* Left Column - Profile Summary */}
          <Col xs={24} md={6}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid #f1f5f9",
                boxShadow: "none",
                height: "100%",
              }}
              styles={{ body: { padding: "24px" } }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginBottom: 16,
                  }}
                >
                  <Avatar
                    size={88}
                    src={profile.avatar}
                    icon={!profile.avatar && <UserOutlined />}
                    style={{
                      background: "#e0e7ff",
                      color: "#4f74e8",
                      border: "3px solid #fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      fontSize: 38,
                    }}
                  />
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      const reader = new FileReader();
                      reader.onload = (e) =>
                        set("avatar", e.target?.result as string);
                      reader.readAsDataURL(file);
                      return false;
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#4f74e8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        border: "2px solid #fff",
                      }}
                    >
                      <CameraOutlined style={{ color: "#fff", fontSize: 12 }} />
                    </div>
                  </Upload>
                </div>

                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  {profile.name}
                </div>

                <div
                  style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}
                >
                  {profile.nameKh}
                </div>

                <Tag
                  style={{
                    marginBottom: 20,
                    borderRadius: 20,
                    paddingInline: 12,
                    height: 26,
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: 11,
                    background: roleStyle.bg,
                    color: roleStyle.color,
                    border: "none",
                  }}
                >
                  {profile.role}
                </Tag>

                <Divider style={{ margin: "16px 0", borderColor: "#f1f5f9" }} />

                <div style={{ textAlign: "left", fontSize: 13 }}>
                  <Flex align="center" style={{ marginBottom: 12 }}>
                    <MailOutlined
                      style={{ color: "#9ca3af", fontSize: 13, width: 22 }}
                    />
                    <span style={{ color: "#4b5563", marginLeft: 8 }}>
                      {profile.email}
                    </span>
                  </Flex>
                  <Flex align="center" style={{ marginBottom: 12 }}>
                    <PhoneOutlined
                      style={{ color: "#9ca3af", fontSize: 13, width: 22 }}
                    />
                    <span style={{ color: "#4b5563", marginLeft: 8 }}>
                      {profile.phone}
                    </span>
                  </Flex>
                  <Flex align="center">
                    <UserOutlined
                      style={{ color: "#9ca3af", fontSize: 13, width: 22 }}
                    />
                    <span style={{ color: "#4b5563", marginLeft: 8 }}>
                      {profile.gender}
                    </span>
                  </Flex>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Column - Tabs */}
          <Col xs={24} md={18}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid #f1f5f9",
                boxShadow: "none",
                height: "100%",
              }}
              styles={{ body: { padding: "24px 28px" } }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                tabBarStyle={{
                  borderBottom: "1px solid #f1f5f9",
                  marginBottom: 24,
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <style>
        {`
          .ant-input:focus,
          .ant-input-focused,
          .ant-input-affix-wrapper:focus,
          .ant-input-affix-wrapper-focused {
            border-color: #4f74e8 !important;
            box-shadow: 0 0 0 2px rgba(79, 116, 232, 0.08) !important;
          }
          
          .ant-tabs-tab:hover {
            color: #4f74e8 !important;
          }
          
          .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #4f74e8 !important;
            font-weight: 600 !important;
          }
          
          .ant-tabs-ink-bar {
            background: #4f74e8 !important;
          }
          
          .ant-btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          
          .ant-descriptions-item-label {
            font-weight: 600;
            color: #4b5563;
          }
        `}
      </style>
    </ConfigProvider>
  );
}

export default ProfilePage;
