import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { ThemeContext } from "./contexts/ThemeContext";
import { useState } from "react";
import { ThemeLoader } from "./components/changeTheme";

export const Layout = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <ThemeLoader></ThemeLoader>
        <Header
          onChangeTheme={() => {
            setTheme(theme === "light" ? "dark" : "light");
            localStorage.setItem('theme', theme === "light" ? "dark" : "light" )
          }}
        ></Header>
        <Main></Main>
      </ThemeContext.Provider>
    </div>
  );
};
