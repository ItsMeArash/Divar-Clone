import Router from "router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { defaultOptions } from "configs/reactQueryConfigs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
    const queryClient = new QueryClient({ defaultOptions });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Router />
                <Toaster />
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
