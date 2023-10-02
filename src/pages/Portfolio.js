import React, { useEffect, useState } from "react";

// Retrieve Local Storage
const localStorageFunction = () => {
    const data = localStorage.getItem("portfolio");
    if (data) {
        console.log(data);
        return JSON.parse(data);
    }
    else {
        return [];
    }
}

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(localStorageFunction());

    // Field State for Inputs:
    const [code, setCode] = useState("");
    const [date, setDate] = useState("");
    const [buySell, setBuySell] = useState("");
    const [units, setUnits] = useState("");

    // Submit Form Event
    const handleAddEntrySubmit = (e) => {
        e.preventDefault();
        let entry = {
            code,
            date,
            buySell,
            units
        }
        setPortfolio([...portfolio, entry]);
        setCode("");
        setDate("");
        setBuySell("");
        setUnits("");
    }

    // Delete Entry Event
    const handleDeleteEntry = (code) => {
        const filteredPortfolio = portfolio.filter((entry, index) => {
            return entry.code !== code;
        });
        setPortfolio(filteredPortfolio);
    }

    // Edit Entry Event (Removes Entry from Table and Populates Form)
    const handleEditEntry = (code) => {
        const filteredPortfolio = portfolio.filter((entry, index) => {
            return entry.code !== code;
        });
        const selectedEntry = portfolio.find((entry) => entry.code === code);
        setPortfolio(filteredPortfolio);
        setCode(selectedEntry.code);
        setDate(selectedEntry.date);
        setBuySell(selectedEntry.buySell);
        setUnits(selectedEntry.units);
    }

    // Save to Local Storage
    useEffect(() => {
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }, [portfolio]);

    return (
        <div className="wrapper">
            <h1>My Portfolio</h1>
            <div className='main'>
                <div className='form-container'>
                    <form onSubmit={handleAddEntrySubmit}>
                        <label>Cryptocurrency Code</label>
                        <input type="text" className='form-control' required
                        onChange = {(e) => setCode(e.target.value)} value = {code} placeholder="Enter Code"/>
                        <br/>

                        <label>Date of Transaction</label>
                        <input type="date" className='form-control' required
                        onChange = {(e) => setDate(e.target.value)} value = {date} placeholder="Enter Date"/>
                        <br/>

                        <label>Buy/Sell</label>
                        <input type="text" className='form-control' required
                        onChange = {(e) => setBuySell(e.target.value)} value = {buySell} placeholder="Enter Buy/Sell"/>
                        <br/>

                        <label>Amount in Cryptocurrency Units</label>
                        <input type="number" className='form-control' required
                        onChange = {(e) => setUnits(e.target.value)} value = {units} placeholder="Enter Units"/>
                        <br/>

                        <button type="submit" className='btn btn-success btn-md'>Add Entry</button>
                    </form>
                </div>

                <div className='view-container'>
                    {portfolio.length>0&&<>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Date</th>
                                    <th>Buy/Sell</th>
                                    <th>Units</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolio.map((entry, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{entry.code}</td>
                                            <td>{entry.date}</td>
                                            <td>{entry.buySell}</td>
                                            <td>{entry.units}</td>
                                            <td>
                                                <button className='btn btn-danger btn-sm' onClick={() => 
                                                    handleDeleteEntry(entry.code)}>
                                                        Delete
                                                    </button>
                            
                                                <button className='btn btn-primary btn-sm' onClick={() =>
                                                    handleEditEntry(entry.code)}>
                                                        Edit
                                                    </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
