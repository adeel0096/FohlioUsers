import { EUserStatus } from "../../entities/user"

const StatusColourMap : {[key:string]: string} = {
  [EUserStatus.ACTIVE]: "bg-green-100",
  [EUserStatus.BANNED]: "bg-red-100",
  [EUserStatus.Pending]: "bg-yellow-100",
}
export const UserStatusCellRenderer = ({value}:{value:string}) =>{
  return(
    <span
      className={`text-black px-2 py-1 text-xs font-medium rounded-full ${StatusColourMap[value]}`}
    >
    {value}
  </span>
  )
}