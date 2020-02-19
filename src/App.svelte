<script>
    import '../node_modules/materialize-css/dist/css/materialize.min.css';
    import '../node_modules/materialize-css/dist/js/materialize.min.js';
    import { Router, Route } from "svelte-routing";
    import Navbar from './layout/Navbar.svelte';
    import Users from './pages/Users.svelte';
    import UserDetails from './pages/UserDetails.svelte';

</script>

<style>

</style>

<Router>
    <Navbar/>
    <div class="container">
        <Route path={'/'} component={Users}/>
        <Route path={'/user-details'} component={UserDetails}/>
    </div>
</Router>
