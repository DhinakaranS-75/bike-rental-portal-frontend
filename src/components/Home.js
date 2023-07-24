import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../App";

const Home = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { state, dispatch } = useContext(UserContext);

  const userContact = async () => {
    try {
      const res = await fetch(
        "https://bike-rental-portal-k5bj.onrender.com/getdata",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("https://bike-rental-portal-k5bj.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!data) {
      console.log("message not sent");
    } else {
      alert("Message send");
      setUserData({ ...userData, message: "" });
    }
  };

  const Loginbutton = () => {
    if (state) {
      return (
        <div>
          <button>
            <NavLink className="btn" to="/signout">
              logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button>
            <NavLink className="btn" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>

        <NavLink className="logo" to="/">
          {" "}
          Bike<span>Book</span>
        </NavLink>

        <nav className="navbar">
          <NavLink to="/" className="navbar_details" >Home</NavLink>
          <NavLink to="/rentbike" className="navbar_details" >Rent Bikes</NavLink>
          <a href="#services" className="navbar_details" >Testimonial</a>
          <a href="#contact" className="navbar_details" >Contact</a>
        </nav>
        <div id="login-btn">
          <Loginbutton />
        </div>
      </header>

      <section className="home" id="home">
        <h3 data-speed="-2" className="home-parallax">
          Rent a Bike
        </h3>

        <img
          data-speed="5"
          className="home-parallax"
          src="/image/home.png"
          alt=""
        />

        <NavLink className="btn" to="/exploreRentBikes">
          Bike Showcase
        </NavLink>
      </section>

      <section className="icons-container">
        <div className="icons">
          <i className="fas fa-home"></i>
          <div className="content">
            <h3>150+</h3>
            <p>branches</p>
          </div>
        </div>

        <div className="icons">
          <i class="fa-sharp fa-solid fa-person-biking"></i>
          <div className="content">
            <h3>4770+</h3>
            <p>Bikes Rented</p>
          </div>
        </div>

        <div className="icons">
          <i className="fas fa-users"></i>
          <div className="content">
            <h3>320+</h3>
            <p>happy clients</p>
          </div>
        </div>

        <div className="icons">
          <i class="fa-sharp fa-solid fa-motorcycle"></i>
          <div className="content">
            <h3>1500+</h3>
            <p>Available Bikes</p>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h1 className="heading">
          {" "}
          Our Customers <span>Thoughts</span>{" "}
        </h1>

        <div className="box-container">
          <div className="box">
            <div className="rev-img">
              <img
                src="https://th.bing.com/th/id/OIP.Ct7rAv3tf_K_CJzagz6uPgHaGe?w=215&h=188&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
            </div>
            <h3>Sabbir</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              voluptate repellat eos, expedita culpa laboriosam vel fuga dolore
              unde quisquam earum explicabo aliquid, ducimus ullam saepe.
              Tempore, esse est. Possimus.
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img
                src="https://th.bing.com/th/id/OIP.AExXumyB4SrJ7t_EV6OKegHaKL?pid=ImgDet&rs=1"
                alt=""
              />
            </div>
            <h3>Dinesh</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              modi quaerat accusantium consectetur eos soluta dolor quas nam
              quos veniam expedita architecto optio fugit possimus earum
              reiciendis rem, dicta nemo.
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img
                src="https://th.bing.com/th/id/OIP.IPwfXzI_nBi1aJFL1KdsiwHaJ1?w=130&h=180&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
            </div>
            <h3>Jesus Agency</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              amet maiores magni commodi. Voluptatem aut aliquid mollitia sunt
              iusto sapiente numquam culpa illo recusandae sequi nam sed eaque,
              accusantium nesciunt!
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h1 className="heading">
          <span>contact</span> us
        </h1>

        <div className="row">
          <form method="POST">
            <h3>get in touch</h3>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputs}
              placeholder="your name"
              className="box"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputs}
              placeholder="your email"
              className="box"
            />
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputs}
              placeholder="your phone"
              className="box"
            />
            <textarea
              placeholder="your message"
              name="message"
              value={userData.message}
              onChange={handleInputs}
              className="box"
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="submit"
              value="send message"
              onClick={sendMessage}
              className="btn"
            />
          </form>
        </div>
      </section>

      <section className="footer" id="footer">
        
        <div className="credit"> ❤️ Happy Day  ❤️  </div>
      </section>
    </>
  );
};

export default Home;
