import React, { useState } from "react";
import "./App.css";
import routes from "./router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext } from "./context";

const queryClient = new QueryClient();

function App() {
  const [activeUser, setActiveUser] = useState<any>(null);

  return (
    <AppContext.Provider value={{ activeUser, setActiveUser }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
