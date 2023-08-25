<script lang="ts">
	import MapComponent from "./map.svelte"
	import { lat, lng } from '$lib/stores.js';
	import { invalidateAll } from "$app/navigation";
	export let data;

	$: ({markers} = data)

	let latVal;
	let longVal;

	lat.subscribe((value) => {
		latVal = value;
	});
	lng.subscribe((value) => {
		longVal = value;
	})

	async function postMarker(event: Event) {
		const form = event.target as HTMLFormElement
		const data = new FormData(form)

		await fetch('/api/markers/', {
			method: 'POST',
			body: data
		})
		setTimeout(() => {
			console.log("hi")
			invalidateAll()
		}, 500)
	}
</script>

<div class="centered">
	<h1>Cycle App Demo</h1>

	<form on:submit|preventDefault={postMarker} >
		<label>
			Lat:
			<input
				name="latitude"
				autocomplete="off"
				value={latVal ?? ''}
			/>
		</label>
		<label>
			Long:
			<input
				name="longitude"
				autocomplete="off"
				value={longVal ?? ''}
			/>
		</label>
		<button>Submit</button>
	</form>

	<MapComponent markerData={markers}/>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>
