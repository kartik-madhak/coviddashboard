import React, {useEffect, useState} from 'react';

function callAPI() {
    return fetch("https://api.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson
        })
        .catch((error) => {
            console.error(error)
        });
}

function Table() {
    const [data, setData] = useState({})

    useEffect(function () {
        callAPI().then(result => {console.log(result);setData(result)})
    }, [])

    if (data) {
        let elements: Array<JSX.Element> = []

        for (const [key, value] of Object.entries(data)) {
            // @ts-ignore
            let temp = value.total
            elements.push(<tr>
                <td>{key}</td>
                <td>{temp.confirmed}</td>
                <td>{temp.deceased}</td>
                <td>{temp.recovered}</td>
                <td>{temp.tested}</td>
                <td>{temp.vaccinated}</td>
            </tr>)
        }

        return (
            <table className="table">
                <thead>
                <th>
                    Place
                </th>
                <th>
                    Confirmed
                </th>
                <th>
                    Deceased
                </th>
                <th>
                    Recovered
                </th>
                <th>
                    Tested
                </th>
                <th>
                    Vaccinated
                </th>
                </thead>
                {elements}
            </table>
        );
    }
    else return (
        <div>
            LOADING...
        </div>
    )
}

export default Table;
