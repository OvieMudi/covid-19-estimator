/*
const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 66622705,
  totalHospitalBeds: 1380614
}; */

const normalizeTimeToElapse = (period, periodType) => {
  let normalizedTime = 1;

  if (['day', 'days'].includes(periodType)) {
    normalizedTime = period;
  } else if (['week', 'weeks'].includes(periodType)) {
    normalizedTime = period * 7;
  } else if (['month', 'months'].includes(periodType)) {
    normalizedTime = period * 30;
  }

  return normalizedTime;
};

const estimateInfections = (reportedCases, periodType, timeToElapse) => (isSevereImpact) => {
  const currentlyInfected = isSevereImpact ? reportedCases * 50 : reportedCases * 10;
  return {
    currentlyInfected,
    infectionsByRequestedTime: currentlyInfected * (
      2 ** Math.floor(normalizeTimeToElapse(timeToElapse, periodType) / 3))
  };
};


const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;

  console.log('covid19ImpactEstimator -> data', data);

  const estimatedInfections = estimateInfections(reportedCases, periodType, timeToElapse);

  return {
    data,
    estimate: {
      currentlyInfected: estimatedInfections(false).currentlyInfected,
      infectionsByRequestedTime: estimatedInfections(false).infectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: estimatedInfections(true).currentlyInfected,
      infectionsByRequestedTime: estimatedInfections(true).infectionsByRequestedTime
    }
  };
};


export default covid19ImpactEstimator;
