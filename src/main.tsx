import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "@/assets/styles/reset.css";
import "@/assets/styles/index.css";
import { store } from "@/services/store";
import App from "@/components/app/app";
import { worker } from "@/mocks";

worker.start().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
