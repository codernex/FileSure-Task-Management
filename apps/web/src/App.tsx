import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
import { PageLoader, AuthState, RootLayout } from "./components";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<AuthState />}>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
