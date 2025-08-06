import { ConfigProvider, theme as antdTheme } from 'antd';
import { useThemeStore } from '../../app/providers/zustand/themeStore';

export const AntdWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ConfigProvider
    theme={{
      algorithm:
        theme === 'light'
          ? antdTheme.defaultAlgorithm
          : antdTheme.darkAlgorithm,
      token: {
        colorPrimary: '#1677ff',
        colorBgContainer: theme === 'light' ? '#ffffff' : '#141414',
        colorText: theme === 'light' ? '#000000' : '#ffffff',
        colorTextSecondary: theme === 'light' ? '#595959' : '#bfbfbf',
      }}}
    >
      {children}
    </ConfigProvider>
  );
};