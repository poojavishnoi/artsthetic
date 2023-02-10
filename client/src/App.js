import React /*, { useEffect, createContext }*/ from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import ArtistSignIn from "./components/pages/ArtistSignIn";
import SignUp from "./components/pages/SignUp";
import ArtistSignUp from "./components/pages/ArtistSignUp";
import NavBar from "./components/NavBar";
import ArtistNavBar from "./components/ArtistNavBar";
import Home from "./components/pages/Home";
import ArtistPage from "./components/pages/ArtistPage";
import Art from "./components/pages/Art";
import Cart from "./components/pages/Cart";
import EditProfile from "./components/pages/EditProfile";
import ArtistUpload from "./components/pages/ArtistUpload";
import LikedPosts from "./components/pages/LikedPosts";
import Payment from "./components/pages/Payment";
import Profile from "./components/pages/Profile";
import Search from "./components/pages/SearchResults";
//const UserContext = createContext();

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/artist/signin">
          <ArtistSignIn />
        </Route>
        <Route exact path="/artist/signup">
          <ArtistSignUp />
        </Route>
        <Route path="/home">
          <NavBar />
          <Home />
        </Route>
        <Route path="/artist/home">
          <ArtistNavBar />
          <Home />
        </Route>
        <Route path="/artist/page">
          <ArtistNavBar />
          <ArtistPage />
        </Route>
        <Route path="/art">
          <NavBar />
          <Art />
        </Route>
        <Route path="/artist/art">
          <ArtistNavBar />
          <Art />
        </Route>
        <Route path="/cart">
          <NavBar />
          <Cart />
        </Route>
        <Route path="/artist/cart">
          <ArtistNavBar />
          <Cart />
        </Route>
        <Route path="/editprofile">
          <NavBar />
          <EditProfile />
        </Route>
        <Route path="/profile">
          <NavBar />
          <Profile />
        </Route>
        <Route path="/artist/profile">
          <ArtistNavBar />
          <Profile />
        </Route>
        <Route path="/artist/upload">
          <ArtistNavBar />
          <ArtistUpload />
        </Route>
        <Route path="/likedposts">
          <NavBar />
          <LikedPosts />
        </Route>
        <Route path="/payment">
          <NavBar />
          <Payment />
        </Route>
        <Route path="/artist/payment">
          <ArtistNavBar />
          <Payment />
        </Route>
        <Route path="/searchresults">
          <NavBar />
          <Search />
        </Route>
        <Route path="/artist/searchresults">
          <ArtistNavBar />
          <Search />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
