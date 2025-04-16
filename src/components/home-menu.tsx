import { Link } from "react-router-dom";
import Library from "/assets/images/bookshelf.png"
import Home from "/assets/images/house.png"
import Heart from "/assets/images/heart.png"
import "./../styles/library.css"; 


export default function HomeMenu() {
    return (
    <div>
        <br />
        <hr />
        <Link  to={"/"}>
          <img src={Home} alt="Image" width={40} height={40} />
          <p>Home</p>
        </Link>
        <br />
        <Link to ={"/library"}>
          <img src={Library} alt="Image" />
          <p>Library</p>
        </Link>
        <br />
        <Link to ={"/favourites"}>
            <img src={Heart} alt="Image" />
            <p>Favourites</p>
        </Link>
    </div>
    );
}