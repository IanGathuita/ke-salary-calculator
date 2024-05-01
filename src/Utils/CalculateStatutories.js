const calculateStatutories = (gross) => {
    const nssf = (gross <=7000) ? (0.06* gross) : (gross <=36000) ? (420 + (0.06 * (gross-7000))): 2160;
    const taxablePay = gross - nssf;
    const paye = calculatePaye(taxablePay);
    const housingLevy = 0.015 * gross;
    const nhif = calculateNhif(gross);
    return {nssf: Math.round(nssf).toFixed(2),paye:paye.toFixed(2),nhif:nhif.toFixed(2),housingLevy: Math.round(housingLevy).toFixed(2)}
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

const nhifRanges = [
    { min: 0, max: 6000, value: 150 },
    { min: 6000, max: 8000, value: 300 },
    { min: 8000, max: 12000, value: 400 },
    { min: 12000, max: 15000, value: 500 },
    { min: 15000, max: 20000, value: 600 },
    { min: 20000, max: 25000, value: 750 },
    { min: 25000, max: 30000, value: 850 },
    { min: 30000, max: 35000, value: 900 },
    { min: 35000, max: 40000, value: 950 },
    { min: 40000, max: 45000, value: 1000 },
    { min: 45000, max: 50000, value: 1100 },
    { min: 50000, max: 60000, value: 1200 },
    { min: 60000, max: 70000, value: 1300 },
    { min: 70000, max: 80000, value: 1400 },
    { min: 80000, max: 90000, value: 1500 },
    { min: 90000, max: 100000, value: 1600 },
    { min: 100000, value: 1700 } // For gross >= 100000
  ];

const calculateNhif = (gross) => {
    if (gross < 0) throw Error('NHIF can\'t be calculated from a negative gross');
    if (gross >= 100000) return 1700;
  
    const range = nhifRanges.find(r => gross >= r.min && gross < r.max);
    return range ? range.value : undefined; // Return undefined if no range is found
}


export default calculateStatutories;