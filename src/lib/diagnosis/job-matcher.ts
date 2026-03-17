import type {
  CoreParams,
  Job,
  JobMatchResult,
  AnimalResult,
  NumerologyResult,
} from "@/types/diagnosis";
import { JOBS } from "@/data/jobs";
import { calculateSubParams } from "./skill-calculator";

/**
 * Match best job from core parameters
 * Weighted Euclidean distance scoring
 */
export function matchJob(
  coreParams: CoreParams,
  animalResult: AnimalResult,
  _numerologyResult: NumerologyResult
): JobMatchResult {
  const scored = JOBS.map((job) => {
    // Weighted Euclidean distance
    const distance = Math.sqrt(
      job.weights.communication *
        (coreParams.communication - job.requiredParams.communication) ** 2 +
        job.weights.specialist *
          (coreParams.specialist - job.requiredParams.specialist) ** 2 +
        job.weights.marketing *
          (coreParams.marketing - job.requiredParams.marketing) ** 2 +
        job.weights.ai * (coreParams.ai - job.requiredParams.ai) ** 2
    );

    // Animal compatibility bonus
    const animalBonus = job.compatibleAnimals.includes(animalResult.number)
      ? 8
      : 0;

    // Convert distance to 100-point score
    const maxDistance = 150;
    const score = Math.max(
      0,
      Math.min(100, Math.round((1 - distance / maxDistance) * 100) + animalBonus)
    );

    return { job, score };
  });

  // Sort by score
  scored.sort((a, b) => b.score - a.score);

  const primary = scored[0];
  const runnerUp = scored[1];

  // Resolve advanced jobs
  const advancedJobs = primary.job.advancedJobs
    .map((id) => JOBS.find((j) => j.id === id))
    .filter((j): j is Job => j !== undefined);

  // Calculate sub parameters
  const subParams = calculateSubParams(coreParams, animalResult);

  return {
    primaryJob: primary.job,
    matchScore: primary.score,
    runnerUp: runnerUp.job,
    advancedJobs,
    coreParams,
    subParams,
  };
}

/**
 * Calculate gap between current params and target job requirements
 */
export function calculateJobGap(
  currentParams: CoreParams,
  targetJob: Job
): CoreParams {
  return {
    communication: Math.max(
      0,
      targetJob.requiredParams.communication - currentParams.communication
    ),
    specialist: Math.max(
      0,
      targetJob.requiredParams.specialist - currentParams.specialist
    ),
    marketing: Math.max(
      0,
      targetJob.requiredParams.marketing - currentParams.marketing
    ),
    ai: Math.max(0, targetJob.requiredParams.ai - currentParams.ai),
  };
}
