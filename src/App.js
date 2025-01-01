import './App.css';
import Web3 from 'web3';
import { useState } from 'react';
import ABI from './ABI.json';


function App() {

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [bankContract, setBankContract] = useState(0);
  const [myDeposit, setMyDeposit] = useState(0);
  const [number, setNumber] = useState(0);
  const [to, setTo] = useState(0);

  const newNumber = (e) => {
    setNumber(e.target.value);
  }

  const newAddress = (e) => {
    setTo(e.target.value);
  }

  const getMyDeposit = async () => {
    const myDeposit = await bankContract.methods.getMyDeposit().call({
      from: address
    });
    setMyDeposit(myDeposit);
  }

  const deposit = async () => {
    await bankContract.methods.deposit(number).send({
      from: address
    });
  }

  const withdraw = async () => {
    await bankContract.methods.withdraw(number).send({
      from: address
    });
  }

  const transfer = async () => { 
    await bankContract.methods.transfer(to, number).send({
      from: address
    });
  }

  const connectWallet = async () => {
    
    // 1.获得钱包账户
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    }); 
    setAddress(accounts[0]);

    // 2.连接web3
    const web3 = new Web3(window.web3.currentProvider);
    setWeb3(web3);

  
    if (!Array.isArray(ABI.abi)) {
      console.error("ABI is not an array");
      return;
    }
    // console.log("ABI:", ABI.abi);  

    // 3.获取智能合约
    const bankContract = new web3.eth.Contract(ABI.abi, '0x79F56aE2153c522566002905f2A76A28B6D118aA');
    setBankContract(bankContract);

  }



  return (
    <div className="App">
      <button className='btn' onClick={connectWallet}>connect wallet</button>
      <h3 className='h3'>账户地址-Address: {address}</h3>
    </div>
  );
}

export default App;
