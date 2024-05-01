import { forwardRef } from 'react';
import styles from '../Styles/Results.module.css';

const Results = forwardRef(({ resObj }, resultsRef) => {
    const { gross, nssf, payeAfterRelief, nhif, housingLevy, net } = resObj.results;
    const setResults = resObj.setResults;
    return (
        <>
            <h2>Calculation results &#10024;</h2>
            <p>With a gross salary of Ksh. {gross}, your statutory deductions and net pay are as tabulated below:</p>
            <div className='table-wrapper' ref={resultsRef}>
                <table className={styles.results}>
                    <tbody>
                        <tr>
                            <td>Gross salary</td>
                            <td>{gross}</td>
                        </tr>

                        <tr>
                            <td>NSSF</td>
                            <td>{nssf}</td>
                        </tr>

                        <tr>
                            <td>PAYE</td>
                            <td>{payeAfterRelief}</td>
                        </tr>

                        <tr>
                            <td>NHIF</td>
                            <td>{nhif}</td>
                        </tr>

                        <tr>
                            <td>Housing levy</td>
                            <td>{housingLevy}</td>
                        </tr>

                        <tr>
                            <td>Net pay</td>
                            <td>{net}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <button onClick={() => { setResults({}) }}>Calculate again</button>
        </>

    );

});

export default Results;