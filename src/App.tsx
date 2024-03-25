import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import BusinessGrid from "./components/BusinessGrid";

const queryClient = new QueryClient();

function App() {
  const logStore = () => {
    const storeState = store.getState();
    console.log("Store State:", storeState);
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header className="App-header bg-red-500 h-[100vh]">
            <img src={logo} className="w-32" alt="logo" />
            {/* <p className="text-red-500">
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> */}
            <BusinessGrid />

            <div>
              <button
                className="mt-10 text-xl bg-white text-black hover:bg-gray-500 px-4 py-2 rounded"
                onClick={logStore}
              >
                Log store
              </button>
            </div>
          </header>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
