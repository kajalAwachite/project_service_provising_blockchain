import React,{useState,useEffect} from 'react';
import '../../App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import contract from '../../../contract'
import web3 from '../../../web3'

function Sp_Home(){


  const [acc,setacc] = useState({accAdd : ""})

    const[isloaded,setLoaded] = useState(false);

    useEffect(() => {
      async function loadAcc(){
        await web3.eth.getAccounts().then(async function(acc){
          setacc({accAdd:acc[0]})
          setLoaded(true);
      })
      }
       loadAcc()
  },[])
  /* async componentWillMount()
  {
    await this.loadWeb3()
    await this.loadBlockchainData()
   // console.log(window.web3)
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
    this.setState({account : accounts[0] })
    const networkID= await web3.eth.net.getId()
  
     const networkData =Mycontract.networks[networkID];
    //const networkData = Mycontract.networks(networkID)
    //console.log(networkData)
    if(networkData)
    {

       const mycontract=web3.eth.Contract(Mycontract.abi,networkData.address)
      // console.log(mycontract)
         const serviceCount=await mycontract.methods.serviceCount().call()
         console.log(serviceCount)
       this.setState({mycontract})

    }
    else
    {

      window.alert("contract is not deployed to network")

    }
    
  }


    constructor(props)
    {
      super(props)
     
        this.state =
        {
          account:'',
          serviceCount:0,
          products:[],
          loading:true

        }

         this.createService=this.createService.bind(this)
    }


    createService(name,price)
    {
      this.setState({loading:true})
      this.state.mycontract.methods.createService(name,price).send({ from:this.state.account,gas:21000}).once('receipt',(receipt)=>{this.setState({loading:false})
      })
    }
*/

 

    return (
    <div>
  
      <Router>
        <Navbar />
      
        <Switch>
          <Route path='/SpDashboard' exact component={Sp_Home} />
          <Route path='/page1' component={() => <Page1 accAdd ={acc.accAdd} />}/>
          <Route path='/page2' component={Page2} />
          <Route path='/page3' component={Page3} />
        </Switch>
      
      </Router>
    </div>

  );

  
}

export default Sp_Home;
