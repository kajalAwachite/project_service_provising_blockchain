import React ,{Component} from 'react';
import Mycontract from '../../../abis/Mycontract.json'
import Web3 from 'web3'

class Page1 extends   Component {
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
          serviceName:'',
          servicePrice:0,
          services:[],
          loading:true
        }

         this.createService=this.createService.bind(this)
         this.purchaseService=this.purchaseService.bind(this)
          //console.log({servicePrice})
    }

    serviceNameHandler = (event) => {
    this.setState({serviceName: event.target.value})
    ;
  }
     servicePriceHandler = (event) => {
    this.setState({servicePrice: event.target.value});
     //console.log({servicePrice})
  }
    createService(name,price)
    {
      this.setState({loading:true})
      this.state.mycontract.methods.createService(name,price).send({from:this.state.account})
      .once('receipt',(receipt)=>{
        this.setState({loading:false})
      })
    }

    purchaseService(id,price)
    {
      this.setState({loading:true})
      this.state.mycontract.methods.purchaseService(id).send({from:this.state.account,value:price})
      .once('receipt',(receipt)=>{
        this.setState({loading:false})
      })
    }


  render()
  {

    return (
    <div>
       <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name=this.state.serviceName
          const price = window.web3.utils.toWei(this.state.servicePrice.toString(), 'Ether')
          console.log(price)
          console.log(name)
          this.createService(name, price)
          
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="serviceName"
              type="text"
              ref={(input) => { this.serviceName = input }}
              className="form-control"
              placeholder="Product Name"
              onChange={this.serviceNameHandler}
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="servicePrice"
              type="text"
              ref={(input) => {this.servicePrice = input }}
                onChange={this.servicePriceHandler}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
    </div>

  );

  }
  
}

export default Page1;