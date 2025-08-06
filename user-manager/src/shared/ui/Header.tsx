import { Layout, Switch } from "antd"
import { useThemeStore } from "../../app/providers/zustand/themeStore";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
export const Header = ()=>{
  const { theme, toggleTheme } = useThemeStore();

  return(
    <Layout.Header className='h-[10%] flex items-center justify-between'>
    <span className='text-2xl text-gray-50'>User Management</span>
    <div className="flex items-center gap-2">
      <span className='text-gray-50'>Dark Mode</span>
      <Switch
      checked={theme === 'dark'}
      checkedChildren={<SunOutlined/>}
      unCheckedChildren={<MoonOutlined/>}
      style={{backgroundColor: theme === 'dark' ? '#141414' : '#8899FF'}}
      onClick={toggleTheme}/>
    </div>

  </Layout.Header>
  )
}