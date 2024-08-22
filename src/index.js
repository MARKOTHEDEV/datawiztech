import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./useContext/useContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorPage/ErrorBoundary";
import Error from "./components/ErrorPage/Error";

// const queryClient = new QueryClient();
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthContextProvider>
            <Toaster 
            // position="top-center"
             toastOptions={{ duration: 2000 }} />
            <App />
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import {AuthContextProvider} from "./useContext/useContext";
// import { Toaster } from "react-hot-toast";

// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <AuthContextProvider>
//           <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
//           <App />
//         </AuthContextProvider>
//       </BrowserRouter>
//     </QueryClientProvider>
//   </React.StrictMode>
// );
