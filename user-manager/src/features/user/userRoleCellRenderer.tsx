import { UserOutlined, UserAddOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { EUserRoles } from "../../entities/user";

export const UserRoleCellRenderer = ({value}:{value:string}) =>{
  const renderUserIcon = () => {
    switch (value) {
      case EUserRoles.Admin:
        return <UserAddOutlined/>;
      case EUserRoles.Moderator:
        return <UserSwitchOutlined/>;
      case EUserRoles.User:
        return <UserOutlined/>;
    }
  }
  return(
  <div className="flex items-center gap-2">
    {renderUserIcon()}
    <span className="capitalize">{value}</span>
  </div>
  )
}