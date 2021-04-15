import React from "react";
import axios from 'axios';
import { BrowserRouter, Route, Link } from "react-router-dom";
import BaseList from "./Component/BaseList";
import Item from "./Component/Item";
import NavBar from "./Component/NavBar";
import Copyright from "./Component/Copyright";
import Greeting from "./Component/Greeting";
import './App.scss';


async function getAPI(key, index) {
  try {
    console.log("check");
    const url =
      "https://api.themoviedb.org/3/search/movie?api_key=74d06b087582f0c1aea4867c70dc9f2f&language=en-US&page=" +
      index +
      "&include_adult=false&query=" +
      key;
    const resp = await fetch(url);
    console.log("res", resp, " page", index);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log("Fail");
    return err;
  }
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: "",
      pass: "",
      login: "",
      page: 1,
      status: false,
      items: [],
      account: []
    };
  }
  shouldComponentUpdate(nextState) {
    console.log("shouldComponentUpdate");
    return (
      (nextState.value !== this.state.value) || (nextState.page !== this.state.page) || (nextState.id !== this.state.id) || (nextState.pass !== this.state.pass)
    );
  }
  // componentWillUpdate(nextState: any) {
  //   console.log("component will update", this.state.page);
  // }

  componentDidMount() {
    axios.get('/api/account/ojigajifebaxudanubacehexinuhesubucahirububanetiqawoxizirociwokoxobugekovocokewetiwuruneqekocacozuvuyecoyuxafeneriwusezobigocarupigupayimitajajixaxucitarerivepimawirarudokoxojudotuvehayukupegafoyuzasomajifoyazitoyiyum')
      .then(res => {
        const acc = res.data;
        this.setState({ account: acc.account });
        console.log("lay tai khoan", this.state.account)
      })
      .catch(error => console.log(error));
  }

  getData = async (key, index) => {
    this.setState({ items: [] });
    const data = await getAPI(key, index);
    console.log("key", data);
    data.results.map((results, index) => {
      const newData = {
        id: index,
        text: results.title,
        image: "https://image.tmdb.org/t/p/w1280/" + results.poster_path
      };
      const prevItems = this.state.items;
      prevItems.push(newData);
    });
    this.setState({ status: !this.state.status });
    console.log("result getData", this.state);
  };
  onSubmit = async (event) => {
    var index = 1;
    if (this.state.value === "") {
      return;
    }
    if (this.state.value !== "") {
      this.setState({ page: index });
      this.getData(this.state.value, index);
    }
    event.preventDefault();
    console.log("result onSubmit", this.state);
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value: value });
    console.log("handlechange", this.state.value)
  };

  updatePage = async () => {
    this.setState((state) => {
      return { page: this.state.page + 1 };
    });
    console.log("page update", this.state.page);
    this.getData(this.state.value, this.state.page + 1);
  };

  UIUser() {
    document.querySelector('.login-drop').innerHTML = '';
    const content = `<div class="user"> 

      <div class="notification"> <img class="img-notification" src='notification.svg' /> </div>
      <div class="profile"> <img  class="img-profile" src='profile.svg' />
      <div class="form-logout"> 
        <a href="http://localhost:3000/">
        <button>Logout</button></a>
      </div> </div> 
        

      </div> `;
    document.querySelector('.user-info').innerHTML = content;
  }


  onLogin = (event) => {
    console.log("onlogin")
    if ((this.state.id === "") || (this.state.pass === "")) {
      console.log("nullll")
      return;
    }

    this.state.account.map((data) => {
      if ((data.user === this.state.id) && (data.password === this.state.pass) && (data.level === 1)) {
        console.log("id", this.state.id, "pass", this.state.pass);
        window.open("http://localhost:8000/");

      }
      if ((data.user === this.state.id) && (data.password === this.state.pass) && (data.level === 0)) {
        this.UIUser();
        console.log("mở không được")
      }
    })
    event.preventDefault();
  };

  handleChangeUser = (event) => {

    const { value } = event.target;
    this.setState({ id: value });
    console.log("handlechangeUser", this.state.id)
  };

  handleChangePass = (event) => {
    console.log("handlechangePass", this.state.pass)
    const { value } = event.target;
    this.setState({ pass: value });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div id="head" className="navbar">
            <NavBar
              value={this.state.value}
              handleChange={this.handleChange}
              onSubmit={this.onSubmit} />
          </div>
          <div className="user-info">
            <ul className="login-drop">
              <li className="login-dropdown">
                <a href="#" className="button-login">
                  <p className="login">Login</p>
                  <div className="icon-menu">
                  </div>
                </a>
              </li>
              <li className="form-login">
                <div>
                  <label for="email"></label>
                  <input
                    onChange={(event) => this.handleChangeUser(event)} id="email" type="email" placeholder="Email address" required />
                </div>
                <div>
                  <label for="password"></label>
                  <input

                    onChange={(event) => this.handleChangePass(event)} id="password" type="password" placeholder="Password" required />

                </div>

                <div className="login-bottom">
                  <Link to="/login">
                    <button onClick={this.onLogin} className="sign-in">Sign in</button>
                  </Link>
                  <div className="forget"><a href="">Forget the password?</a></div>
                </div>

              </li>

            </ul>
          </div>

          <main>
            <Greeting />
            <BaseList
              data={this.state.items}
              page={this.state.page}
              updatePage={this.updatePage}
              Item={Item} />
          </main>
          <div id="footer">
            <Copyright />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

