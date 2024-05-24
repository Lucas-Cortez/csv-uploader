import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePageTemplate } from "./components/templates/HomePageTemplate";
import { UserContextProvider } from "./providers/user/provider";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <HomePageTemplate />
        <Toaster />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
