// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

contract Mycontract {
    string  public name;
    uint public serviceCount = 0;
    mapping (uint => Service) public services;

    struct client {
        string client_Hash;
    }
    struct serviceProvider {
        string serviceP_Hash;
    }

    struct Service{
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }


    event ServiceCreate(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
        );

     event ServicePurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
        );

    constructor() public{
       name="KAJAL AWACHITE";
    }


    function createService(string memory _name,uint _price)public{
        

        require (bytes(_name).length> 0);
         require (_price> 0);

        
        serviceCount++;

    
        services[serviceCount] = Service(serviceCount,_name,_price,msg.sender,false);

        emit ServiceCreate(serviceCount,_name,_price,msg.sender,false);
    }



    function purchaseService (uint _id) public  payable {
        Service memory _service = services[_id];
        address payable _sp=_service.owner;

        require (_service.id> 0 && _service.id<=serviceCount);
        
        require (msg.value >=_service.price);
        

        require (!_service.purchased);


        require (_sp != msg.sender);
        


        
       _service.owner=msg.sender;
       _service.purchased=true;
       services[_id]=_service; 
       address(_sp).transfer(msg.value);
        emit ServicePurchased(serviceCount,_service.name,_service.price,msg.sender,true);

    }
    

    mapping(address => serviceProvider) SpStruct;
    mapping(address => client) clientStruct;
    mapping(address => string) userType;

    function addClient(string memory _clientHash) public returns (bool) {
        require(
            keccak256(abi.encodePacked(userType[msg.sender])) ==
                keccak256(abi.encodePacked(""))
        );
        client memory c;
        c.client_Hash = _clientHash;
        userType[msg.sender] = "Client";
        clientStruct[msg.sender] = c;
        return true;
    }

    function addServiceP(string memory _servicePHash) public returns (bool) {
        require(
            keccak256(abi.encodePacked(userType[msg.sender])) ==
                keccak256(abi.encodePacked(""))
        );
        serviceProvider memory sp;
        sp.serviceP_Hash = _servicePHash;
        userType[msg.sender] = "Service_provider";
        SpStruct[msg.sender] = sp;
        return true;
    }

  

   

    function getUser(address _Uaddress) public view returns (string memory) {
        return userType[_Uaddress];
    }
}
