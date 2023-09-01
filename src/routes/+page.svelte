<script lang="ts">
	import { lat, lng } from '$lib/stores.js';
	import {places} from '$lib/places.js'
	import MapComponent from "./map.svelte"
	import Form from "./form.svelte"
	export let data;

	$: ({markers} = data)
	$: place = "Sheffield"

	let latVal;
	let longVal;

	lat.subscribe((value) => {
		latVal = value;
	});
	lng.subscribe((value) => {
		longVal = value;
	})
</script>

<div class="centered">
	<h1>Cycle App Demo</h1>
	<select bind:value={place}>
		{#each Object.keys(places) as place}
		<option value={place}>{place}</option>
		{/each}
	</select>
	<Form></Form>
	<MapComponent markerData={markers} place={place}/>
</div>

<style>

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
