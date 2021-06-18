import React,{Component} from 'react';
import '../../App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Web3 from 'web3'
import Mycontract from '../../../abis/Mycontract.json'
import { Card } from 'react-bootstrap';
import welcome1 from '../../Images/welcome2.png';

class Page3 extends Component {
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
       console.log({serviceCount})
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

	render(){
		return (
			
    <div className="text-center">
   
			 
			     <h1> Welcome  {this.state.account}</h1>
			      
			   


    </div>
  );
	}
  

}

export default Page3;