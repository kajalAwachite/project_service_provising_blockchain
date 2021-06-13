import React,{Component} from 'react';
import '../../App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Web3 from 'web3'
import Mycontract from '../../../abis/Mycontract.json'

class Client_Home extends   Component {
   async componentWillMount()
  {
    await this.loadWeb3()
    await this.loadBlockchainData()
    console.log(window.web3)
  }

  async loadWeb3()
  {
          
          if (window.ethereum) {
              window.web3 = new Web3(window.ethereum);
          }
           else if (window.web3) {
               window.web3 = new Web3(window.web3.currentProvider);
           }
           // Non-DApp Browsers
           else {
               alert('You have to install MetaMask !');
            }
  }

  async loadBlockchainData()
  {
    const web3=window.web3
    const accounts=await web3.eth.getAccounts()
    this.setState({account: accounts[0] })
    const networkID= await web3.eth.net.getId()
     const networkData =Mycontract.networks[networkID];
    //const networkData = Mycontract.networks(networkID)
    console.log(networkData)

    if(networkData)
    {

       const mycontract=web3.eth.Contract(Mycontract.abi,networkData.address)
       console.log(mycontract)
       this.setState({mycontract})
       const serviceCount=await mycontract.methods.serviceCount().call()
       console.log(serviceCount.toString())
       for(var i =1;i<=serviceCount;i++)
       {      
        const service = await mycontract.methods.services(i).call()
        this.setState({services:[...this.state.services,service]
        })
        }

        console.log(this.state.services)

    }
    else
    {

      window.alert("contract is not deployed to network")

    }
    
  }


    constructor(props)
    {
      super(props)
     
        this.state ={
          account:'',
          services:[],
          loading:true
        }

         this.createService=this.createService.bind(this)
    }


    createService(name,price)
    {
      this.state.mycontract.methods(name,price).send({from:this.state.acount})
      .once('receipt',(receipt)=>{
        this.setState({loading:false})
      })
    }


  render()
  {

    return (
    <div>
  
      <Router>
        <Navbar />
      
        <Switch>
          <Route path='/ClientDashboard' exact component={Client_Home} />
         // <Route path='/page1' component={() => <Page1 createService={this.createService} />}/>
          <Route
  path='/page1'
  render={(props) => (
    <Page1 {...props} services={this.state.services} />
  )}
/>
          <Route path='/page2' component={Page2} />
          <Route path='/page3' component={Page3} />
        </Switch>
      
      </Router>
    </div>

  );

  }
  
}

export default Client_Home;