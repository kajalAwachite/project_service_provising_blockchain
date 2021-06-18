import React ,{Component} from 'react';
import Mycontract from '../../../abis/Mycontract.json'
import Web3 from 'web3'

class Page2 extends   Component {
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
        if(service.owner==this.state.account)
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
          loading:true,
           hidden: true,
          serviceCode:''
        }

         this.createService=this.createService.bind(this)
         this.purchaseService=this.purchaseService.bind(this)
         this.toggleShow = this.toggleShow.bind(this);
    }
    toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  
    createService(name,price)
    {
      this.state.mycontract.methods(name,price).send({from:this.state.acount})
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
    	<h2>My services</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Service Code</th>
        

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
          {this.state.services.map((service,key)=>{
          	return(
          		<tr key={key}>
              <th scope="row">{service.id.toString()}</th>
              <td>{service.name}</td>
              <td>{window.web3.utils.fromWei(service.price.toString(),'Ether')}</td>
              <td>{service.owner}</td>
              <td type={this.state.hidden ? 'password' : 'text'}>{service.serviceCode}</td>
           
              <td>
          
              </td>
              
            </tr>

          		)
          	}
          	)}
            
          </tbody>
        </table>
  
    </div>

  );

  }
  
}

export default Page2;