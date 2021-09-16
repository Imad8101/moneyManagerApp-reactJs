import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const updatedList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({transactionsList: updatedList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const optionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = optionType

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onAddTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  calculateExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount
    return balanceAmount
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.calculateExpenses()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="welcome-container">
            <h1 className="welcome-heading">Hi, Richard</h1>
            <p className="welcome-line">
              Welcome back to your{' '}
              <span className="welcome-span">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
          />
          <div className="transaction-history-container">
            <form className="income-form" onSubmit={this.onAddTransaction}>
              <h1 className="form-heading">Add Transaction</h1>
              <label htmlFor="title" className="label">
                Title
              </label>

              <input
                id="title"
                type="text"
                className="input"
                value={titleInput}
                placeholder="Title"
                onChange={this.onAddTitle}
              />
              <label htmlFor="amount" className="label">
                Amount
              </label>

              <input
                id="amount"
                type="text"
                className="input"
                value={amountInput}
                placeholder="Amount"
                onChange={this.onAddAmount}
              />
              <label htmlFor="select" className="label">
                Type
              </label>

              <select
                id="select"
                value={optionId}
                onChange={this.onChangeOptionId}
                className="drop-down"
              >
                {transactionTypeOptions.map(eachOption => (
                  <option value={eachOption.optionId} key={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="transactions-table-container">
                <ul className="table-container">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      transactionDetails={eachTransaction}
                      key={eachTransaction.id}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
