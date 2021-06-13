import React,{Component} from 'react';
import man from '../Images/man.png';
import woman from '../Images/woman.png';




class Main extends Component{
  render()
  {
    return(
      <React.Fragment>
        <h1 className="text-center text-danger text-capitalize my-3">Service Provising System</h1>
    <div class="container">
    <div class="row">
      <div class="col-sm">
       <div class="card" >
  <img class="card-img-top" src={man} alt="Card image cap"  height="390px" width="250px"/>
  <div class="card-body">
    <h5 class="card-title">Service Provider</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/Sp_Home" class="btn btn-primary float-right">Login</a>
                            <a href="/Login" class="btn btn-primary">Registration</a>
  </div>
</div>
      </div>
      <div className="col-sm">
       <div class="card" >
  <img class="card-img-top" src={woman} alt="Card image cap" height="390px" width="250px"/>
  <div class="card-body">
    <h5 class="card-title">Client</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="/Client_Home" class="btn btn-primary float-right">Login</a>
                            <a href="/Login1" class="btn btn-primary">Registration</a>
  </div>
</div>
      </div>
    </div>
  </div>
    </React.Fragment>
      )
  }
}


export default Main;


