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
		{ id: 2, text: `Near-miss` },
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
    <input
        name="latitude"
        autocomplete="off"
        placeholder="Latitude"
        value={latVal ?? null}
    />
    <input
        name="longitude"
        autocomplete="off"
        placeholder="Longitude"
        value={longVal ?? null}
    />
    <select bind:value={selected} on:change={() => (answer = '')}>
		{#each markerTypes as selectOption}
			<option value={selectOption}>
				{selectOption.text}
			</option>
		{/each}
	</select>

    <textarea placeholder="Description..."></textarea>
<button>Submit</button>
</form>

<style>
	form {
        width: 20%;
		height: 200px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
        padding: 2rem;
	}

	input {
		width: 100%;
		padding: 0.2rem;
        border-radius:5px;
	}

    select {
        width: 100%;
		padding: 0.2rem;
        border-radius:5px;
    }

    textarea {
        width:100%;
        resize: vertical;
        padding:15px;
        border-radius:15px;
        border:0;
        box-shadow:4px 4px 10px rgba(0,0,0,0.06);
        height:150px;
        }
</style>