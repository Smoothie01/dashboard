<template>
    <a-row :gutter="[8,8]">
        <a-col :span="16">
            <a-card style="height: 350px" title="Цели дня">
                <a-row :gutter="[8,8]">
                    <a-col span="24"><a-tooltip title="Посещения">
                        <a-progress
                                status="active"
                                :stroke-color="{'0%': '#108ee9','100%': '#87d068',}"
                                :percent="75"
                        />
                    </a-tooltip></a-col>
                    <a-col span="6"><a-tooltip title="3 done / 3 in progress / 4 to do">
                        <a-progress type="dashboard"
                                    :percent="50"
                                    strokeColor="#118fe8"
                        />
                    </a-tooltip></a-col>
                    <a-col span="6"><a-tooltip title="3 done / 3 in progress / 4 to do">
                        <a-progress
                                strokeColor="#3ba6ba"
                                :percent="60"
                                type="dashboard"
                        />
                    </a-tooltip></a-col>
                    <a-col span="6"><a-tooltip title="3 done / 3 in progress / 4 to do">
                        <a-progress
                                strokeColor="#55b4a0"
                                :percent="40"
                                type="dashboard"
                        />
                    </a-tooltip></a-col>
                    <a-col span="6"><a-tooltip title="3 done / 3 in progress / 4 to do">
                        <a-progress
                                strokeColor="#87d069"
                                :percent="90"
                                type="dashboard"
                        />
                    </a-tooltip></a-col>
                    <a-col span="6"><a-statistic title="Посещений" value="500/1000" style="margin-right: 50px"/></a-col>
                    <a-col span="6"><a-statistic title="Заявок" value="35/60" style="margin-right: 50px"/></a-col>
                    <a-col span="6"><a-statistic title="Поднятие ставок" value="85/90" style="margin-right: 50px"/></a-col>
                    <a-col span="6"><a-statistic title="Публикаций" value="100/170" style="margin-right: 50px"/></a-col>
                </a-row>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card style="height: 350px" title="Заявки">
                <div class="card__inner">
                    <a-statistic title="Заявки на Carfast" :value="requestCarfast" style="margin-right: 50px"/>
                    <a-statistic title="Заявки на Kolesa" :value="requestKolesa" style="margin-right: 50px"/>
                    <a-statistic
                            title="Total:"
                            :value="getLastTotal"
                            :precision="2"
                            suffix="%"
                            :value-style="{ color: !progress?regressColor: progressColor}"
                            style="margin-right: 50px"
                    >
                        <template #prefix>

                        </template>
                    </a-statistic>
                    <a-statistic title="Каличество модераций" :value="15" style="margin-right: 50px;width: 260px"/>
                </div>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card style="height: 440px" title="Ставки">
                <a-statistic title="Количество ставок Carfast (за день)" :value="visitUsers"
                             style="margin-right: 50px"/>
                <a-statistic title="Количество ставок Carfast (Общее)" :value="1800" style="margin-right: 50px"/>
                <a-statistic
                        title="Total:"
                        :value="getLastTotal"
                        :precision="2"
                        suffix="%"
                        :value-style="{ color: !progress?regressColor: progressColor}"
                        style="margin-right: 50px"
                >
                    <template #prefix>
                        <a-icon :type="arrow = !progress?arrowDown:arrowUp"/>
                    </template>
                </a-statistic>
            </a-card>
        </a-col>
        <a-col :span="16">
            <a-card  style="height: 440px" title="Посещений">
                <a-statistic title="Количество посещений Carfast (online)" :value="visitUsers"
                             style="margin-right: 50px"/>
                <a-statistic title="Количество посещений Carfast (за день) " :value="2000" style="margin-right: 50px"/>
                <p>График</p>
                <visit-chart :chartdata="dataCollection" :height="100" :main-data="getDataChart"/>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card title="Модерация">
                <div class="card__inner">
                    <a-statistic title="Заявок на модерацию в день" :value="requestKolesa" style="margin-right: 50px"/>
                    <a-statistic title="Прошли модерацию в день" :value="requestCarfast" style="margin-right: 50px"/>
                    <a-statistic
                            title="Total:"
                            :value="getLastTotal"
                            :precision="2"
                            suffix="%"
                            :value-style="{ color: !progress?regressColor: progressColor}"
                            style="margin-right: 50px"
                    >
                        <template #prefix>

                        </template>
                    </a-statistic>
                    <a-statistic title="Каличество модераций" :value="15" style="margin-right: 50px;width: 260px"/>
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
    import VisitChart from "../components/Charts/visitChart";

    export default {
        name: 'carfast-content',
        components: {VisitChart},
        data() {
            return {
                requestCarfast: 5,
                requestKolesa: 500,
                progress: true,
                visitUsers: 158,
                total: [0, 0],
                arrow: '',
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
                            label: 'My First Dataset',
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
            }

        },
        computed: {
            getDataChart() {
                return this.dataCollection.datasets[0].data
            },
            getLastTotal() {
                return this.total[this.total.length - 1]
            }
        },
        methods: {
            setTotal() {
                this.total.push(this.requestCarfast / this.requestKolesa * 100)
                return this.total
            },
            checkProgress() {
                this.progress = this.total[this.total.length - 2] <= this.total[this.total.length - 1] ? true : false
                console.log(this.progress)
                console.log(this.total[this.total.length - 2] + ' ' + this.total[this.total.length - 1])
            },
            interval() {
                setInterval(() => {
                    if (this.requestCarfast < 10) {
                        this.requestCarfast += 1
                    } else {
                        this.requestCarfast = 0
                        this.visitUsers = 100
                    }
                    this.time.yesterday = this.visitUsers
                    this.visitUsers += 5
                    this.time.today = this.visitUsers
                    // console.log(this.getDataChart, 90)
                    this.dataCollection.datasets[0].data = this.getDataChart
                    //console.log(this.dataCollection.datasets[0].data)
                    // this.dataCollection.datasets[0].data = this.getDataChart
                    this.$set(this.getDataChart, 0, this.time.yesterday)
                    this.$set(this.getDataChart, 1, this.time.today)
                    // console.log(this.getDataChart)
                    this.setTotal()
                    this.checkProgress()
                }, 3000)
            }
            ,

        },
        mounted() {
            this.interval()
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
