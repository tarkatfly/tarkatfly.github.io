import React, { useState } from 'react';
import Button from './Button';
import Decimal from 'decimal.js';

function App() {
// память калькулятора
  const [firstNumber,setFirstNumber] =useState(0);
  const [operation, setOperation] = useState('');
// была ли нажата операция
  const [isSecond, setIsSecond] = useState(false);
  const [secondNumber, setSecond] = useState(false);
  const [number, setNumber] = useState('');  
  const [result, setResult] = useState('0');
    
  const handleNumberClick = (value) => {
    setNumber(number+value);
    if (isSecond){ // вводим новое число        
      setIsSecond(false);
      setResult(value);   
    }else{// либо наращиваем старое значение
      setResult(result==='0'? value: result + value);
    } 
  }   
  const calculate = (first, second,op) =>
  {
     var res = new Decimal(first);
     second= new Decimal(second);
    switch (op){
       case '+':
         res = res.plus(second);
         break;
       case '-':
         res = res.minus(second);
         break;
       case '*':
         res = res.times(second);
         break;
       case '/':
         res = res.dividedBy(second);
         break;
       default:
         break;
       };
     return res.toNumber();
  }  
  const handleOperationClick = (value) => {
     if (!secondNumber) {
       setFirstNumber(parseFloat(number));     
       setSecond(true);
       setNumber('');
       setIsSecond(true);
       setOperation(value);       
     } else if (!isSecond) {
       setOperation(value);
       var res;      
      
       res = calculate(firstNumber, parseFloat(number), operation);

       setFirstNumber(res);
       setNumber('');
       setResult(res.toString());      
       setIsSecond(true);
     }

  }
  const handleResultClick = (value) => {
    if (secondNumber && !isSecond){
      var res;
           
      res = calculate(firstNumber, parseFloat(number), operation);
      setNumber(res);
      setResult(res.toString());
      setSecond(false);      
     }    
  }   
  const handleClick = (value) => {
     if (value==='C'){
        setNumber('');
        setResult('0');
        setFirstNumber(0);
     } 
     if (value==='.' && result.toString().indexOf('.')===-1){
        setResult(result+'.');
        setNumber(number+'.');
     } 
  }
  return (
    <div className="calculator">
      <div className="display">{result}</div>
      <div className="buttons">
        <Button label=""  wide clear />
        <Button label=""  clear />
        <Button label="C" onClick={() => handleClick('C')} clear />
        
        <Button label="1" onClick={() => handleNumberClick('1')} />
        <Button label="2" onClick={() => handleNumberClick('2')} />
        <Button label="3" onClick={() => handleNumberClick('3')} />
        <Button label="+" onClick={() => handleOperationClick('+')} operator />
                
        <Button label="4" onClick={() => handleNumberClick('4')} />
        <Button label="5" onClick={() => handleNumberClick('5')} />
        <Button label="6" onClick={() => handleNumberClick('6')} />
        <Button label="-" onClick={() => handleOperationClick('-')} operator />
                
        <Button label="7" onClick={() => handleNumberClick('7')} />
        <Button label="8" onClick={() => handleNumberClick('8')} />
        <Button label="9" onClick={() => handleNumberClick('9')} />
        <Button label="*" onClick={() => handleOperationClick('*')} operator />
                
        <Button label="0" onClick={() => handleNumberClick('0')} />
        <Button label="." onClick={() => handleClick('.')} />
        <Button label="=" onClick={() => handleResultClick('=')} operator />
        <Button label="/" onClick={() => handleOperationClick('/')} operator />
      </div>
    </div>
  );
}
export default App;
