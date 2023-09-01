<script lang="ts">
    import { lat, lng } from '$lib/stores.js';
	import { invalidateAll } from "$app/navigation";
    let latVal;
	let longVal;

	lat.subscribe((value) => {
		latVal = value;
	});
	lng.subscribe((value) => {
		longVal = value;
	})

    let markerTypes = [
		{ id: 1, text: `Collision` },
		{ id: 2, text: `Near-Miss` },
		{ id: 3, text: `Aggression` }
	];

	let selected = "";
    let answer;

	let severityTypes = [
		{id: 1, text: `Fatal`},
		{id: 2, text: `Serious`},
		{id: 3, text: `Moderate`},
		{id: 4, text: `Minor`}
	]

	let selectedSeverity = "";

	let missTypes = [
		{id: 1, text: `Close Pass`},
		{id: 2, text: `Pull Out - Parking`},
		{id: 3, text: `Pull Out - Junction`},
		{id: 4, text: `Open Door`},
		{id: 5, text: `Tailing`}
	]

	let selectedMissType = "";

    async function postMarker(event: Event) {
		const form = event.target as HTMLFormElement
		const data = new FormData(form)

		await fetch('/api/markers/', {
			method: 'POST',
			body: data
		})

		await fetch('/api/collisions/', {
			method: 'POST',
			body: data
		})
		setTimeout(() => {
			invalidateAll()
		}, 500)
	}

</script>
<form on:submit|preventDefault={postMarker} >
	<fieldset class="fieldset">
	<legend>Event Details</legend>

	<label> 
		Latitude
		<input
			name="latitude"
			autocomplete="off"
			placeholder="Latitude"
			required
			value={latVal ?? null}
		/>
	</label>

	<label>
		Longitude
		<input
        name="longitude"
        autocomplete="off"
        placeholder="Longitude"
		required
        value={longVal ?? null}
    />
	</label>

	<label>
		Type of event
		<select name="markerEventType" bind:value={selected} on:change={() => (answer = '')} required >
			{#each markerTypes as selectOption}
				<option value={selectOption.text}>
					{selectOption.text}
				</option>
			{/each}
		</select>	
	</label>

	<label>
		Time of event
		<input type="datetime-local" name="timeOfEvent" required/>
	</label>

	<label>
		Link to video
		<input name="linkToVideo" placeholder="Link to video"/>
	</label>

	<label>
		Description
		<textarea name="description" placeholder="Description..." required></textarea>
	</label>

<button>Submit</button>
</fieldset>

<fieldset class="fieldset">
	<legend>{selected} Details</legend>
	
	{#if selected=="Collision"}
	<label>
		Severity
		<select name="severityType" bind:value={selectedSeverity} on:change={() => (answer = '')} required>
			{#each severityTypes as selectOption}
				<option value={selectOption.text}>
					{selectOption.text}
				</option>
			{/each}
		</select>	
	</label>

	<label>
		Estimated Cost (£)
		<input
        name="estimatedCost"
        autocomplete="off"
        placeholder="Estimated cost"
		required
        value={0}
    />
	</label>
	{:else if selected=="Near-Miss"}
		<label>
			Miss Type
			<select name="missTypeDescription" bind:value={selectedMissType} on:change={() => (answer = '')} required>
				{#each missTypes as selectOption}
					<option value={selectOption.text}>
						{selectOption.text}
					</option>
				{/each}
			</select>	
		</label>
	{/if}

	
</fieldset>
</form>

<style>
	form {
		height: 100%;
		width: 800px;
        padding: 2rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 2rem;
	}

	.fieldset {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 20px;
		height: 100%;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	input {
		width: 90%;
		padding: 0.2rem;
        border-radius:5px;
	}

	input[type=datetime-local] {
		padding: 0.7rem;
	}

    select {
        width: 100%;
		padding: 0.2rem;
        border-radius:5px;
    }

    textarea {
        width:90%;
        resize: vertical;
        padding:15px;
        border-radius:15px;
        border:0;
        box-shadow:4px 4px 10px rgba(0,0,0,0.06);
        height:50%;
        }
</style>