<template>
    <a-row :gutter="[8,8]">
        <a-col :span="16">
            <a-card :loading='loading' style="height: 350px" title="Цели дня">
                <a-row :gutter="[8,8]">
                    <a-col span="24">
                        <a-tooltip title="Общий прогресс">
                            <a-progress
                                    status="active"
                                    :stroke-color="{'0%': '#108ee9','100%': '#87d068',}"
                                    :percent="progressBarMain"
                            />
                        </a-tooltip>
                    </a-col>
                    <a-col v-for="data of progressBar" :key="data.id" span="6">
                        <a-tooltip :title="data.title">
                            <a-progress type="dashboard"
                                        :percent="data.percent"
                                        :strokeColor="data.strokeColor"
                            />
                        </a-tooltip>
                        <a-statistic :title="data.title" :value="data.currentData +  '/'  + data.maxData"
                                     style="margin-right: 50px"/>
                    </a-col>
                </a-row>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card :loading='loading' style="height: 350px" title="Заявки">
                <div class="card__inner">
                    <a-statistic title="Заявки на Carfast" :value="requestCarfast" style="margin-right: 50px"/>
                    <a-statistic title="Заявки на Kolesa" :value="requestKolesa" style="margin-right: 50px"/>
                    <a-statistic
                            title="Охват рынка"
                            :value="getLastTotal"
                            :precision="2"
                            suffix="%"
                            :value-style="{ color: !progress?regressColor: progressColor}"
                            style="margin-right: 50px"
                    >
                        <template #prefix>

                        </template>
                    </a-statistic>
                    <a-statistic title="Заявки на Carfast (за день)" :value="todayRequestCarfast" style="margin-right: 50px;width: 260px"/>
                </div>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card :loading='loading' style="height: 440px" title="Ставки">
                <a-statistic title="Сделано ставок (за все время)"
                             :value="getAllBets"
                             style="margin-right: 50px"
                />
                <a-statistic title="Сделано ставок (за день)"
                             :value="getTodayBets"
                             style="margin-right: 50px"
                />
                <!--<a-statistic
                        title="Total:"
                        :value="getLastTotal"
                        :value="getLastTotal"
                        :precision="2"
                        suffix="%"
                        :value-style="{ color: !progress?regressColor: progressColor}"
                        style="margin-right: 50px"
                >
                    <template #prefix>
                        <a-icon :type="arrow = !progress?arrowDown:arrowUp"/>
                    </template>
                </a-statistic>-->
            </a-card>
        </a-col>
        <a-col :span="16">
            <a-card :loading='loading' style="height: 440px" title="Посещений">
                <a-statistic title="Посещений (за все время)" :value="2000"
                             style="margin-right: 50px"/>
                <a-statistic title="Сейчас на сайте " :value="2000" style="margin-right: 50px"/>
                <visit-chart :options="option" :chartdata="dataCollection" :height="100" :main-data="getDataChart"/>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card :loading='loading' title="Модерация">
                <div class="card__inner">
                    <a-statistic title="Заявок на модерацию в день" :value="getTodayAuctions" style="margin-right: 50px"/>
                    <a-statistic title="Заявок на модерацию за все время" :value="getTotalAuctions" style="margin-right: 50px"/>
                    <a-statistic title="Прошли модерацию в день " :value="getTodayModPassed" style="margin-right: 50px"/>
                    <a-statistic title="Прошли модерацию за все время " :value="getTotalModPassed" style="margin-right: 50px"/>
<!--                    <a-statistic-->
<!--                            title="Публикуется"-->
<!--                            :value="getLastTotal"-->
<!--                            :precision="2"-->
<!--                            suffix="%"-->
<!--                            :value-style="{ color: !progress?regressColor: progressColor}"-->
<!--                            style="margin-right: 50px"-->
<!--                    >-->
<!--                        <template #prefix>-->

