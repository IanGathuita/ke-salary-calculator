import { useRef, useState } from "react";
import calculateStatutories from "../Utils/CalculateStatutories";
import logo from '../Assets/Logo.svg';
import Results from "./Results";

const PERSONAL_RELIEF = 2400;

const Home = () => {
  const [gross, setGross] = useState(0);
  const [results, setResults] = useState({});
  const [err, setErr] = useState('');
  const resultsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr('');
    setResults({});

    try {
      if (((typeof gross) != "number") || gross < 1) {
        throw new Error('Gross salary must be a positive number greater than 0');
      }
      const { nssf, paye, shif, housingLevy } = calculateStatutories(gross);
      const payeAfterRelief = (Math.round((paye - PERSONAL_RELIEF) > 0 ? paye - PERSONAL_RELIEF : 0));
      const net = Math.round((gross - nssf - payeAfterRelief - shif - housingLevy));
      const resultsObj = { gross, nssf, payeAfterRelief, shif, housingLevy, net }
      setResults(r => resultsObj);
    }
    catch (e) {
      setErr(e.message);
    }
  }

  const handleInputChange = (e) => {
    setErr(e => '');
    try {
      let newGross = Number.parseFloat(e.target.value);
      setGross((g) => newGross);
      if (isNaN(newGross) || newGross < 1) {
        throw new Error('Gross salary must be a valid positive number');
      }

    }
    catch (e) {
      setErr(err => e.message);
    }

  }

  return (
    <>
      <header>
        <img alt="ke salary calculator logo" className="logo" src={logo}></img>
      </header>
      <main>
        {Object.keys(results).length <= 0 && <div className="gross-form">
          <h1>Let's calculate your net salary and statutory deductions</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="gross-input">Please enter your gross income below in Kenyan shillings.</label>
            <input name="gross-input" placeholder="Gross salary" type="number" id="gross-input" required onChange={e => handleInputChange(e)} value={gross} />
            <p className="error">{err}</p>
            <input type="submit" value="Calculate" disabled={err.length !== 0} />
          </form>
        </div>}
        {Object.keys(results).length > 0 && <Results resObj={{results,setResults}} ref={resultsRef}></Results>}
      </main>
      <footer>
        <p>This tool was developed by <a href="https://iangathuita.github.io/ian-portfolio/">Ian Joseph</a> </p>
      </footer>
    </>
  );
}
export default Home;