<template>
    <div class="wrapper">
        <Header/>
        <main>
            <div class="container">
                <carfast-content/>
            </div>
        </main>
        <footer>
            <div class="container">
                <h4 style="text-align: center">Made by "Стажер"</h4>
            </div>
        </footer>
    </div>
</template>

<script>
    import Header from './components/Header/Header'
    import CarfastContent from "./pages/CarfastContent";
    export default {
        name: 'App',
        components:{
            CarfastContent,
            Header
        }
    }
</script>

<style>
    .wrapper{
        padding: 20px;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    footer{
        margin-top: auto;
    }
    .container{
        max-width: 1140px;
        margin: 0 auto;
    }
</style>
