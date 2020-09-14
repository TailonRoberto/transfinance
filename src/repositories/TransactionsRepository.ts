import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome'; 

}

class TransactionsRepository {
  private transactions: Transaction[];  
  private balanceIncome: number;
  private balanceOutcome: number;



  constructor() {
    this.transactions = [];
    this.balanceIncome = 0;
    this.balanceOutcome = 0;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((accumulator: Balance, transation: Transaction ) =>
     {   
       //codigo aki
       switch( transation.type )
       {
         case "income": 
            accumulator.income += transation.value;
            break;
         case "outcome":
            accumulator.outcome += transation.value;    
            break;
         default: 
            break;  

       }

       return accumulator;


     }, {  // formatação de retorno
          income: 0, 
          outcome: 0, 
          total: 0  
        }
     )
     
      balance.total = balance.income - balance.outcome;
      return balance;



     // tinha feito assim antes e funfou que foi uma uva.
    //  this.transactions.map(trans =>
    //   {
    //      if (trans.type === 'income')
    //      {
    //        this.balanceIncome =  this.balanceIncome + trans.value  
    //      }else {
    //        this.balanceOutcome = this.balanceOutcome + trans.value
    //      }
    //   });

    //   return {
    //     income: this.balanceIncome,
    //     outcome: this.balanceOutcome,
    //     total: (this.balanceIncome -  this.balanceOutcome)
    //   }
  }

    public create({title,value,type}: CreateTransDTO ): Transaction {
    const newTrans = new Transaction( {
      title,
      value,
      type
    });

    this.transactions.push(newTrans);

    return newTrans
  }
}

export default TransactionsRepository;