<!--                        </template>-->
<!--                    </a-statistic>-->
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
    import VisitChart from "../components/Charts/visitChart";
    import axios from 'axios'
    export default {
        name: 'carfast-content',
        components: {VisitChart},
        data() {
            return {
                requestCarfast: 0,
                requestKolesa: 0,
                todayRequestCarfast:0,
                progress: true,
                loading:true,
                visitUsers: 0,
                total: 0,
                auction:{
                    todayAuctions:0,
                    totalAuctions:0,
                    todayModPassed:0,
                    totalModPassed:0
                },
                arrow: '',
                progressBarMain:0,
                progressBar: [
                    {id: 1, title: 'Посещений', percent: 0, maxData: 1000, currentData: 0, strokeColor: '#118fe8'},
                    {id: 2, title: 'Заявок', percent: 0, maxData: 50, currentData: 0, strokeColor: '#3ba6ba'},
                    {id: 3, title: 'Подняли ставку', percent: 0, maxData: 50, currentData: 0, strokeColor: '#55b4a0'},
                    {id: 4, title: 'Модерация', percent: 0, maxData: 50, currentData: 0, strokeColor: '#87d069'},
                ],
                bets:{
                    todayBets:0,
                    allBets:0
                },
                arrowUp: 'arrow-up',
                arrowDown: 'arrow-down',
                progressColor: '#3f8600',
                regressColor: '#cf1322',
                myInterval: '',
                time: {
                    yesterday: 0,
                    today: 0
                },
                dataCollection: {
                    labels: ['2 дня назад', 'Вчера', 'Сегодня'],
                    datasets: [
                        {
                            label: 'График посещений',
                            data: [85, 55, 75, 10, 300],
                            fill: false,
                            borderWidth: 1,
                            transition: 2,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0
                        }
                    ],
                    yAxisID: 'y-axis-1'
                },
                option: {
                    responsive: true,
                }
            }

        },
        computed: {
            getDataChart() {
                return this.dataCollection.datasets[0].data
            },
            getLastTotal() {
                return this.total
            },
            getTodayBets(){
                return this.bets.todayBets
            },
            getAllBets(){
                return this.bets.allBets
            },
            getTodayAuctions(){
                return this.auction.todayAuctions
            },
            getTotalAuctions(){
                return this.auction.totalAuctions
            },
            getTodayModPassed(){
                return this.auction.todayModPassed
            },
            getTotalModPassed(){
                return this.auction.totalModPassed
            },

        },
        methods: {
            setDataToProgress(){
                this.progressBar[1].currentData = this.todayRequestCarfast
                this.progressBar[2].currentData = this.getTodayBets
                this.progressBar[3].currentData = this.getTodayModPassed
                let percentMain = 0
                this.progressBar.forEach(element => {
                    element.percent = (element.currentData/ element.maxData)*100
                    percentMain += (element.percent/4)
                })
                this.progressBarMain = percentMain
            },
            async getData(){
                try {
                    const response = await axios.get('https://autolombardbot.fastbot.pro/auction-statistics/dashboard_statistics')
                    this.requestCarfast = response.data.carfast_market;
                    this.requestKolesa = response.data.kolesa_market;
                    this.todayRequestCarfast = response.data.today_carfast_auctions;
                    this.total = response.data.carfast_market_procent;
                    this.bets.todayBets = response.data.today_bets;
                    this.bets.allBets = response.data.total_bet_num;
                    this.auction.todayAuctions = response.data.today_auctions;
                    this.auction.totalAuctions = response.data.total_carfast_auctions;
                    this.auction.todayModPassed = response.data.today_mod_passed;
                    this.auction.totalModPassed = response.data.total_mod_passed;
                    this.loading = false
                    await this.setDataToProgress()
                }catch (e) {
                    console.log(e)
                }
            },
            // setTotal() {
            //     this.total.push(this.requestCarfast / this.requestKolesa * 100)
            //     return this.total
            // },
            checkProgress() {
                this.progress = this.total[this.total.length - 2] <= this.total[this.total.length - 1]
                console.log(this.progress)
                console.log(this.total[this.total.length - 2] + ' ' + this.total[this.total.length - 1])
            },
            async interval() {
                 setInterval(async() => {
                     console.log('2')
                   await this.getData()
                }, 60000)
            }

        },
        async mounted() {
            await this.getData()
            await this.interval()
        }

    }
</script>

<style scoped>
    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;
    }

    .card__inner {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        justify-content: space-between;
    }

</style>
