import React from "react";
import "./LikedPosts.css";

function User() {
  // const APP_KEY = '22665907-d4561f81e8a28568d1232a1eb';

  // const [images, setImages] = useState([]);
  // const [query, setQuery] = useState("dogs");

  // useEffect(()=>{
  //   fetchItems();
  // }, [query]
  // )

  // const fetchItems = async() => {
  //   const response = await fetch (`https://pixabay.com/api/?key=${APP_KEY}&q=${query}`);
  //   const data = await response.json();
  //   console.log(data.hits);
  //   setImages(data.hits);
  // }

  return (
    <>
      <div id="background">
        <h4 id="liked">Liked Posts</h4>
        <div className="user">
          <ul>
            <li>
              {" "}
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05466_kwlv0n.jpg"
                alt="A Toyota Previa covered in graffiti"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05621_zgtcco.jpg"
                alt="Interesting living room light through a window"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05513_gfbiwi.jpg"
                alt="Sara on a red bike"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05588_nb0dma.jpg"
                alt="XOXO venue in between talks"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05459_ziuomy.jpg"
                alt="Trees lit by green light during dusk"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05586_oj8jfo.jpg"
                alt="Portrait of Justin Pervorse"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05465_dtkwef.jpg"
                alt="Empty bike racks outside a hotel"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05626_ytsf3j.jpg"
                alt="Heavy rain on an intersection"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05449_l9kukz.jpg"
                alt="Payam Rajabi eating peanut chicken"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05544_aczrb9.jpg"
                alt="Portland skyline sunset"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814782/photostream-photos/DSC05469_fdxdzx.jpg"
                alt="Matt Sacks smiling while we're waiting for food"
                loading="lazy"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814782/photostream-photos/DSC05558_yq2tnz.jpg"
                alt="A fixed-gear bike under some bright lights"
                loading="lazy"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default User;
