import { toastConfig } from "react-simple-toasts";
import { LogoContainer } from "./App.styled";
import { FlowDataProvider } from "./contexts";
import { Router } from "./router/Router";
import cartoLogo from "@/assets/images/carto-logo.webp";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

export const App = () => {
  return (
    <div>
      <header>
        <LogoContainer>
          <img alt="Carto logo" className="logo react" src={cartoLogo} />
        </LogoContainer>
      </header>

      <FlowDataProvider>
        <Router />
      </FlowDataProvider>
    </div>
  );
};
