   import Mycontract from './abis/Mycontract.json';
    import web3 from './web3';
 


  
    //const accounts= web3.eth.getAccounts()
   // console.log(accounts)
    
    const mycontract=new web3.eth.Contract(Mycontract.abi,Mycontract.networks.address)
    console.log(mycontract)
    //const productCount=await mycontract.methods.serviceCount().call()
    //console.log(productCount)
    
   // const web3 =window.web3
    //const accounts= web3.eth.getAccounts()
    //console.log(accounts)
   // const mycontract=web3.eth.Contract(Mycontract.abi,Mycontract.networks.address)
   //console.log(mycontract)
   // this.setState({account : accounts[0] })
    //const networkID= web3.eth.net.getId()
  
    //const networkData =Mycontract.networks[networkID];
    //const networkData = Mycontract.networks(networkID)
    
       //const mycontract=web3.eth.Contract(Mycontract.abi,networkData.address)
      // console.log(mycontract)
       //console.log(Mycontract.networks.address)
  
  export default new web3.eth.Contract(Mycontract.abi,Mycontract.networks[5777].address);