import { Landing, Register, Error, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Home,
  Profile,
  CreatePost,
  SharedLayout,
  Explore,
  MarketPlace,
  EditProfile,
  Search,
  SinglePost,
  Save,
} from "./pages/main";

import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="Profile" element={<Profile />}>
            <Route path=":id" element={<Profile />} />
          </Route>

          <Route path="MarketPlace" element={<MarketPlace />} />
          <Route path="Explore" element={<Explore />} />
          <Route path="post/:id" element={<SinglePost />} />
          <Route path="CreatePost" element={<CreatePost />} />
          <Route path="editPost/:id" element={<CreatePost />} />
          <Route path="EditProfile" element={<EditProfile />} />
          <Route path="Search" element={<Search />} />
          <Route path="saved" element={<Save />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
