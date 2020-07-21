import React from "react";
import { LocaleProvider } from '../contexts/locale';
import { ModalProvider } from '../contexts/modal';
import RoutesNav from "../containers/routes/index";

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev
      }),
    children
  );

  
const App = () => {
  return (
    <AppProvider contexts={[ModalProvider, LocaleProvider]}>
      <div className="App">
        <RoutesNav />
      </div>
    </AppProvider>
  );
};

export default App;
