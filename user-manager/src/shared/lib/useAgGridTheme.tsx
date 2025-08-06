import { themeQuartz } from "ag-grid-community";
import { useThemeStore } from "../../app/providers/zustand/themeStore";

export const useAgGridTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  return themeQuartz.withParams({
    backgroundColor: theme === 'light' ? '#ffffff' : '#141414',
    headerBackgroundColor: theme === 'light' ? '#ffffff' : '#1f1f1f',  
    foregroundColor: theme === 'light' ? '#000000' : '#ffffff',
    headerTextColor: theme === 'light' ? '#000000' : '#f0f0f0',
  
    borderColor: theme === 'light' ? '#e0e0e0' : '#333333',
  
    selectedRowBackgroundColor:
      theme === 'light' ? 'rgba(22, 119, 255, 0.15)' : 'rgba(24, 144, 255, 0.25)',
  
    rowHoverColor: theme === 'light' ? '#fafafa' : '#1e1e1e',
  })
}