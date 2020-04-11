import estimateInfections from './estimateInfections';

// const input = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 4,
//     avgDailyIncomePopulation: 0.73
//   },
//   periodType: 'days',
//   timeToElapse: 38,
//   reportedCases: 2747,
//   population: 92931687,
//   totalHospitalBeds: 678874
// };


const covid19ImpactEstimator = (data) => {
  console.log('covid19ImpactEstimator -> data', data);
  const {
    region, reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;

  const estimatedInfections = estimateInfections(reportedCases, periodType, timeToElapse);

  const impact = {
    currentlyInfected: estimatedInfections(false).currentlyInfected,
    infectionsByRequestedTime: estimatedInfections(false).infectionsByRequestedTime
  };

  const severeImpact = {
    currentlyInfected: estimatedInfections(true).currentlyInfected,
    infectionsByRequestedTime: estimatedInfections(true).infectionsByRequestedTime
  };

  impact.severeCasesByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.15
  );
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );

  impact.hospitalBedsByRequestedTime = Math.trunc(
    (totalHospitalBeds * 0.35) - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    (totalHospitalBeds * 0.35) - severeImpact.severeCasesByRequestedTime
  );


  impact.casesForICUByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.05
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05
  );


  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.02
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );

  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime
       * region.avgDailyIncomePopulation
       * region.avgDailyIncomeInUSD
    ) / timeToElapse
  );

  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime
       * region.avgDailyIncomePopulation
       * region.avgDailyIncomeInUSD
    ) / timeToElapse
  );

  return {
    data,
    impact,
    severeImpact
  };
};


// console.log('covid19ImpactEstimator -> covid19ImpactEstimator', covid19ImpactEstimator(input));

export default covid19ImpactEstimator;
