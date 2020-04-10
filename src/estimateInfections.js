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
      2 ** Math.trunc(normalizeTimeToElapse(timeToElapse, periodType) / 3))
  };
};

export default estimateInfections;
