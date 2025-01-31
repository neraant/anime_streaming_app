import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext()

export const useSidabar = () => {
	return useContext(SidebarContext)
}

export const SidebarProvider = ({ children }) => {
	const [isSidebar, setIsSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebar, setIsSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}