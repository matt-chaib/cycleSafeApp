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

	let selected;
    let answer;

    async function postMarker(event: Event) {
		const form = event.target as HTMLFormElement
		const data = new FormData(form)

		await fetch('/api/markers/', {
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
	<legend>form</legend>

	<label> 
		Latitude
		<input
			name="latitude"
			autocomplete="off"
			placeholder="Latitude"
			value={latVal ?? null}
		/>
	</label>

	<label>
		Longitude
		<input
        name="longitude"
        autocomplete="off"
        placeholder="Longitude"
        value={longVal ?? null}
    />
	</label>

	<label>
		Type of event
		<select name="markerEventType" bind:value={selected} on:change={() => (answer = '')}>
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
		<textarea name="description" placeholder="Description..."></textarea>
	</label>

<button>Submit</button>
</fieldset>
</form>

<style>
	form {
        width: 20%;
		height: 300px;
		width: 500px;
        padding: 2rem;
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