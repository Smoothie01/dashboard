<script>
    // Import the base chart
    import {Line} from 'vue-chartjs'
    // Extend it
    export default {
        extends: Line,
        props: ['chartdata', 'options','mainData'],
        data(){
            return{
                datasetChart:this.chartdata,
                dataChart:this.mainData
            }
        },
        computed:{
            getDataset(){
                return this.datasetChart
            },
            getMainData(){
                return this.dataChart
            }
        },
        mounted () {
            // Overwriting base render method with actual data and options
                this.renderChart(this.getDataset)
        },
        watch:{
            getMainData(){
                this.$data._chart.update()
            }
        }
    }
</script>
