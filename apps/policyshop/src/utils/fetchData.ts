import { TheyWorkForUs } from '@thailand-election-2023/database';
import { Party, Policy } from '@/types/components';
import partyData from '../components/Party/data/parties.json';
import party66 from '../components/Party/data/66_WV_party.json';

export const fetchParties = async (): Promise<Party[]> => {
	let data: Party[] = await party66;
	const result = data.sort((i, j) => (i.Name < j.Name ? -1 : 1));
	return result;
};

export const fetchPolicy = async (): Promise<Policy[]> => {
	const data: Policy[] = await TheyWorkForUs.Policies.fetchAll({});
	return data;
};

export const fetchPartyData = async (): Promise<any> => {
	return partyData;
};
