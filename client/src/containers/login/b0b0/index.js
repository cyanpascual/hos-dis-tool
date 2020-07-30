import React from "react"

function Bobo() {
    const [date, setDate] = React.useState(new Date().toLocaleString())
    const [plus, setPlus] = React.useState(0)

    React.useEffect(() => {
        setDate(new Date().toLocaleString())
    }, [new Date().toLocaleString()])
    
    const addOne = () => {
        setPlus(plus + 1)
    }
    return (
        <><h1>Hello world</h1>
        <h2>geopot</h2>
        <h3>{date}</h3>
        <button onClick={() => addOne()}>pindutin mo ako</button>
        <h3>{plus}</h3></>
    )
}

export default Bobo;