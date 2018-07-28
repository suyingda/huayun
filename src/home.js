import React from "react";
import { Link, BrowserRouter, Route ,Switch } from "react-router-dom";

class All extends React.Component {
  render() {
    return <h6>所有列表</h6>;
  }
}
class Like extends React.Component {
  render() {
    return <h6>收藏列表</h6>;
  }
}
export default class Home extends React.Component {
  render() {
    return (
      <div>
          <h1>home</h1>
        <nav>
          {/*<Link to="/">home-所有列表</Link>*/}
          {/*<br />*/}
              {/*<Link to="/Like">home-收藏列表</Link>*/}
        </nav>

        {/*<Route path="/" exact  render={()=>{*/}
            {/*return (*/}
                {/*<All/> */}
            {/*)*/}
        {/*}} />*/}
        {/*<Route path="/Like" component={Like} />*/}
      </div>
    );
  }
}
