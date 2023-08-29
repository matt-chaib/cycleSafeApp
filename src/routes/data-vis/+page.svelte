<svelte:head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
</svelte:head>

<script>
      import { onMount } from 'svelte';

   let headerText;

export let plotHeader = '';

onMount(() => {
      headerText = 'On Mount Called !';
      let plotDiv = document.getElementById('plotDiv');				
      Plotly.newPlot(plotDiv, [{
	x: [1, 2, 3, 4, 5],
	y: [1, 2, 4, 8, 16] }]); 
});
          
</script>

<h3>{headerText}</h3>
<div id="plotly">
  <div>
    <h1>{plotHeader}</h1>
  </div>
  <div id="plotDiv"><!-- Plotly chart will be drawn inside this DIV --></div>
</div>