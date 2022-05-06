
const ATMDeposit = ({ onChange, isDeposit, isValid, handleSubmit }) => {
    const choice = ["Deposit", "Withdrawal"];
    return (
        <label className="label huge">
            <h3>{choice[Number(!isDeposit)]}</h3> {/*takes a number from the choice array based on the state of isDeposit - 0 for true and 1 for false */}
            <input type="number" width="200" onChange={onChange}></input>
            <input type="submit" disabled={!isValid} width="200" value="Submit" ></input>
        </label>
    );
};

//Account simulates the bank - keeping track of our total money
const Account = () => {
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [deposit, setDeposit] = React.useState(0);
    const [atmMode, setATMMode]= React.useState('');

    let status = `Account Balance $ ${totalState}`;
    console.log('Account Rendered');

    const handleChange = event => {
        console.log(`handleChange ${event.target.value}`);
        if(Number(event.target.value) <= 0 ) {
            setValidTransaction(false);
        } else if (!isDeposit && Number(event.target.value) >= totalState ) {
            setValidTransaction(false);
        }
         else {
            setValidTransaction(true);
        }
        setDeposit(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        let newTotal = isDeposit ? totalState + deposit: totalState - deposit;
        setTotalState(newTotal); 
        setValidTransaction(false);
        console.log('handleSubmit');
        event.preventDefault();
    };

    const handleModeSelect = (event) => {
        setATMMode(event.target.value);
        setValidTransaction(false);
        if (event.target.value === "deposit") {
            setIsDeposit(true);
            document.getElementById("deposit").className = "button-selected";
            document.getElementById("withdrawal").className = "button-unselected";

        } else {
            setIsDeposit(false);
            document.getElementById("withdrawal").className = "button-selected";
            document.getElementById("deposit").className = "button-unselected";
        }
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <>
            <h2 id="total">{status}</h2>
            <button className="button-unselected" value="deposit" id="deposit" onClick={(event) => handleModeSelect(event)}>Deposit</button>
            <button className="button-unselected" value="withdrawal" id="withdrawal" onClick={(event) => handleModeSelect(event)}>Withdraw</button>
            <ATMDeposit onChange={handleChange} 
            isDeposit={isDeposit}
            isValid={validTransaction}
            >Deposit</ATMDeposit>
            </>
        </form>
    );
};
//==================================================
ReactDOM.render(<Account />, document.getElementById("root"));