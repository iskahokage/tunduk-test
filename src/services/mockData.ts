import { Candidate } from '../types/candidate.ts';
import * as candidatesLarge from '../../mock/candidates-large.json'

export const mockCandidates: Candidate[] = [...candidatesLarge.candidates]
// Для тестов, где нужен только один юзер
export const singleMockCandidate = mockCandidates[0];
