import "./App.css";
import Layout from "./widgets/Layout";
import LayoutAdmin from "./widgets/layoutAdmin";
import { Routes, Route } from "react-router-dom";
import { API, setAuthToken } from './config/api';
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { useEffect } from "react";
import VideoDetailAd from "./pages/VideoDetailAd";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Movie,
  TvShows,
  VideoDetail,
  Profile,
  Payment,
  Notfound,
  ListFilm,
  IncomingTransaction,
  AddFilm,
  AddEpisode,
} from "./pages";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}



function App() {
  const navigate = useNavigate()
  
  const [state, dispatch] = useContext(UserContext);
  // useEffect(() => {
  //   // Redirect Auth
  //   if (state.isLogin == false) {
  //     navigate('/');
  //   } else {
  //     if (state.user.status == 'admin') {
  //       navigate('/complain-admin');
  //     } 
  //     else if (state.user.status == 'customer') {
  //       navigate('/');
  //     }
  //   }
  // }, [state]);

  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token)
    }
  }, [state]);

  return (
    <Routes>
      <Route />
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/tvshows"
        element={
          <Layout>
            <TvShows />
          </Layout>
        }
      />

      <Route
        path="/movies"
        element={
          <Layout>
            <Movie />
          </Layout>
        }
      />

      <Route
        path="/video"
        element={
          <Layout>
            <VideoDetail />
          </Layout>
        }
      />

      <Route
        path="/video-admin"
        element={
          <LayoutAdmin>
            <VideoDetailAd />
          </LayoutAdmin>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      <Route
        path="/payment"
        element={
          <Layout>
            <Payment />
          </Layout>
        }
      />

      <Route
        path="/admin"
        element={
          <LayoutAdmin>
            <IncomingTransaction />
          </LayoutAdmin>
        }
      />

      <Route
        path="/list-film"
        element={
          <LayoutAdmin>
            <ListFilm />
          </LayoutAdmin>
        }
      />
      <Route
        path="/add-film"
        element={
          <LayoutAdmin>
            <AddFilm />
          </LayoutAdmin>
        }
      />
      <Route
        path="/add-episode"
        element={
          <LayoutAdmin>
            <AddEpisode />
          </LayoutAdmin>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <Notfound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
