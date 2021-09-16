import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expenseAmount} = props

  return (
    <div className="money-details-container">
      <div className="balance-card">
        <img
          className="moneyDetails-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="amount-container">
          <p className="card-name">Your Balance</p>
          <p className="amount" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-card">
        <img
          className="moneyDetails-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="amount-container">
          <p className="card-name">Your Income</p>
          <p className="amount" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expenses-card">
        <img
          className="moneyDetails-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="amount-container">
          <p className="card-name">Your Expenses</p>
          <p className="amount" testid="expensesAmount">
            Rs {expenseAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
