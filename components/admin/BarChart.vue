<template>
	<Bar :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script>
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
	name: 'BarChart',
	props: {
		title: {
			default: '',
			type: String,
		},

		data: {
			type: Array,
			required: true,
		},

		labels: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},

	computed: {
		chartData() {
			return {
				labels: this.labels,
				datasets: [
					{
						label: this.title,
						data: this.data,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			};
		},
	},
};
</script>
