import { AppRoutes } from './AppRoutes';
import { AuthProvider } from './contexts/auth.context';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster closeButton/>
    </>
  );
}

export default App;
