import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeLoader = () => {
  const contextTheme = useContext(ThemeContext); 
  const localTheme = localStorage.getItem("theme");
  const theme = localTheme || contextTheme;

  useEffect(() => {
    const id = "theme-css";
    let link = document.getElementById(id);

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = id;
      document.head.appendChild(link);
    }

    const base = import.meta.env.BASE_URL || "/";
    console.log(base)
    const validTheme = theme === "light" || theme === "dark" ? theme : "light";
    link.href = `${base}theme/${validTheme}Root.css`;
  }, [theme]);

  return null;
};
