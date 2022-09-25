import "./App.css";
import Layout from "./widgets/Layout";
import LayoutAdmin from "./widgets/layoutAdmin";
import { Routes, Route } from "react-router-dom";
import { API, setAuthToken } from './config/api';
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { useEffect, useState } from "react";
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
  Admin,
  PrivateRoute,
} from "./pages";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate()
  
  const [state, dispatch] = useContext(UserContext);

  const [isLogged, setIsLogged] = useState(false);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // return console.log("response",response.data.data)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(localStorage.token) {
      checkUser()
    }
  }, []);

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
        path="/video/:id"
        element={
          <Layout>
            <VideoDetail />
          </Layout>
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
      // element={<PrivateRoute isLogged={isLogged} />}
      >
        <Route
          path="/admin"
          element={
            <LayoutAdmin>
              <IncomingTransaction />
            </LayoutAdmin>
          }
        />
      </Route>

      <Route 
      // element={<PrivateRoute isLogged={isLogged} />}
      >
        <Route
          path="/list-film"
          element={
            <LayoutAdmin>
              <ListFilm />
            </LayoutAdmin>
          }
        />
      </Route>

      <Route 
      // element={<PrivateRoute isLogged={isLogged} />}
      >
        <Route
          path="/add-film"
          element={
            <LayoutAdmin>
              <AddFilm />
            </LayoutAdmin>
          }
        />
      </Route>

      <Route 
      // element={<PrivateRoute isLogged={isLogged} />}
      >
        <Route
          path="/add-episode"
          element={
            <LayoutAdmin>
              <AddEpisode />
            </LayoutAdmin>
          }
        />
      </Route>

      <Route 
      // element={<PrivateRoute isLogged={isLogged} />}
      >
        <Route
          path="/video-admin/:id"
          element={
            <LayoutAdmin>
              <VideoDetailAd />
            </LayoutAdmin>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Layout>
            <Notfound />
          </Layout>
        }
      />

      <Route
        path="/sorry"
        element={
          <Layout>
            <Admin />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
