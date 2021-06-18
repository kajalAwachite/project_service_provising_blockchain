const Mycontract = artifacts.require('./Mycontract.sol')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Mycontract',([deployer,sp,client])=>{
	let mycontract

	before(async() =>{
		mycontract = await Mycontract.deployed()
	})

	describe('deployment',async() =>{
		it('deploys successfully', async()=>{
			const address = await mycontract.address
			assert.notEqual(address,0x0)
			assert.notEqual(address,'')
			assert.notEqual(address,null)
			assert.notEqual(address,undefined)
			assert.notEqual(address,'')
			assert.notEqual(address,'')
			
		
		})

		it('has a name',async() =>{
			const name= await mycontract.name()
			assert.equal(name,'KAJAL AWACHITE')
		})
	})


	describe('product',async() =>{
		let result,serviceCount

		before(async() =>{
		result = await mycontract.createService('internet',web3.utils.toWei('1','Ether'),'123','this is information',{from:sp})
		serviceCount=await mycontract.serviceCount()
	})
		it('create service',async() =>{
			
			assert.equal(serviceCount,1)
			const event =result.logs[0].args
			assert.equal(event.id.toNumber(),serviceCount.toNumber(),'id is cprrect')
			assert.equal(event.name,'internet','name is correct')
			assert.equal(event.price,'1000000000000000000','price is correct')
			assert.equal(event.owner,sp,'owner is correct')
			assert.equal(event.purchased,false,'is correct')
			assert.equal(event.serviceCode,'123','is correct')
			assert.equal(event.info,'this is information','is correct')
		})



		it('List Service',async() =>
		{
			const service=await mycontract.services(serviceCount)
			
			assert.equal(service.id.toNumber(),serviceCount.toNumber(),'id is cprrect')
			assert.equal(service.name,'internet','name is correct')
			assert.equal(service.price,'1000000000000000000','price is correct')
			assert.equal(service.owner,sp,'owner is correct')
			assert.equal(service.purchased,false,'is correct')
			assert.equal(service.serviceCode,'123','is correct')
			assert.equal(service.info,'this is information','is correct')
	


		})


		it('sell Service',async() =>
		{

			//check service provider balance before purchased

			let oldSPBalance
			oldSPBalance=await web3.eth.getBalance(sp)
			oldSPBalance= new web3.utils.BN(oldSPBalance)

			result = await mycontract.purchaseService(serviceCount, {from : client, value: web3.utils.toWei('1','Ether')})


			const event =result.logs[0].args
			assert.equal(event.id.toNumber(),serviceCount.toNumber(),'id is cprrect')
			assert.equal(event.name,'internet','name is correct')
			assert.equal(event.price,'1000000000000000000','price is correct')
			assert.equal(event.owner,client,'owner is correct')
			assert.equal(event.purchased,true,'is correct')
			assert.equal(event.serviceCode,123,'is correct')
			assert.equal(event.info,'this is information','is correct')


			//service provider receive payment

			let newSPBalance
			newSPBalance=await web3.eth.getBalance(sp)
			newSPBalance=new web3.utils.BN(newSPBalance)

			let price
			price=web3.utils.toWei('1','Ether')
			price=new web3.utils.BN(price)


			//console.log(oldSPBalance,newSPBalance,price);

			const expectedBalance=oldSPBalance.add(price)
			assert.equal(newSPBalance.toString(),expectedBalance.toString())


			//failure

			//trie to buy product that does not exit i.e invalide id;

			 await mycontract.purchaseService(99, {from : client, value: web3.utils.toWei('1','Ether')}).should.be.rejected;

			 //client try to buy without enough ether
			 await mycontract.purchaseService(99, {from : client, value: web3.utils.toWei('0.5','Ether')}).should.be.rejected;

			 //service cant be purchased twice

			 await mycontract.purchaseService(99, {from : deployer, value: web3.utils.toWei('1','Ether')}).should.be.rejected;
			
			 //sp provider cant buy service
			 await mycontract.purchaseService(99, {from : client, value: web3.utils.toWei('1','Ether')}).should.be.rejected;

		})

		//failure

		// await mycontract.createService('',web3.utils.toWei('1','Ether'),{from:sp}).should.be.rejected;


	})	
})