import estimateInfections from './estimateInfections';

const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};


const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, /* population, */ totalHospitalBeds
  } = data;

  // console.log('covid19ImpactEstimator -> data', data);

  const estimatedInfections = estimateInfections(reportedCases, periodType, timeToElapse);

  const estimate = {
    currentlyInfected: estimatedInfections(false).currentlyInfected,
    infectionsByRequestedTime: estimatedInfections(false).infectionsByRequestedTime
  };

  const severeImpact = {
    currentlyInfected: estimatedInfections(true).currentlyInfected,
    infectionsByRequestedTime: estimatedInfections(true).infectionsByRequestedTime
  };

  estimate.severeCasesByRequestedTime = Math.trunc(
    estimate.infectionsByRequestedTime * 0.15
  );
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );

  estimate.hospitalBedsByRequestedTime = Math.trunc(
    (totalHospitalBeds * 0.35) - estimate.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    (totalHospitalBeds * 0.35) - severeImpact.severeCasesByRequestedTime
  );


  return {
    data,
    estimate,
    severeImpact
  };
};


console.log('covid19ImpactEstimator -> covid19ImpactEstimator', covid19ImpactEstimator(input));

export default covid19ImpactEstimator;
