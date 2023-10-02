<script lang="ts">
	import { lat, lng } from '$lib/stores.js';
	import {places} from '$lib/places.js'
	import MapComponent from "./map.svelte"
	import Form from "./form.svelte"
	export let data;

	import { onMount } from 'svelte'
	import { supabase } from '../supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Account from '../lib/Account.svelte'
  import Auth from '../lib/Auth.svelte'

  let session: AuthSession

onMount(() => {
  supabase.auth.getSession().then(({ data }) => {
	session = data.session
  })

  supabase.auth.onAuthStateChange((_event, _session) => {
	session = _session
  })
})


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

	{#if !session}
	<Auth />
	{:else}
	<Account {session} />
	{/if}

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
