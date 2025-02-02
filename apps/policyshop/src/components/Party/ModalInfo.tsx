import React, { FC, useEffect, useState } from 'react';
import { imgPrefix } from '@/utils/path';
import { ArrowsType5 } from '../Arrows';
import { Party } from '@/types/components';
import candidate_json from './data/66_WV_PMCandidate.json';
import PartyList from './PartyList';

interface PropsType {
	party: Party | undefined;
	partyData: any;
}
type WrapperLinkProps = {
	children: React.ReactNode;
};
interface CandidateProps {
	name: string;
	party: string;
}
const ModalInfo: FC<PropsType> = ({ party, partyData }) => {
	const [candidate, setCandidate] = useState<CandidateProps[]>([]);
	const [filterParty, setFilterParty] = useState<any>([]);
	const WrapperLink: FC<WrapperLinkProps> = ({ children }) => {
		return (
			<button className=" border-b-[2px] border-gray-2 w-full mt-4 flex  items-center justify-between  ">
				{children}
				<ArrowsType5 />
			</button>
		);
	};

	const onCloseModal = (): void => {
		const elem = document.getElementById('ModalInfo') as HTMLElement;
		if (elem) elem!.style.display = 'none';
	};

	const onOpenPartyListModal = (): void => {
		const elem = document.getElementById('PartyListModal') as HTMLElement;
		if (elem) elem!.style.display = 'block';
	};

	const getImage = (pl: string) => {
		return (
			filterParty[0].Candidate.filter((p: any) => p.Name === pl)[0].Image ||
			`${imgPrefix}/profile_pic.svg`
		);
	};

	useEffect(() => {
		if (party) {
			setCandidate(candidate_json.filter((c) => c.party === party.Name));
			const filterParty: any = Object.values(partyData).filter(
				(p: any) => p.Name === party.Name
			);
			setFilterParty(filterParty);
		}
	}, [party]);

	return (
		<div
			className="fixed w-full  py-12  inset-0 z-[89] h-auto overflow-scroll hidden "
			id="ModalInfo"
		>
			<PartyList party_list={filterParty[0]} party={party} />
			<div
				className="fixed inset-0 opacity-60 z-[-1]"
				onClick={() => onCloseModal()}
				style={{
					background:
						'linear-gradient(0deg, rgba(9, 9, 9, 0.6), rgba(9, 9, 9, 0.6)), #FBF8F4',
				}}
			/>
			<div className="typo-b4 border-[3px] border-black rounded-[10px] relative mx-2   md:mx-auto  bg-white md:max-w-[650px] p-5 ">
				<button
					className="absolute top-0 right-0 m-3 "
					onClick={() => onCloseModal()}
				>
					<img src={`${imgPrefix}/close.svg`} alt="close" />
				</button>
				{party && (
					<>
						<div className=" text-start">
							{party.Images && (
								<div className="w-[70px] h-[70px] bg-white border border-black rounded-full overflow-hidden object-cover">
									<img src={party.Images[0].url} alt="party-logo" />
								</div>
							)}
							<p className={'mt-2 typo-h5 font-bold'}>{party.Name}</p>
							{party.PartyGroup && (
								<div className="flex items-center bg-[var(--color-highlight-1)] px-[5px] w-fit mt-[8px]">
									<img
										className="w-[12px] h-[12px]"
										src={`${imgPrefix}/green-check.svg`}
										alt="green-check"
									/>
									<span className="ml-[4px] typo-b5">{party.PartyGroup}</span>
								</div>
							)}

							<div className="my-[20px]">
								<p className="mb-2 typo-b5 text-gray-3">
									{candidate.length > 0 ? 'แคนดิเดตนายก' : 'ไม่มีแคนดิเดตนายก'}
								</p>
								{candidate.map((c) => (
									<div className="flex items-center" key={c.name}>
										<img
											src={`${getImage(c.name)}`}
											alt="profile_pic"
											className="w-[30px] h-[30px] rounded-full"
										/>
										<p className="ml-2 typo-b4">{c.name}</p>
									</div>
								))}
							</div>
							{filterParty[0] && (
								<button
									className=" w-fit px-[10px] py-1 rounded-full bg-gray-2 flex items-center typo-b5"
									onClick={() => onOpenPartyListModal()}
								>
									<img
										src={`${imgPrefix}/plus.svg`}
										alt="plus"
										className="mr-2 "
									/>
									ดูบัญชีรายชื่อ
								</button>
							)}
						</div>
						{party.PartyGroup && (
							<div className="flex flex-col items-start">
								<WrapperLink>
									<a
										className="flex"
										target="_blank"
										href={`https://promisetracker.wevis.info/explore/?party=${party.Name}`}
									>
										<img
											src={`${imgPrefix}/icon-link-1.svg`}
											alt="icon-link-1"
										/>
										<p className="ml-2 font-bold typo-b5">
											นโยบายที่เคยขายไว้ ทำได้จริงแค่ไหน
										</p>
									</a>
								</WrapperLink>
								<WrapperLink>
									<a
										className="flex"
										target="_blank"
										href={`https://wevis.info/law-watch#investigate-section`}
									>
										<img
											src={`${imgPrefix}/icon-link-2.svg`}
											alt="icon-link-2"
										/>
										<p className="ml-2 font-bold typo-b5">
											เคยเสนอร่างกฏหมายอะไรบ้าง
										</p>
									</a>
								</WrapperLink>
								<WrapperLink>
									<a
										className="flex"
										target="_blank"
										href={`https://theyworkforus.wevis.info/party/${party.Name}`}
									>
										<img
											src={`${imgPrefix}/icon-link-3.svg`}
											alt="icon-link-3"
										/>
										<p className="ml-2 font-bold typo-b5">ข้อมูลอื่นๆ</p>
									</a>
								</WrapperLink>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default ModalInfo;
