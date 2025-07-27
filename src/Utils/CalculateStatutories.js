const calculateStatutories = (gross) => {
    if (gross <= 0) throw Error('Gross cannot be negative');
    const nssf = Math.round((gross <=8000) ? (0.06* gross) : (gross <=72000) ? (480 + (0.06 * (gross-8000))): 4320);
    const housingLevy = Math.round(0.015 * gross);
    const shif = calculateSHIF(gross);
    const taxablePay = gross - nssf - shif - housingLevy;
    const paye = calculatePaye(taxablePay);
    
    return {nssf,paye,shif:shif,housingLevy}
}

const calculatePaye = (taxablePay) => {
    let band1, band2, band3, band4, band5 = 0;
    band1 = Math.round(taxablePay > 24000 ? 2400 : (taxablePay < 1 ? 0 :0.1 * taxablePay));
    band2 = Math.round((taxablePay > 24000 && taxablePay <= 32333)?  (taxablePay-24000) * 0.25 : (taxablePay<24000 ? 0 : 8333 * 0.25));
    band3 = Math.round((taxablePay > 32333 && taxablePay <= 500000)?  (taxablePay-32333) * 0.3 : (taxablePay<32333? 0 : 467667 * 0.3 ));
    band4 = Math.round((taxablePay > 500000 && taxablePay <= 800000)?  (taxablePay-500000) * 0.325 : (taxablePay<500000? 0 : 300000 * 0.325));
    band5 = Math.round(taxablePay > 800000 ?  (taxablePay-800000) * 0.35 : 0);
    return band1 + band2 + band3 + band4 + band5;  
}


const calculateSHIF = (gross) => {
    return Math.max(Math.round(gross* 0.0275),300);
}


export default calculateStatutories;