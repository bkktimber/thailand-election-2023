<script lang="ts">
	import { base } from '$app/paths';
	import { Content, contentManager } from '../../stores/content';
	import { input } from '../../stores/input';
	import Quiz6Info from '../infomation/quiz6Info.svelte';
	import ModalInfo from '../modal.svelte';
	import polls from '../../data/polls.json';

	$: ans = $input.input.quiz6;
	$: isInfoOpen = false;
	$: isFinished = $contentManager.isFinished;

	const toggleIsInfoOpen = () => (isInfoOpen = !isInfoOpen);
</script>

{#if isInfoOpen}
	<ModalInfo>
		<Quiz6Info toggleModal={toggleIsInfoOpen} />
	</ModalInfo>
{/if}

<div
	class="text-left h-full grow flex flex-col justify-between w-full max-w-[698px] px-6 py-0 md:py-10"
>
	<div>
		<p class="typo-h7 text-xl">#6: ความนิยมของพรรค (ต่อ)</p>
		<h6 class="typo-h6 font-bold">
			คุณคิดว่าโพลสำนักไหนจะคาดการณ์คะแนนนิยมของพรรคได้แม่นยำที่สุด?
		</h6>
		<button
			class="flex items-center space-x-2 cursor-pointer"
			on:click={toggleIsInfoOpen}
		>
			<span class="typo-b4 text-blue underline text-byx-blue">
				เรื่องนี้มีผลอย่างไร?
			</span>
			<svg
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 7C0 10.9 3.1 14 7 14C10.9 14 14 10.9 14 7C14 3.1 10.9 0 7 0C3.1 0 0 3.1 0 7ZM1 7C1 3.7 3.7 1 7 1C10.3 1 13 3.7 13 7C13 10.3 10.3 13 7 13C3.7 13 1 10.3 1 7ZM7.5 10V5.5H5.5V6.5H6.5V10H5V11H9V10H7.5ZM6.2 3.3C6.2 2.8 6.6 2.5 7 2.5C7.4 2.5 7.8 2.7 7.8 3.2C7.8 3.7 7.4 4 7 4C6.6 4 6.2 3.8 6.2 3.3Z"
					fill="#0000FF"
				/>
			</svg>
		</button>
	</div>
	<div class="w-full flex flex-col items-center my-10">
		<div
			class="w-full flex flex-col items-center justify-between mt-1 space-y-4"
		>
			<button
				class="border border-black w-full px-4 py-2 flex items-center cursor-pointer {!ans
					? 'beyondx-gradient-bg text-white'
					: ''}"
				on:click={() => input.updateQuize6(undefined)}
			>
				<div class="flex-1 text-left">
					<h3 class="typo-b3 font-bold">ไม่ใช้ผลโพลคำนวณคะแนน</h3>
					<h3 class="typo-b3">สมมติว่าทุกคนกาบัตรบัญชีรายชื่อเหมือนบัตรเขต</h3>
				</div>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M18.72 6.71953L9.59999 15.8395L4.31999 10.5595L3.23999 11.6395L8.51999 16.9195L9.59999 17.9995L19.8 7.79953L18.72 6.71953Z"
						fill={!ans ? '#fff' : '#161616'}
					/>
				</svg>
			</button>
			{#each polls as poll}
				{@const isActive = ans?.source == poll.source}
				<button
					class="border border-black w-full px-4 py-2 flex items-center cursor-pointer {isActive
						? 'beyondx-gradient-bg text-white'
						: ''}"
					on:click={() => input.updateQuize6(poll)}
				>
					<div class="flex-1 text-left">
						<h3 class="typo-b3 font-bold">{poll.source}</h3>
						<h3 class="typo-b3">
							({poll.date ? `สำรวจเมื่อ ${poll.date}` : `ไม่ทราบวันที่สำรวจ`})
						</h3>
					</div>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.72 6.71953L9.59999 15.8395L4.31999 10.5595L3.23999 11.6395L8.51999 16.9195L9.59999 17.9995L19.8 7.79953L18.72 6.71953Z"
							fill={isActive ? '#fff' : '#161616'}
						/>
					</svg>
				</button>
			{/each}
		</div>
	</div>
	<div class="w-full flex items-center justify-between space-x-5">
		{#if isFinished}
			<a
				href="{base}/result"
				class="typo-b3 px-4 py-2 border flex items-center justify-between border-black w-full text-white bg-black"
			>
				<b>บันทึกคำตอบ</b>
				<div
					class="border-1 border-t border-r w-2 h-2 rotate-45 border-white"
				/>
			</a>
		{:else}
			<button
				class="typo-b3 px-4 py-2 border flex items-center justify-between border-black w-full"
				on:click={() => {
					contentManager.updateContent(Content.Quiz5);
				}}
			>
				<div
					class="border-1 border-t border-l w-2 h-2 -rotate-45 border-black"
				/>
				<b>ย้อนกลับ</b>
			</button>
			<button
				class="typo-b3 px-4 py-2 border flex items-center justify-between border-black w-full text-white bg-black"
				on:click={() => {
					contentManager.updateContent(Content.Quiz7);
				}}
			>
				<b>ต่อไป</b>
				<div
					class="border-1 border-t border-r w-2 h-2 rotate-45 border-white"
				/>
			</button>
		{/if}
	</div>
</div>
