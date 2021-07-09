<template>
        <header>
            <div class="container">
                <nav class="nav">
                    <h1 class="logo">Dashboard</h1>
                    <a-menu style="height: 100%" v-model="current" mode="horizontal">
                        <a-menu-item key="mail">
                            <a-icon type="appstore" />
                            Carfast
                        </a-menu-item>
                        <a-menu-item key="app" disabled>
                            <a-icon type="appstore"/>
                            Another Site
                        </a-menu-item>
                    </a-menu>
                </nav>
            </div>
        </header>
</template>

<script>
    export default {
        name:'Header',
        data() {
            return {
                current:['mail']
            };
        },
    }
</script>

<style scoped>
    header {
        min-width: 90px;
        margin: 20px 0;
    }
    .nav{
        display: flex;
        justify-content: space-between;
    }
</style>
