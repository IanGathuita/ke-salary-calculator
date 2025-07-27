import { forwardRef } from 'react';
import styles from '../Styles/Results.module.css';

const Results = forwardRef(({ resObj }, resultsRef) => {
    const { gross, nssf, payeAfterRelief, shif, housingLevy, net } = resObj.results;
    const setResults = resObj.setResults;
    return (
        <>
            <h2>Calculation results &#10024;</h2>
            <p>With a gross salary of Ksh. {gross.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, your statutory deductions and net pay are as tabulated below.&nbsp;
            <em>Please note that your employer may include additional deductions in your payslip</em> e.g. union contributions.</p>
            <div className='table-wrapper' ref={resultsRef}>
                <table className={styles.results}>
                    <tbody>
                        <tr>
                            <td>Gross salary</td>
                            <td>{gross.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>

                        <tr>
                            <td>NSSF</td>
                            <td>{nssf.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>

                        <tr>
                            <td>PAYE</td>
                            <td>{payeAfterRelief.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>

                        <tr>
                            <td>SHIF</td>
                            <td>{shif.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>

                        <tr>
                            <td>Housing levy</td>
                            <td>{housingLevy.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>

                        <tr>
                            <td>Net pay</td>
                            <td>{net.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <button onClick={() => { setResults({}) }}>Calculate again</button>
        </>

    );

});

export default Results;